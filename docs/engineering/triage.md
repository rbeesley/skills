## What it does

`triage` evaluates incoming requests, verifies claims, and writes durable briefs or notes through semantic **roles**. Roles map to existing provider taxonomy rather than imposing GitHub labels on every tracker.

## When to reach for it

Invoke `/triage` to inspect a queue, evaluate an incoming item, or apply a specified outcome. The agent does not invoke it automatically. Tickets already made agent-ready by to-tickets need no repeated triage.

## Prerequisites

Configured tracker and category/state role mapping. External PRs are included only when the repository explicitly enables that surface.

## Read and write are separate

Queue queries and recommendations are read-only. Comments, tags/fields/states, assignments, rejection, and PR abandonment require delegated operations. A human-review role does not certify merge readiness.

## Common questions

**What if ready-for-agent is not an ADO process state?**

Use the configured tag/field/type/state representation. If there is none, report the gap; never invent a state.

**Does wontfix satisfy another ticket's dependency?**

No. Rejection and successful delivery are distinct outcomes.

**Are ADO PRs and work items interchangeable?**

No. Use `!<id>` or full URLs for PRs and `#<id>` for actual work items. Their operations and identities remain distinct.

## It's working if

- The agent checks prior notes, existing implementation, and relevant rejection history.
- Read-only requests leave the tracker unchanged.
- Authorized writes preserve concurrency and are read back.

## Where it fits

An on-ramp to [implement](https://github.com/rbeesley/skills/blob/main/docs/engineering/implement.md). [setup](https://github.com/rbeesley/skills/blob/main/docs/engineering/setup-rbeesley-skills.md) records mappings; [ask-rbeesley](https://github.com/rbeesley/skills/blob/main/docs/engineering/ask-rbeesley.md) maps the flows.
