---
name: environment-workflow
description: "Repository-aware Copilot workflow. Use before PR drafting or publishing, work-item creation or triage, tracker-backed planning, and implementation branch or delivery decisions. Resolves provider, repository conventions, permissions, and work-item lifecycle."
---

# Environment workflow

Resolve the **repository contract** before acting. Reuse an already verified contract in this session unless the target or relevant configuration changes.

## 1. Discover the contract

Read applicable `AGENTS.md`, `.github/copilot-instructions.md`, path-specific instructions, and any instruction files the current harness actually loads. Follow existing `CLAUDE.md` pointers or links without assuming it is canonical. Read `docs/agents/issue-tracker.md`, `triage-labels.md`, and `workflow.md` when present. Follow repository policy before defaults in this skill.

Inspect git remotes, current branch, dirty state, configured parent, and default branch. A folder session may contain several repos: resolve the intended repo before making changes. Never add a remote, initialize git, or retarget a checkout just to make a tracker command work.

Code hosting and work tracking can differ. Identify each target independently, including account, host, organization/project, repository, and actual item or PR identity. Do not copy one repo's settings into another.

| Remote shape | Interpretation |
| --- | --- |
| `https://dev.azure.com/<org>/<project>/_git/<repo>` | Azure DevOps |
| `https://dev.azure.com/<org>/_git/<repo>` | Azure DevOps; project and repository both `<repo>` |
| `https://<org>.visualstudio.com/<project>/_git/<repo>` | Azure DevOps legacy host |
| `git@ssh.dev.azure.com:v3/<org>/<project>/<repo>` | Azure DevOps SSH |
| GitHub or GitHub Enterprise host | GitHub; keep the actual host and fork/base identities |
| GitLab or configured self-hosted GitLab | GitLab |
| No remote or an unrecognized host | Use existing tracker configuration; report unresolved identity rather than guessing |

Preserve decoded project/repository names, including spaces. Resolve the default branch with `git symbolic-ref refs/remotes/origin/HEAD --short` or `git remote show origin`; never assume `main`. For stacked work use the configured parent, not the default branch, as the comparison and PR target.

Done when the target and applicable instructions are known, or the missing identity is explicitly reported before any remote write.

## 2. Choose available capabilities

Use the tools actually exposed by the current runtime. Discover deferred tool schemas before calling them.

- **ADO:** prefer configured Azure DevOps MCP tools. Pass `orgName` or `organization` only when exposed; otherwise the instance is already scoped. Use `core_list_orgs` if exposed and needed. If MCP is unavailable, state that limitation and use installed `az repos` / `az boards` only with verified organization/project and supported command options. An authentication failure is not permission to bypass access controls.
- **GitHub:** use native Copilot app create/edit/review tools where required by the runtime; otherwise prefer `gh` with an explicit target, particularly in forks. Verify help before relying on newer CLI flags.
- **GitLab:** use configured tools or installed `glab`, explicitly targeted.
- **Local/custom:** follow the configured operations and their completion criteria. Missing support stays an explicit limitation, not an implicit switch to GitHub or local files.

Use PowerShell and Windows paths on Windows. Use temporary body files or PowerShell here-strings for multiline CLI input, not bash heredocs. Keep tokens out of command output, documents, and git.

In the Copilot app, prefer available session, pending-review, artifact, and feedback surfaces for the operation they support. A diff annotation is not a posted PR review. A staged review comment is not a submitted review. An app run badge is not a work-item state. Report which surface changed. Do not duplicate or replace a separately installed guided-review walkthrough.

## 3. Bound mutations

Read-only inspection, body drafting, posting a comment, submitting a review, replying/resolving a thread, creating/updating a PR, linking work, changing state, and merging are separate operations. Perform only those delegated by the user's request. A request to review or draft does not authorize remote mutations. Invocation of a publishing or triage skill authorizes only the described, agreed operations, not unrelated lifecycle actions.

**Auto-complete and auto-merge stay off unless the user explicitly requests them.** Neither team examples, green CI, nor an unattended session grants merge permission. Preserve reviewer, branch, policy, and validation gates. Never invent reviewers, labels, tags, state names, links, or validation results.

Before any PR edit, re-read live state and preserve concurrent edits. A closed or merged PR is not an edit target. For a requested inline reply, reply to that thread; resolve it only when requested or delegated, and never replace it with an unrelated top-level comment.

## 4. Branch and deliver

Follow configured worktree layout and branch conventions. Keep branches feature-bounded. For dependent slices, use explicit source/target branches and dependency order; use separate worktrees when parallel edits require isolation. Under a configured `D:\repos` / `D:\wt` layout, mirror organization/repository paths and prefix the leaf and session title with a real work-item ID when available. Do not fabricate an ID. Do not switch a shared checkout underneath another session.

Commit coherent phases and push when delegated by the workflow. Preserve unrelated edits and never reset a worktree to obtain a desired base. PR creation still requires a request for a PR. If requested, call the Skill tool with "pr" before writing its body.

## 5. Work-item lifecycle

For ADO operations, read [azure-devops.md](azure-devops.md) before creating, linking, triaging, or transitioning work.

Resolve semantic roles through the project's discovered mapping. A triage role is not automatically a label, a work-item type, or a process state. If there is no configured representation, report the gap rather than create taxonomy.

Distinguish **ready to implement**, **code committed**, **PR ready**, **resolved**, **validated**, and **closed**. A closed/rejected/abandoned item is not necessarily a successfully delivered dependency. Use the project's completion predicate for the frontier.

Some test projects explicitly permit Resolved once committed code is in a linked PR, followed by Close only on successful PR completion. That is a conditional project policy, not a global default. Production bugs and work needing external validation keep their stricter gates. An abandoned PR never implies successful completion.

After an authorized mutation, read back the item, PR, relation, or review state. Report partial success precisely; a body mention or successful command alone is not proof of linkage or completion.
