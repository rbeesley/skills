## What it does

`to-spec` synthesizes the existing conversation into a buildable spec on the configured tracker. It preserves settled decisions rather than starting the interview again.

## When to reach for it

Invoke `/to-spec` when the discussion is ready to become a spec. The agent does not invoke it automatically.

## Prerequisites

Settled scope, repository understanding, domain vocabulary, and a verified tracker contract.

## Publish in the provider's shape

The spec explains the problem, solution, user stories, implementation/testing decisions, and scope. It uses required repository form fields and the discovered ADO work-item type where applicable. Readiness is a configured semantic role, not necessarily a label.

## Common questions

**Will it invent a ready-for-agent tag if one is missing?**

No. An unmapped role is reported. Creation of taxonomy or work-item state changes is not implied by publishing a spec.

**Does this open a PR?**

No. It publishes only the spec to the verified tracker and returns its real reference.

## It's working if

- The spec reflects the existing conversation and agreed test seams.
- The created item has the required fields and correct target.
- Missing mappings or integrations are visible.

## Where it fits

After idea clarification and before [to-tickets](https://github.com/rbeesley/skills/blob/main/docs/engineering/to-tickets.md). [setup](https://github.com/rbeesley/skills/blob/main/docs/engineering/setup-rbeesley-skills.md) configures the tracker; [ask-rbeesley](https://github.com/rbeesley/skills/blob/main/docs/engineering/ask-rbeesley.md) maps the flow.
