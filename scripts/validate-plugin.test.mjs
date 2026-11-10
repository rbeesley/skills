import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { existsSync, mkdirSync, mkdtempSync, readFileSync, readdirSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import test from "node:test";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const read = (path) => readFileSync(join(root, path), "utf8").replaceAll("\r\n", "\n");
const json = (path) => JSON.parse(read(path));
const plugin = json(".claude-plugin/plugin.json");
const marketplace = json(".claude-plugin/marketplace.json");
const pkg = json("package.json");
const buckets = ["engineering", "productivity"];
const promoted = buckets.flatMap((bucket) =>
  readdirSync(join(root, "skills", bucket), { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => `./skills/${bucket}/${entry.name}`),
);
const workflowConsumers = [
  "setup-rbeesley-skills", "pr", "code-review", "to-spec", "to-tickets",
  "triage", "implement", "implement-spec", "wayfinder", "prototype", "wizard",
];
const skill = (name) => read(`skills/engineering/${name}/SKILL.md`);

test("fork identity and release versions agree while lock placeholders remain unversioned", () => {
  const lock = json("package-lock.json");
  assert.equal(pkg.name, "rbeesley-skills");
  assert.equal(plugin.name, pkg.name);
  assert.equal(plugin.version, pkg.version);
  assert.equal(pkg.fork.upstreamRepository, "https://github.com/mattpocock/skills");
  assert.equal(pkg.version, `${pkg.fork.upstreamVersion}-rbeesley.${pkg.fork.revision}`);
  assert.equal(lock.name, pkg.name);
  assert.equal(lock.version, "0.0.0");
  assert.equal(lock.packages[""].name, pkg.name);
  assert.equal(lock.packages[""].version, "0.0.0");
  assert.equal(marketplace.name, "rbeesley");
  assert.equal(marketplace.plugins.length, 1);
  assert.equal(marketplace.plugins[0].name, pkg.name);
  assert.equal(marketplace.plugins[0].source, "./");
  assert.equal(plugin.repository, "https://github.com/rbeesley/skills");
  assert.equal(pkg.repository.url, plugin.repository);
  assert.equal(json(".changeset/config.json").changelog[1].repo, "rbeesley/skills");
  assert.match(read("LICENSE"), /Copyright.*Matt Pocock/);
  assert.match(read("README.md"), /independently maintained/);
});

function versionFixture(t, overrides = {}) {
  const dir = mkdtempSync(join(tmpdir(), "rbeesley-version-"));
  t.after(() => rmSync(dir, { recursive: true }));
  mkdirSync(join(dir, "scripts"));
  mkdirSync(join(dir, ".claude-plugin"));
  const manifest = {
    version: "1.4.0",
    fork: { ...pkg.fork, revision: 2 },
    ...overrides,
  };
  writeFileSync(join(dir, "package.json"), JSON.stringify(manifest, null, 2));
  writeFileSync(join(dir, ".claude-plugin", "plugin.json"), '{"version":"1.4.0"}\n');
  writeFileSync(join(dir, "package-lock.json"), '{"version":"0.0.0","packages":{"":{"version":"0.0.0"}}}\n');
  writeFileSync(join(dir, "scripts", "sync-plugin-version.mjs"), read("scripts/sync-plugin-version.mjs"));
  return {
    read: (path) => readFileSync(join(dir, path), "utf8"),
    run: (...args) => spawnSync(process.execPath, [join(dir, "scripts", "sync-plugin-version.mjs"), ...args], { encoding: "utf8" }),
  };
}

test("fork version sync derives the next revision without changing lock placeholders", (t) => {
  const fixture = versionFixture(t);
  const before = fixture.read("package.json");
  const lock = fixture.read("package-lock.json");
  const check = fixture.run("--check");
  assert.equal(check.status, 1, check.stderr);
  assert.match(check.stderr, /fork metadata requires 1\.3\.2-rbeesley\.2/);
  assert.equal(fixture.read("package.json"), before);

  const sync = fixture.run();
  assert.equal(sync.status, 0, sync.stderr);
  for (const path of ["package.json", ".claude-plugin/plugin.json"]) {
    assert.equal(JSON.parse(fixture.read(path)).version, "1.3.2-rbeesley.2");
  }
  assert.equal(fixture.read("package-lock.json"), lock);
  assert.equal(fixture.run("--check").status, 0);
});

test("invalid fork metadata fails before either release manifest is written", (t) => {
  for (const fork of [
    { ...pkg.fork, upstreamVersion: "1.3.2.1" },
    { ...pkg.fork, upstreamVersion: "01.3.2" },
    { ...pkg.fork, upstreamVersion: "9007199254740992.3.2" },
    { ...pkg.fork, revision: 0 },
    { ...pkg.fork, revision: "2" },
    undefined,
  ]) {
    const fixture = versionFixture(t, { fork });
    const before = fixture.read("package.json");
    const result = fixture.run();
    assert.equal(result.status, 1, result.stderr);
    assert.match(result.stderr, /package\.json needs fork/);
    assert.equal(fixture.read("package.json"), before);
    assert.equal(JSON.parse(fixture.read(".claude-plugin/plugin.json")).version, "1.4.0");
  }
});

test("fork release tooling cannot silently apply an upstream Changesets bump", () => {
  assert.equal(pkg.scripts.version, "node scripts/sync-plugin-version.mjs");
  for (const name of readdirSync(join(root, ".github", "workflows"))) {
    assert.doesNotMatch(read(`.github/workflows/${name}`), /changesets\/action|changeset (?:version|tag)/);
  }
  assert.match(read(".github/workflows/validate.yml"), /npm run check-plugin-version/);
  assert.match(read("CHANGELOG.md"), new RegExp(`^## ${pkg.version.replaceAll(".", "\\.")}$`, "m"));
});

test("manifest exposes exactly the promoted skills with unique matching names", () => {
  assert.deepEqual([...plugin.skills].sort(), [...promoted].sort());
  assert.equal(new Set(plugin.skills).size, plugin.skills.length);
  const names = new Set();
  for (const path of promoted) {
    const body = read(`${path}/SKILL.md`);
    const name = body.match(/^name: (.+)$/m)?.[1];
    assert.equal(name, path.split("/").at(-1), path);
    assert.ok(!names.has(name), name);
    names.add(name);
    assert.ok(body.startsWith("---\n"), path);
    const metadata = read(`${path}/agents/openai.yaml`);
    assert.equal(
      /^disable-model-invocation: true$/m.test(body),
      /allow_implicit_invocation: false/.test(metadata),
      `${name}: invocation metadata must agree`,
    );
    assert.match(metadata, /display_name:/, name);
  }
  assert.ok(names.has("setup-rbeesley-skills"));
  assert.ok(names.has("ask-rbeesley"));
  assert.ok(!names.has("setup-matt-pocock-skills"));
  assert.ok(!names.has("ask-matt"));
});

test("promoted skills have README/bucket entries, docs, and router coverage", () => {
  for (const path of promoted) {
    const [, , bucket, name] = path.split("/");
    assert.ok(read("README.md").includes(`](${path}/SKILL.md)`), name);
    assert.ok(read(`skills/${bucket}/README.md`).includes(`](./${name}/SKILL.md)`), name);
    assert.ok(existsSync(join(root, "docs", bucket, `${name}.md`)), name);
    if (name !== "ask-rbeesley") {
      assert.ok(skill("ask-rbeesley").includes(`/${name}`), `${name}: router`);
    }
  }
});

test("workflow consumers explicitly invoke the single shared reference", () => {
  for (const name of workflowConsumers) {
    assert.match(skill(name), /Call the Skill tool with "environment-workflow"/, name);
  }
  assert.ok(!/^disable-model-invocation: true$/m.test(skill("environment-workflow")));
  assert.match(skill("environment-workflow"), /\[azure-devops.md\]\(azure-devops.md\)/);
});

test("changed workflow docs carry complete orientation and current fork links", () => {
  const names = [...new Set([...workflowConsumers, "environment-workflow", "ask-rbeesley"])];
  for (const name of names) {
    const body = read(`docs/engineering/${name}.md`);
    for (const section of ["What it does", "When to reach for it", "Common questions", "It's working if", "Where it fits"]) {
      assert.ok(body.includes(`## ${section}`), `${name}: ${section}`);
    }
    assert.ok(!body.includes("https://aihero.dev/skills-"), `${name}: stale fork behavior link`);
    assert.ok(!body.includes("setup-matt-pocock-skills"), name);
    assert.ok(!body.includes("ask-matt"), name);
  }
});

test("local Markdown pointers in promoted skill files resolve", () => {
  function check(dir) {
    for (const entry of readdirSync(dir, { withFileTypes: true })) {
      const path = join(dir, entry.name);
      if (entry.isDirectory()) check(path);
      else if (entry.name.endsWith(".md")) {
        const body = readFileSync(path, "utf8").replace(/^```[\s\S]*?^```.*$/gm, "");
        for (const [, target] of body.matchAll(/\]\(([^)\s]+\.md)(?:#[^)]*)?\)/g)) {
          if (/^[a-z]+:\/\//i.test(target)) continue;
          assert.ok(existsSync(resolve(dirname(path), target)), `${path}: ${target}`);
        }
      }
    }
  }
  for (const bucket of buckets) check(join(root, "skills", bucket));
});

test("PR shape uses precedence and separates drafting from publication", () => {
  const body = skill("pr");
  assert.ok(body.indexOf("repository instructions") < body.indexOf("repository PR template"));
  assert.ok(body.indexOf("repository PR template") < body.indexOf("representative sample"));
  assert.match(body, /several team authors/);
  assert.match(body, /generated summaries/);
  assert.match(body, /no mandatory visual/);
  assert.match(body, /does not authorize PR creation/);
  assert.match(body, /tests, pending hardware\/external validation/);
  assert.match(body, /live PR state and body/);
});

test("ADO contract guards references, relations, process discovery, and lifecycle", () => {
  const body = read("skills/engineering/environment-workflow/azure-devops.md");
  for (const term of ["`!<id>`", "`#<id>`", "required fields", "allowed process states", "predecessor/successor", "parent/child", "artifact", "read back", "Abandonment"]) {
    assert.ok(body.toLowerCase().includes(term.toLowerCase()), term);
  }
  assert.match(body, /Mentions in the PR body do not verify linkage/);
  assert.match(skill("environment-workflow"), /Auto-complete and auto-merge stay off unless the user explicitly requests them/);
  assert.match(skill("environment-workflow"), /conditional project policy, not a global default/);
  assert.match(skill("implement-spec"), /Open PRs only if the user requested PRs/);
  assert.match(skill("triage"), /Read-only queue inspection and recommendations never authorize/);
});

test("behavioral fixtures have distinct cases and machine-checkable expected actions", () => {
  const fixtures = json("scripts/fixtures/workflow-scenarios.json");
  assert.ok(fixtures.length >= 8);
  assert.equal(new Set(fixtures.map((f) => f.id)).size, fixtures.length);
  for (const fixture of fixtures) {
    assert.equal(typeof fixture.request, "string");
    assert.ok(Array.isArray(fixture.required));
    assert.ok(Array.isArray(fixture.forbidden));
    assert.ok(fixture.required.length > 0);
    assert.ok(!fixture.required.some((a) => fixture.forbidden.includes(a)));
  }
});

test("provider seeds do not confuse closed dependencies with successful delivery", () => {
  for (const provider of ["github", "gitlab", "local", "azure-devops"]) {
    const body = read(`skills/engineering/setup-rbeesley-skills/issue-tracker-${provider}.md`);
    assert.match(body, /successful[- ]completion predicate|successfully delivered dependency predicate/i, provider);
    assert.doesNotMatch(body, /every blocker is closed|0 means startable/i, provider);
  }
  const mapping = read("docs/agents/triage-labels.md");
  assert.match(mapping, /Unmapped/);
  assert.doesNotMatch(mapping, /Rejections close as/);
});
