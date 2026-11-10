## What it does

`wizard` guides a human through steps only they can perform. The bundled automation is specifically **bash/GitHub**, not a universal shell or provider adapter.

## When to reach for it

Type `/wizard`, or the agent reaches for it at a human-only credential, dashboard, or manual cutover boundary. Steps the agent can execute safely itself do not need a wizard.

## Platform boundary

| Environment | Result |
| --- | --- |
| Confirmed bash and GitHub destinations | Use the bundled template's tested helpers |
| Native Windows, ADO, or unsupported destination | Precise native instructions/checklist and available verified tools |

Inventory actual CI configuration, including Azure Pipelines when applicable. Use hidden secret entry and the approved secret store. Plaintext `.env` persistence requires an explained need and must stay out of git; ADO secrets are never written to GitHub as a fallback.

## Common questions

**Is the bash template ported to PowerShell?**

No. Native Windows gets explicit supported instructions instead of a pretend shell translation. The limitation is visible.

## It's working if

- Every manual step has a verified destination and clear instructions.
- The shell/provider match the actual environment.
- Secrets are not displayed, committed, or sent to the wrong service.

## Where it fits

A standalone human-boundary tool using [environment-workflow](https://github.com/rbeesley/skills/blob/main/docs/engineering/environment-workflow.md). [ask-rbeesley](https://github.com/rbeesley/skills/blob/main/docs/engineering/ask-rbeesley.md) maps the set.
