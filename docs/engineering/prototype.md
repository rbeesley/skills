## What it does

`prototype` answers a design question with **throwaway** code. The goal is a decision, not a production implementation or polished architecture.

## When to reach for it

Type `/prototype`, or the agent reaches for it when a state model, logic, or UI needs a runnable answer.

## Capture the answer

Keep the experiment clearly marked and close to its subject. Preserve the prototype as a primary source on a separate branch from the verified parent. Record the verdict and the question it settled. Posting its pointer to a tracker is a separate delegated operation.

## Common questions

**Does capture open a PR or complete a work item?**

No. Without posting permission the pointer is returned as a draft. The real implementation keeps only validated decisions.

## It's working if

- The artifact resolves one stated design question.
- The verdict distinguishes observed behavior from assumptions.
- Prototype capture preserves unrelated work and follows the branch contract.

## Where it fits

A standalone detour before [implementation](https://github.com/rbeesley/skills/blob/main/docs/engineering/implement.md), using [environment-workflow](https://github.com/rbeesley/skills/blob/main/docs/engineering/environment-workflow.md) for capture. [ask-rbeesley](https://github.com/rbeesley/skills/blob/main/docs/engineering/ask-rbeesley.md) maps the detour.
