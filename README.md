# Repository-aware engineering skills

**rbeesley-skills** is an independently maintained set of engineering skills for GitHub Copilot and Azure DevOps, derived from [Matt Pocock's Skills for Real Engineers](https://github.com/mattpocock/skills). It retains small composable skills, domain language, tracer-bullet tickets, deep modules, and feedback-driven implementation, while evolving for this fork's environment. Original attribution and the [MIT license](./LICENSE) are preserved. Fork changes and updates come from rbeesley/skills; they are not an upstream release or a proposed upstream submission.

This fork adds a shared **repository contract**: discover the actual provider, team instructions, templates, work-item process, and available tools before acting. PR bodies follow repository templates first, then representative same-repo team practice, with detail proportional to complexity. No mandatory diagrams, Door labels, or Merge Danger sections. Auto-complete/auto-merge stays off unless explicitly requested.

## Install in Copilot

Plugin identity: **`rbeesley-skills@rbeesley`**. Do not install it alongside `mattpocock-skills@mattpocock` or a copied set of the same skills.

While the adaptation is on its feature branch, use its persistent worktree as a live local marketplace:

```powershell
copilot plugin marketplace add D:\wt\GitHub\rbeesley\skills\copilot-ado
copilot plugin install rbeesley-skills@rbeesley
```

Verify the fork in isolation first. When replacing upstream, remove only `mattpocock-skills@mattpocock` after the fork loads successfully, preserving all other plugins/settings. Existing conversations retain loaded context; use a fresh Copilot app or `agency copilot` session to pick up the replacement. Keep the worktree available while it is a live plugin source.

After publication to the fork's default branch, GitHub-source installation is:

```powershell
copilot plugin marketplace add rbeesley/skills
copilot plugin install rbeesley-skills@rbeesley
```

Local and GitHub registrations use the same marketplace name: switch the registration explicitly rather than assuming it retargets. Local installs follow checkout changes; they do not auto-pull GitHub. See the [installation, isolated preview, updates, and rollback guide](./.agents/install-block.md) before switching sources.

Rollback removes the fork and reinstalls `mattpocock-skills@mattpocock` from its retained marketplace. Never replace the entire settings file to switch one plugin.

## Configure each repository

Run `/setup-rbeesley-skills`. It discovers code hosting and tracking independently, reads Copilot instruction files, and writes agreed repository configuration under `docs/agents/`. The router is `/ask-rbeesley`; upstream's setup/router command names are replaced, not installed as duplicate aliases.

ADO is a first-class tracker, not freeform GitHub emulation. Setup discovers actual work-item types, required fields, states, tags, hierarchy and directed dependencies, PR artifact links, and project completion gates. It maps semantic triage roles to existing taxonomy rather than inventing labels. Missing integration is reported explicitly.

Drafting, read-only review, posting, linking, state changes, and merging remain separate permissions. ADO PR references use `!<id>` or full URLs; `#<id>` means a real work item. Text mentions do not verify native linkage. Test-project resolution-at-PR policies are conditional; production bugs and external validation retain their gates, and abandonment never means successful delivery.

Private team PR samples are not distributed in this public fork. Repositories discover their own examples at runtime. GitHub and GitLab support remains; custom/local tracking follows the configured contract. The wizard's bundled bash/GitHub helper has explicit platform limitations rather than pretending to provision ADO.

## Engineering

### User-invoked

- **[ask-rbeesley](./skills/engineering/ask-rbeesley/SKILL.md)**: Router over this maintained skill set.
- **[setup-rbeesley-skills](./skills/engineering/setup-rbeesley-skills/SKILL.md)**: Configure tracker, PR conventions, triage mappings, lifecycle, and domain docs.
- **[grill-with-docs](./skills/engineering/grill-with-docs/SKILL.md)**: Sharpen an idea while building glossary and ADRs.
- **[to-spec](./skills/engineering/to-spec/SKILL.md)**: Synthesize conversation into a spec on the configured tracker.
- **[to-tickets](./skills/engineering/to-tickets/SKILL.md)**: Publish vertical slices with verified hierarchy and blocking edges.
- **[implement](./skills/engineering/implement/SKILL.md)**: Build a ticket on its verified feature branch with TDD and review.
- **[implement-spec](./skills/engineering/implement-spec/SKILL.md)**: Work a task graph using the agreed per-ticket/stacked topology or explicitly selected integration branch.
- **[triage](./skills/engineering/triage/SKILL.md)**: Evaluate incoming requests and apply authorized mapped outcomes.
- **[wayfinder](./skills/engineering/wayfinder/SKILL.md)**: Chart large uncertain work as decision tickets.
- **[improve-codebase-architecture](./skills/engineering/improve-codebase-architecture/SKILL.md)**: Survey deepening opportunities and discuss a chosen seam.
- **[retro](./skills/engineering/retro/SKILL.md)**: Improve the agent's environment after a session.

### Model-invoked

- **[environment-workflow](./skills/engineering/environment-workflow/SKILL.md)**: Shared provider, repository, authorization, branch, and work-item lifecycle contract.
- **[pr](./skills/engineering/pr/SKILL.md)**: Write repository-shaped PR bodies with honest evidence and scope.
- **[code-review](./skills/engineering/code-review/SKILL.md)**: Review Standards and Spec against the intended parent and requested scope.
- **[tdd](./skills/engineering/tdd/SKILL.md)**: Build behavior one red-green-refactor slice at a time.
- **[diagnosing-bugs](./skills/engineering/diagnosing-bugs/SKILL.md)**: Diagnose from a tight reproducing feedback loop.
- **[prototype](./skills/engineering/prototype/SKILL.md)**: Answer a design question with throwaway code.
- **[research](./skills/engineering/research/SKILL.md)**: Investigate primary sources and preserve cited findings.
- **[domain-modeling](./skills/engineering/domain-modeling/SKILL.md)**: Sharpen domain terms and record decisions.
- **[codebase-design](./skills/engineering/codebase-design/SKILL.md)**: Design deep modules with clear seams.
- **[wizard](./skills/engineering/wizard/SKILL.md)**: Guide human-only setup with platform-appropriate handling.

## Productivity

### User-invoked

- **[grill-me](./skills/productivity/grill-me/SKILL.md)**: Stateless interview for non-repository work.
- **[handoff](./skills/productivity/handoff/SKILL.md)**: Preserve context for another directory, harness, or colleague.
- **[to-questionnaire](./skills/productivity/to-questionnaire/SKILL.md)**: Prepare questions for someone outside the conversation.
- **[wait-what](./skills/productivity/wait-what/SKILL.md)**: Re-explain a message with the missing context.
- **[teach](./skills/productivity/teach/SKILL.md)**: Learn through a stateful sequence of lessons.

### Model-invoked

- **[grilling](./skills/productivity/grilling/SKILL.md)**: Shared interview discipline.
- **[writing-for-agents](./skills/productivity/writing-for-agents/SKILL.md)**: Write predictable agent-consumed documents.

## Maintenance

Run `npm test` and `npm run check-plugin-version` (Node.js 22; no package installation needed for these checks). The checks cover promoted exposure, metadata, invocation parity, local pointers, fork identity, docs, and safety-contract regressions. They do not prove an LLM follows instructions or that a live ADO instance permits an operation. Behavioral scenarios in `scripts/fixtures/workflow-scenarios.json` exercise those boundaries through a read-only model session.

See [CONTRIBUTING.md](./CONTRIBUTING.md), [SCOPE.md](./SCOPE.md), and the [changelog](./CHANGELOG.md). Historical upstream docs/ADRs and non-promoted skills are retained as history, not claims that this fork is published on upstream's website or officially validated in every harness.
