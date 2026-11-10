## What it does

`to-tickets` turns a spec or conversation into **tracer-bullet** vertical slices with explicit blocking edges. Each slice delivers a verifiable path, not a layer of a future whole.

## When to reach for it

Invoke `/to-tickets` when work needs several bounded tickets. The agent does not invoke it automatically.

## Prerequisites

A settled plan and configured tracker, including required fields, role mappings, and relation operations.

## Native graph, verified

| Tracker | Publication |
| --- | --- |
| ADO | Discovered item types, parent/child hierarchy, directed predecessor/successor links |
| GitHub/GitLab/custom | Verified supported hierarchy/dependency operations |
| Local | One file per ticket with explicit textual blockers |

Read back created items and relation direction. Missing native support is a reported limitation; text-only fallback requires the configured policy. Parents are not closed by creating children.

## Common questions

**Is Related enough to block an ADO ticket?**

No. Related, hierarchy, and predecessor/successor express different relationships.

**What if creation succeeds but linking fails?**

Report partial success with returned IDs. Retry only missing operations rather than duplicating tickets or claiming a verified graph.

**Does a closed blocker always unblock the next slice?**

No. Use the project's successful-delivery predicate; rejection and abandonment are not delivery.

## It's working if

- Every slice is independently verifiable and fits a fresh session.
- The tracker shows correctly directed dependencies and hierarchy.
- Unmapped roles are reported instead of creating labels/tags/states.

## Where it fits

After [to-spec](https://github.com/rbeesley/skills/blob/main/docs/engineering/to-spec.md), before [implement](https://github.com/rbeesley/skills/blob/main/docs/engineering/implement.md) or [implement-spec](https://github.com/rbeesley/skills/blob/main/docs/engineering/implement-spec.md). [ask-rbeesley](https://github.com/rbeesley/skills/blob/main/docs/engineering/ask-rbeesley.md) maps the flow.
