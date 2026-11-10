## What it does

`code-review` evaluates **Standards** and **Spec** separately against a fixed point. Repository rules override generic smell heuristics, and findings remain evidence-backed rather than stylistic guesses.

## When to reach for it

Type `/code-review`, or the agent reaches for it when reviewing a branch, PR, or work in progress. A requested review is read-only unless edits or posting are separately delegated.

## Prerequisites

A resolvable comparison point and review scope. For stacked branches use the actual parent; for work in progress include the requested staged/unstaged changes rather than silently reviewing HEAD alone.

## Provider-aware sources

Fetch verified linked work items before guessing a spec from commit text. On ADO, `#<id>` is a work item and `!<id>` a PR. Missing spec evidence is reported, not invented.

## Common questions

**Does the review submit comments?**

Not by default. When requested, staged draft comments, posted reviews, inline replies, and thread resolution are distinct operations. A diff annotation is not a PR review.

**Does this replace guided-review?**

No. A separately installed guided-review supplies interactive walkthroughs; this skill retains the two-axis review discipline.

## It's working if

- The comparison matches the intended parent and includes the requested WIP scope.
- Standards and Spec findings cite their sources.
- No remote state changes during a read-only review.

## Where it fits

After [implementation](https://github.com/rbeesley/skills/blob/main/docs/engineering/implement.md), before [PR writing](https://github.com/rbeesley/skills/blob/main/docs/engineering/pr.md). [ask-rbeesley](https://github.com/rbeesley/skills/blob/main/docs/engineering/ask-rbeesley.md) maps the flows.
