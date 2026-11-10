# Scope

This fork adapts the upstream engineering disciplines to GitHub Copilot desktop/CLI and Azure DevOps while retaining GitHub, GitLab, and configured local/custom tracking.

Changes should address an observed workflow problem, follow repository/team conventions rather than impose an unrelated template, and retain explicit authorization boundaries. Provider-specific branches belong behind the shared environment-workflow reference; repository facts belong in the repository's own `docs/agents/` contract.

Promoted engineering/productivity skills ship in the plugin. Miscellaneous, in-progress, and deprecated skills retain their upstream status and do not ship.

The `.out-of-scope/` notes and `.agents/adr/` record historical upstream decisions. They are useful context, not a ban on this fork's deliberate Copilot/ADO support, native question tools, or workflow adaptation. Existing upstream sample configuration is not this fork's user or project policy.
