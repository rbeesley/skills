## What it does

`implement` builds a ticket or agreed piece of work with TDD and review, then commits to its verified feature branch. **Code readiness** is not work-item closure or permission to create a PR.

## When to reach for it

Invoke `/implement` for one bounded ticket. The agent does not invoke it automatically. For a whole task graph use [implement-spec](https://github.com/rbeesley/skills/blob/main/docs/engineering/implement-spec.md).

## Prerequisites

A spec/ticket or agreed scope, applicable repo instructions, and tracker configuration when fetching remote work.

## Delivery

The shared repository contract supplies the worktree layout and actual parent. Preserve unrelated edits, commit coherent phases, and push according to the delegated workflow. Review and test results describe what was observed, not assumed external acceptance.

## Common questions

**Does this open a PR or resolve the ticket?**

Not implicitly. Those are separate authorized operations subject to the project's linkage and validation gates.

**Can parallel sessions share a checkout?**

Use isolated worktrees when edits overlap or branches differ. Never switch another session's checkout or reset away existing work.

## It's working if

- Changes stay on the intended feature branch with relevant tests and review.
- The handoff distinguishes committed code from pending review/external validation.
- Unrelated workspace changes survive.

## Where it fits

Implementation after [to-tickets](https://github.com/rbeesley/skills/blob/main/docs/engineering/to-tickets.md), using [environment-workflow](https://github.com/rbeesley/skills/blob/main/docs/engineering/environment-workflow.md) for delivery boundaries. [ask-rbeesley](https://github.com/rbeesley/skills/blob/main/docs/engineering/ask-rbeesley.md) maps the flow.
