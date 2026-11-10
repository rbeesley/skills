import assert from "node:assert/strict";
import { existsSync, readFileSync, readdirSync } from "node:fs";
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

test("fork identity and versions agree across package, lock, plugin, marketplace", () => {
  const lock = json("package-lock.json");
  assert.equal(pkg.name, "rbeesley-skills");
  assert.equal(plugin.name, pkg.name);
  assert.equal(plugin.version, pkg.version);
  assert.equal(lock.name, pkg.name);
  assert.equal(lock.version, pkg.version);
  assert.equal(lock.packages[""].name, pkg.name);
  assert.equal(lock.packages[""].version, pkg.version);
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
