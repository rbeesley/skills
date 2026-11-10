---
name: setup-rbeesley-skills
description: "Configure repository-aware Copilot engineering skills: tracker, PR conventions, triage mappings, work-item lifecycle, and domain docs. Run once per repo or refresh existing setup."
disable-model-invocation: true
---

# Set up rbeesley-skills

This maintained fork derives from mattpocock/skills. It configures the current repository, not the skills package or global user preferences.

Call the Skill tool with "environment-workflow" before exploration. Read-only discovery comes before any configuration or remote write.

## 1. Discover

Read existing instructions and `docs/agents/` configuration. Inspect remotes, worktree/branch conventions, hosting and tracker targets separately, PR templates, available tools and authentication, domain docs and ADR layout. Respect existing glossary naming and links.

For ADO, read the environment-workflow ADO reference and discover project types, required fields, states, tags, relation types, and team policies. For GitHub/GitLab inspect existing labels. For custom/local tracking inspect its actual operations. A remote is evidence of code hosting, not proof of where the team tracks work.

For PR conventions, follow the discovery order in the "pr" skill: call the Skill tool with "pr" when configuring those conventions. Record the source of the convention rather than copying private PR bodies.

Done when confirmed facts and unresolved decisions are distinguished. Missing integration is an explicit limitation, not a reason to create a remote or switch trackers.

## 2. Resolve remaining decisions

Present concise findings and ask one question at a time through the runtime's question tool, if available. Skip questions already settled by repository instructions. Offer concrete choices, including Azure DevOps, GitHub, GitLab, and local markdown where relevant; use freeform input for an unlisted tracker rather than a generic "Other" button.

Resolve only material gaps:

- **Tracker:** confirm actual target and provider, which can differ from code hosting.
- **Triage:** map category and state roles to existing labels, tags, fields, types, or states. An unsupported role stays unmapped. Propose taxonomy creation separately; setup alone does not authorize remote labels/tags/states.
- **Delivery:** record branch/worktree conventions, parent/target selection, PR/work-item linkage, lifecycle predicates, and external validation gates. Distinguish readiness from resolution and closure. Auto-complete/auto-merge is off unless explicitly requested.
- **Domain docs:** retain the existing layout. Default a new small repo to `GLOSSARY.md` and `docs/adr/`; offer multiple contexts only when its structure needs them.

## 3. Draft the repository contract

Show the proposed `## Agent skills` pointer block and the files that need changing:

- `docs/agents/issue-tracker.md`: provider, verified target, available operations, types/required fields, hierarchy/dependency/PR artifact links, successful-completion predicate, and wayfinding operations.
- `docs/agents/triage-labels.md`: semantic role mapping, including category roles, only when triage is used.
- `docs/agents/workflow.md`: PR template/instruction precedence, sources of sampled conventions, branch/worktree layout, authorized delivery/state gates and integration limitations.
- `docs/agents/domain.md`: existing or agreed layout and consumer rules.

Use the sibling provider templates as seeds, not as evidence of actual capabilities. The ADO template deliberately leaves project facts unresolved until discovered. Preserve existing edits when refreshing setup.

## 4. Write agreed configuration

For Copilot, prefer the existing canonical `AGENTS.md` or `.github/copilot-instructions.md` that the runtime reads; default to `AGENTS.md` when neither exists. If `AGENTS.md` and `CLAUDE.md` are linked, edit their canonical target once. If only `CLAUDE.md` exists but the current harness does not load it, create a small `AGENTS.md` pointer to the shared configuration rather than duplicate or move unrelated instructions.

Update the existing `## Agent skills` block in place. Include one-line pointers for tracker, workflow, domain docs, and triage mapping when used. Preserve surrounding content and path-specific instructions.

Write approved docs only. Creating labels/tags, linking artifacts, changing states, modifying remotes, and changing global plugins require their own authorization. Never record guessed states or "validated" results.

## 5. Verify

Resolve every pointer and read the generated configuration as its downstream consumer. Confirm provider, target, mapped roles, supported operations and completion gates are internally consistent. Report unresolved fields and unavailable integrations; do not claim remote operations were verified if only files were written.

Tell the user which files changed. They can edit `docs/agents/*.md` later or rerun this skill to refresh it.
