---
name: pr
description: "Use when writing or revising a PR body. Follows repository templates and team conventions for GitHub or Azure DevOps, with evidence proportional to the change."
metadata:
  credits:
    skill: show-me
    author: Dex Horthy
    organisation: Humanlayer
    url: "https://github.com/humanlayer/skills/blob/main/plugins/show-me/skills/show-me/SKILL.md"
---

# Repository-shaped PR bodies

Call the Skill tool with "environment-workflow" to resolve provider, target, instructions, and mutation boundaries. This skill **drafts the body**; it does not authorize PR creation, remote edits, work-item mutations, or merge.

## Find the shape

Use this precedence:

1. The user's explicit request and applicable repository instructions.
2. The applicable repository PR template. Check tracked `.github`, `.azuredevops`, `.vsts`, root/docs locations, and any configured branch-specific template for the intended target branch. Fill its headings, checklists, and comments; preserve required sections, using an honest "Not run" or "N/A" where appropriate.
3. If no template settles the shape, inspect a small representative sample of recent completed PRs **in the same repository**, across several team authors and comparable change sizes. Exclude the current user's work as the sole basis for team norms. Separate authored content from generated summaries, bot additions, and auto-appended AI description/classification blocks. Treat the sample as evidence, not declared policy.
4. When examples are unavailable or inconsistent, say so and use a concise fallback: what changed and why, actual validation, and material risks or remaining validation. Ask only if the unresolved convention materially affects the result.

Never import a template from an unrelated team or treat sampled auto-completion settings as authorization.

## Write to the reviewer

Read the actual diff against the configured parent and relevant commits/spec/work items. Use `GLOSSARY.md` vocabulary when present. Explain the behavior or problem and meaningful change, not a file-by-file inventory.

Match complexity to the change and discovered shape:

- A simple change can be a sentence or short bullets.
- A more involved fix may need problem/root cause, changes, validation, and scope or remaining validation. Use the repository's wording, not mandatory headings from this skill.
- Add a diagram, small code sketch, or screenshot only when it clarifies something prose would obscure and the target renderer supports it. Plain Markdown is the portable default; Mermaid support in one provider does not imply support in ADO.

State only evidence actually observed. Give relevant commands/results or available before/after evidence without fabricating a baseline, screenshot, CI pass, or manual test. Clearly separate not-run tests, pending hardware/external validation, and known limits.

Explain material compatibility, rollout, rollback, security, or migration risks when relevant. There is no mandatory visual, "Door", or "Merge Danger" section unless the repository asks for it.

Use provider-correct PR and work-item references from the repository contract. ADO body mentions are not verified artifact links. Keep internal examples and sensitive source material out of public repositories.

## Deliver

Return the body without a preamble when only a draft was requested. If publishing was separately requested, re-read the live PR state and body, preserve concurrent/user-authored sections, use the available provider operation, then verify the saved result. Leave auto-complete/auto-merge off unless explicitly requested.
