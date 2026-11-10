## What it does

`environment-workflow` resolves the **repository contract** before PR, tracker, or delivery operations. Code hosting, work tracking, and the current Copilot host are discovered independently rather than treated as GitHub by default.

## When to reach for it

Type `/environment-workflow`, or the agent reaches for it before PR drafting/publishing, tracker-backed planning, triage, or implementation delivery decisions.

## Provider-aware boundaries

| Concern | Rule |
| --- | --- |
| ADO | Prefer exposed MCP schemas; explicitly report CLI fallback and missing integration |
| GitHub/GitLab | Use supported native/CLI operations with a verified host and target |
| Local/custom | Follow configured operations, never an implicit fallback |
| Mutation | Draft, comment, review, link, transition, PR creation, and merge are separate permissions |
| Delivery | Feature-bounded branches and explicit stack parents; actual project gates |

ADO hierarchy, directed blockers, and PR artifact links are verified after writing. Triage roles map to existing fields/types/tags/states, not an invented GitHub taxonomy. Windows uses PowerShell and Windows paths.

## Common questions

**Can green CI or team examples enable auto-complete?**

No. Auto-complete/auto-merge stays off unless explicitly requested.

**Does it replace guided-review?**

No. Keep a separately installed guided-review for interactive walkthroughs. App draft comments, annotations, run badges, and work-item state have distinct meanings.

**Can a closed blocker always be treated as delivered?**

No. Rejection and abandonment are not successful completion. The project supplies the dependency predicate.

## It's working if

- The agent names the actual provider/target and reports unavailable operations honestly.
- A draft changes no remote state.
- Completion claims distinguish code readiness, linked PRs, validation, and closure.

## Where it fits

Shared reference beneath [setup](https://github.com/rbeesley/skills/blob/main/docs/engineering/setup-rbeesley-skills.md), [pr](https://github.com/rbeesley/skills/blob/main/docs/engineering/pr.md), and tracker-backed work. [ask-rbeesley](https://github.com/rbeesley/skills/blob/main/docs/engineering/ask-rbeesley.md) maps the flows.
