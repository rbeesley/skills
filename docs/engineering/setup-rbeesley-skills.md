## What it does

`setup-rbeesley-skills` records the **repository contract**: actual tracker, mapped triage roles, PR conventions, branch/delivery rules, and domain-doc layout. It replaces upstream's setup command and configures your project, not the plugin's update source.

## When to reach for it

Invoke `/setup-rbeesley-skills` once per repo or to refresh existing configuration. The agent does not invoke it automatically.

## Prerequisites

A project workspace and enough read access to discover its conventions. Missing tracker access is reported, not bypassed by switching to GitHub or local files.

## Repository contract

| File | Purpose |
| --- | --- |
| `docs/agents/issue-tracker.md` | Target, operations, required fields, native relations, completion predicates |
| `docs/agents/triage-labels.md` | Existing category/state role mapping, when triage is used |
| `docs/agents/workflow.md` | PR conventions, worktree/branch layout, delivery and validation gates |
| `docs/agents/domain.md` | Glossary/ADR layout and consumer rules |

Copilot-visible instructions point at those files. Existing canonical links are preserved; a CLAUDE-only repo can gain a small AGENTS pointer instead of duplicated instructions.

## Common questions

**Is Azure DevOps just the old custom-tracker option?**

No. It has a seed template and explicit type/state/field/relation discovery. GitHub, GitLab, and local/custom tracking remain available.

**Does setup create labels or resolve items?**

No. It maps existing taxonomy and writes agreed files. Remote taxonomy, links, state changes, and plugin replacement require their own authorization.

**Do all projects resolve at PR creation?**

No. That policy must be explicit, with committed code in a verified linked PR. Production/external-validation gates remain separate; successful completion is distinct from abandonment.

## It's working if

- The active Copilot instructions reach the generated files.
- Provider, target, role mappings, and lifecycle match the project.
- Refreshing setup preserves unrelated edits and reports unresolved facts.

## Where it fits

Run-once setup for [tracker-backed flows](https://github.com/rbeesley/skills/blob/main/docs/engineering/ask-rbeesley.md). [environment-workflow](https://github.com/rbeesley/skills/blob/main/docs/engineering/environment-workflow.md) supplies the shared discipline; [pr](https://github.com/rbeesley/skills/blob/main/docs/engineering/pr.md) supplies convention discovery.
