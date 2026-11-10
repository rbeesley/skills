## What it does

`pr` writes a **repository-shaped** PR body. Repository instructions and templates take precedence over sampled team practice; no external format is imposed.

## When to reach for it

Type `/pr`, or the agent reaches for it when writing or revising a PR description. It drafts, not creates or merges, a PR.

## Conventions and evidence

| Available evidence | Shape |
| --- | --- |
| Applicable repository template | Preserve and fill its sections |
| No template, representative recent same-repo examples | Match authored team practice across comparable changes and several authors |
| No usable examples | Concise change/why, actual validation, material risks and remaining gates |

Generated AI summaries are not authored team norms. Simple changes may be one sentence; complex fixes may need problem, change, validation, and scope. Diagrams are optional and renderer-dependent. Never claim an unrun test or invented baseline.

## Common questions

**Does it keep the old Summary/Evidence/Merge Danger template?**

Only if the repository itself asks for it. Door labels and mandatory visuals are no longer defaults.

**Does an ADO work-item mention create a verified association?**

No. Native PR/work-item linkage is a separate authorized operation, read back after writing. ADO PRs use `!<id>` or full URLs; work items use `#<id>`.

**Can it enable auto-complete?**

Only an explicit request authorizes that separate operation. Drafting a body does not.

## It's working if

- The body looks like the team's own PRs, not an imported template.
- Its detail matches the change, with actual validation and pending gates visible.
- Drafting leaves remote state unchanged.

## Where it fits

A standalone writing reference after [implementation](https://github.com/rbeesley/skills/blob/main/docs/engineering/implement.md) or [review](https://github.com/rbeesley/skills/blob/main/docs/engineering/code-review.md). [environment-workflow](https://github.com/rbeesley/skills/blob/main/docs/engineering/environment-workflow.md) owns provider and permission rules; [ask-rbeesley](https://github.com/rbeesley/skills/blob/main/docs/engineering/ask-rbeesley.md) is the router.
