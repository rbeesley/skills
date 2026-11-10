## What it does

`wayfinder` charts a large uncertain effort as a **shared map** of decision tickets. It resolves decisions, not implementation deliverables, unless an effort explicitly extends that scope.

## When to reach for it

Invoke `/wayfinder` for work too uncertain and large to plan in one session, or to resume a map. The agent does not invoke it automatically.

## Prerequisites

A repository tracker contract with map/ticket representations, hierarchy, blocking, claim, and successful-decision operations.

## A provider-native map

The map indexes decisions; each ticket owns the detail. Semantic wayfinder roles use existing mappings rather than automatically creating tags. ADO maps use discovered item types and native hierarchy/dependency relations, with claim and state operations verified in that project.

## Common questions

**Does it fall back to local files if ADO is unavailable?**

Not silently. Report the integration gap and use only an agreed fallback.

**Does closing a decision close its implementation work?**

No. Answered decisions, rejected scope, and delivered code have different predicates. A rejected blocker does not count as a successful prerequisite.

## It's working if

- Each decision has one authoritative ticket and a short pointer in the map.
- The frontier reflects directed dependencies and actual completion gates.
- Resolution comments, state transitions, and map updates are individually verified.

## Where it fits

Planning before [to-spec](https://github.com/rbeesley/skills/blob/main/docs/engineering/to-spec.md), not a shortcut around it. [ask-rbeesley](https://github.com/rbeesley/skills/blob/main/docs/engineering/ask-rbeesley.md) maps this on-ramp.
