## What it does

`implement-spec` works a spec's **task graph**, dispatching ready tickets through isolated worktrees. It follows an agreed branch topology rather than always accumulating the entire effort on one branch.

## When to reach for it

Invoke `/implement-spec` for an explicitly orchestrated multi-ticket build. The agent does not invoke it automatically. Use [implement](https://github.com/rbeesley/skills/blob/main/docs/engineering/implement.md) for a bounded ticket.

## Prerequisites

A settled spec, dependency graph, repository contract, and selected branch topology.

## Topology and gates

| Selected topology | Delivery |
| --- | --- |
| Independent feature branches | Each ticket retains its own review surface |
| Stacked branches | Explicit parents and dependency merge order |
| Explicit integration branch | Local integration and final review against its actual parent |

Implementers test and integrate updated prerequisites without resetting dirty work. Remote PR merges remain gated independently of local integration.

## Common questions

**Does a PR-based tracker automatically create a draft PR?**

No. The user must request PRs. Draft/ready state follows the request or repository convention; auto-complete stays off.

**When can another ticket start?**

When the agreed dependency predicate holds. Distinguish locally integrated prerequisites within an explicitly selected integration run from tracker delivery states; never mark code delivered just to advance the frontier.

**Are all tickets closed at the end?**

Only transitions explicitly delegated and justified by actual project gates may occur. Pending validation remains pending.

## It's working if

- Every branch has a known parent and every ticket a clear review surface.
- No PR is created without a request.
- Worktrees with active sessions or unpreserved work are retained.

## Where it fits

An alternative to per-ticket [implement](https://github.com/rbeesley/skills/blob/main/docs/engineering/implement.md) after [to-tickets](https://github.com/rbeesley/skills/blob/main/docs/engineering/to-tickets.md). [ask-rbeesley](https://github.com/rbeesley/skills/blob/main/docs/engineering/ask-rbeesley.md) is the router.
