#!/usr/bin/env node
// Derives both release versions from package.json's canonical fork metadata.
// --check reports drift without writing either manifest or the dependency lock.

import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const repo = join(dirname(fileURLToPath(import.meta.url)), "..");
const paths = ["package.json", ".claude-plugin/plugin.json"];
const sources = paths.map((path) => readFileSync(join(repo, path), "utf8"));
const manifests = sources.map((source) => JSON.parse(source));
const { fork } = manifests[0];

if (
  typeof fork?.upstreamVersion !== "string" ||
  !/^(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)$/.test(fork.upstreamVersion) ||
  !fork.upstreamVersion.split(".").every((part) => Number.isSafeInteger(Number(part))) ||
  !Number.isSafeInteger(fork.revision) ||
  fork.revision < 1 ||
  fork.upstreamRepository !== "https://github.com/mattpocock/skills"
) {
  console.error("package.json needs fork.upstreamRepository, a three-part upstreamVersion, and a positive integer revision.");
  process.exit(1);
}

const version = `${fork.upstreamVersion}-rbeesley.${fork.revision}`;
const pending = [];
for (const [index, path] of paths.entries()) {
  if (manifests[index].version === version) continue;

  if (process.argv.includes("--check")) {
    console.error(`${path} version is ${manifests[index].version}; fork metadata requires ${version}. Run \`npm run version\`.`);
    process.exitCode = 1;
    continue;
  }

  // Preserve manifest formatting and key order.
  const updated = sources[index].replace(
    /("version"\s*:\s*")[^"]*(")/,
    `$1${version}$2`,
  );
  if (JSON.parse(updated).version !== version) {
    console.error(`Could not find a release version field to replace in ${path}.`);
    process.exit(1);
  }
  pending.push({ path, updated });
}

for (const { path, updated } of pending) {
  writeFileSync(join(repo, path), updated);
  console.log(`${path} -> ${version}`);
}
if (!process.exitCode) console.log(`Fork release versions agree: ${version}`);
