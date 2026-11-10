## What it does

`ask-rbeesley` is the **flow** router for this independently maintained fork. It recommends a skill or route after reading the relevant skill, rather than inventing behavior from a short summary.

## When to reach for it

Invoke `/ask-rbeesley` when unsure which skill fits. The agent does not invoke it automatically, and it recommends rather than runs a user-invoked flow.

## Routes

| Situation | Route |
| --- | --- |
| New repository | Setup the repository contract |
| Settled idea | Spec, tickets, implementation, review |
| Large uncertain effort | Wayfinder before a buildable spec |
| PR body | Repository-shaped PR writing, not an imposed visual template |
| Provider/lifecycle question | Shared environment-workflow reference |
| Interactive change walkthrough | Separately installed guided-review, when available |

Implementation can use feature-bounded/stacked branches or an explicitly selected integration branch. Tracker lifecycle and merge authorization remain distinct.

## Common questions

**Where did the upstream setup/router names go?**

They are replaced by `setup-rbeesley-skills` and `ask-rbeesley`, without duplicate aliases. Other skill concepts retain their names. Installation and updates use the fork's distinct plugin/marketplace identity; upstream remains credited as the source.

**Does it route over every installed plugin?**

No. It maps this set, while acknowledging the separate guided-review surface. A missing model-facing listing alone is not proof a user-invoked command is absent.

## It's working if

- Recommendations match the actual referenced skill.
- The route preserves provider boundaries and human decisions.
- No PR or work-item mutation happens just because the router mentioned it.

## Where it fits

Standalone map across this set. [setup](https://github.com/rbeesley/skills/blob/main/docs/engineering/setup-rbeesley-skills.md) establishes the per-repo contract; [environment-workflow](https://github.com/rbeesley/skills/blob/main/docs/engineering/environment-workflow.md) applies it.
