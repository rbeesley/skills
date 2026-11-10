# Contributing

This is the Copilot/ADO adaptation of [Matt Pocock's skills](https://github.com/mattpocock/skills), maintained at [rbeesley/skills](https://github.com/rbeesley/skills). Preserve upstream attribution and the MIT license. Report fork-specific problems here, not in upstream.

Read `AGENTS.md` (linked to `CLAUDE.md`) and `SCOPE.md`. Keep promoted skills, manifest entries, README/bucket entries, docs, and the ask-rbeesley router consistent. Shared provider rules belong in environment-workflow rather than independent variants in every skill.

Use synthetic public examples. Never commit private PR bodies, team identities, work-item IDs, private repository links, or credentials. Read-only inspection and drafts must remain distinct from remote writes, work-item transitions, and merge authorization.

Run `npm test` and `npm run check-plugin-version`. Preview packaging with a separate `COPILOT_HOME` or session-only plugin directory before changing installed plugins. Add focused regression cases for changed workflow boundaries, and state what static checks cannot prove.

For release metadata changes, use [Fork versioning](./README.md#fork-versioning), preserving the upstream baseline and fork revision rather than applying a generic SemVer bump.

`npm test` checks packaging, invocation metadata, documentation links, and safety-contract text, not model behavior. For a behavioral acceptance pass, give a fresh read-only Copilot session the scenario `request` fields from `scripts/fixtures/workflow-scenarios.json`, without the expected `required`/`forbidden` fields. Have it apply the loaded skills hypothetically rather than execute remote actions. Compare its prescribed actions against those withheld expectations and retain the actual output with the evaluation result. Passing scenarios do not prove every future model response.

Keep changes feature-bounded and preserve unrelated edits. Opening a PR or enabling auto-merge is not implied by implementing a change.
