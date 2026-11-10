# Canonical fork installation

The fork's plugin is `rbeesley-skills`, marketplace `rbeesley`, source `rbeesley/skills`. The upstream plugin is `mattpocock-skills@mattpocock`. Keep attribution, but never direct fork installation or updates to upstream.

## Local development and pre-merge activation

Copilot supports a live local marketplace. It loads from the checkout rather than copying the plugin, so keep that checkout and branch available. This is the supported path while the adaptation exists only on a feature branch:

```powershell
copilot plugin marketplace add D:\wt\GitHub\rbeesley\skills\copilot-ado
copilot plugin install rbeesley-skills@rbeesley
```

In isolation, set `COPILOT_HOME` to a new scratch directory first, or use `COPILOT_PLUGIN_DIR_ONLY=true` with `--plugin-dir <checkout>` for a session-only preview. Neither changes the normal installed set.

Before normal activation, record the installed set and preserve the plugin settings. Install and verify the fork, then disable only `mattpocock-skills@mattpocock` for future sessions:

```powershell
copilot plugin disable mattpocock-skills@mattpocock
```

Keep its cached files while existing chats may still reference them; uninstall only after those sessions no longer depend on them. Retain its marketplace for rollback. Do not copy skills into personal directories too: that duplicates registrations. Preserve all unrelated marketplaces, plugins, and settings. Existing chats keep their loaded context; verify a fresh session without restarting them.

Local live plugins update when their checkout changes, not from GitHub automatically. Pull/rebase deliberately; a development checkout is trusted executable configuration. Do not enable automatic updates on a local path.

## Published default-branch installation

Only after the intended fork revision is on its default branch:

```powershell
copilot plugin marketplace add rbeesley/skills
copilot plugin install rbeesley-skills@rbeesley
```

If `rbeesley` is already registered as local, first remove that marketplace registration and re-add the GitHub source, then reinstall/verify the fork. Do not assume adding the same name changes its source. Use `copilot plugin update rbeesley-skills@rbeesley` for explicit updates. Automatic marketplace updates are optional and depend on the host's supported settings; do not silently enable them.

The current Copilot app and `agency copilot` share the installed Copilot plugin configuration on this machine. Confirm exposure in each desired host; support in CLI is not proof of loading in an already-running desktop conversation. VS Code is a separate host: its source-install entry is `https://github.com/rbeesley/skills`, after publication.

## Rollback

```powershell
copilot plugin uninstall rbeesley-skills@rbeesley
copilot plugin enable mattpocock-skills@mattpocock
```

Verify only one copy of each skill in a new session. Keep the local worktree until no live plugin or session depends on it. Other harnesses may consume the compatible `.claude-plugin` bundle, but this fork's activation checks target Copilot; upstream installation promises are not fork validation.

If upstream was uninstalled after its old sessions ended, reinstall it from the retained marketplace instead of enabling it.
