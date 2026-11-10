Skills are organized into bucket folders under `skills/`:

- `engineering/`: daily code work
- `productivity/`: daily non-code workflow tools
- `misc/`: kept around but rarely used, not promoted
- `in-progress/`: beta: public on purpose, feedback wanted, not shipped in the plugin
- `deprecated/`: no longer used

Every skill in `engineering/` or `productivity/` (the **promoted** buckets) must have a reference in the top-level `README.md` and an entry in `.claude-plugin/plugin.json`'s `skills` array (the compatible Copilot plugin ships exactly the promoted set). Skills in `misc/`, `in-progress/`, and `deprecated/` must not appear in either.

Install commands come from [.agents/install-block.md](./.agents/install-block.md). The fork is `rbeesley-skills@rbeesley`; upstream identity remains attribution, never an update target. Run `npm test` and `npm run check-plugin-version` after touching manifests. Verify Copilot exposure with an isolated home or session-only plugin directory before activation. [ADR 0002](./.agents/adr/0002-ship-as-a-claude-code-plugin.md) records the historical upstream packaging decision; it does not override the fork's installation guide.

For version changes, follow [Fork versioning](./README.md#fork-versioning). The lockfile's top-level `version` and `packages[""].version` retain upstream's `0.0.0` placeholders; they are dependency-lock metadata, not release-version sources.

Each skill entry in the top-level `README.md` must link the skill name to its `SKILL.md`.

Each bucket folder has a `README.md` that lists every skill in the bucket with a one-line description, with the skill name linked to its `SKILL.md`. The promoted buckets' `README.md`s and the top-level `README.md` group entries into **User-invoked** and **Model-invoked**; non-promoted bucket `README.md`s (`misc/`, `in-progress/`) use a flat list.

Skills in `engineering/` and `productivity/` also have human-facing docs at `docs/<bucket>/<skill-name>.md`. When behavior changes, re-sync the page following [.agents/writing-docs.md](./.agents/writing-docs.md). The fork is not published on aihero.dev: use fork GitHub docs links for adapted behavior. Preserve upstream links only as historical references. Non-promoted buckets get no docs page.

Every `SKILL.md` is either user-invoked (`disable-model-invocation: true` plus `policy.allow_implicit_invocation: false` in `agents/openai.yaml`, reachable only by the human) or model-invoked (model- or user-reachable). See [.agents/invocation.md](./.agents/invocation.md).

[`ask-rbeesley`](./skills/engineering/ask-rbeesley/SKILL.md) is the router that maps every user-reachable skill and how they relate. The same trigger that re-syncs a docs page applies to it: whenever you add, rename, remove, or change how a user-reachable skill fits the flows, re-read `ask-rbeesley`'s `SKILL.md` and update it so the map stays accurate: a new skill it never mentions, or a stale one it still routes to, is a router that lies.

`scripts/link-skills.sh` is a legacy opt-in for other harnesses. Copilot uses the plugin manifest; do not link or copy additional skill folders alongside a plugin install.

No em-dashes anywhere in this repo's prose (`SKILL.md` files, docs, `README.md`, `CHANGELOG.md`, ADRs, changesets, code comments). Where a sentence reaches for one, rewrite it instead with a comma, colon, period, parentheses, or a conjunction, whichever the sentence actually wants; never do a blind character substitution.

Every skill that dispatches a subagent says to start it with a fresh context window. Some harnesses (Codex, for one) fork the parent conversation by default, and a fork inherits the parent's context, which is what the subagent was meant to escape.

## Agent skills

### Triage labels

See `docs/agents/triage-labels.md` for verified mappings and unresolved roles. Issues are judged against [`SCOPE.md`](./SCOPE.md); do not inherit upstream label or closure policy.

### Repository workflow

Code is hosted at `rbeesley/skills` on GitHub. A request to change skills does not request public tracker items, PR creation, or merge. Follow `environment-workflow` for provider and authorization discovery. Configure a tracker explicitly before tracker-backed flows; do not invent one because `docs/agents/issue-tracker.md` is absent.
