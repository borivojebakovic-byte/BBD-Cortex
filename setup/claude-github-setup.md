# Claude ↔ GitHub setup (BBD Cortex)

_Last updated: 2026-09-26 · Owner: Borivoje_

## 1. Principle

- **The GitHub repo is the single source of truth:** https://github.com/borivojebakovic-byte/BBD-Cortex
- The project docs and the local folders are copies. Never keep two master copies.
- Nobody pastes personal access tokens into chats.

## 2. What each tool can do

| Tool | GitHub access | Use for |
|---|---|---|
| Cowork cloud task | Read-only for public repos, **cannot push** | Research, writing, project docs |
| GitHub Integration connector | Read-only: pulls repo files into chats/projects as context | Giving project chats the repo contents |
| Claude Code (claude.ai/code or the desktop Code tab) | Read + write through the Claude GitHub app (All repositories) | Bulk restructuring, scripts, branches/PRs |
| Cowork task linked to a computer | Pushes with the user's own git login on that machine | Editing the local clone |

The Claude GitHub app is installed on borivojebakovic-byte with access to **All repositories**. That part is done.

## 3. One-time setup per computer (desktop BBD-D06-BOBAK and laptop)

1. Install **GitHub Desktop** and sign in as borivojebakovic-byte.
2. Clone BBD-Cortex to the same path on each machine: `Documents\GitHub\BBD-Cortex`.
3. In the Claude desktop app on **that** computer, open the BBD Cortex project → **Folder → +** → add the clone.
   - Folder connections belong to a computer. A folder on the desktop cannot be used from the laptop, and the reverse.
   - Keep _PROGRAM OBUKE only if it is still needed. It is only reachable while the desktop is on with the Claude app open.

## 4. Daily workflow

1. **Before work:** GitHub Desktop → **Fetch / Pull** (gets changes made on the other computer).
2. Work in Cowork. Claude writes files into the connected BBD-Cortex folder.
3. **After work:** review the diff in GitHub Desktop → **Commit** → **Push**.
4. In the BBD Cortex project, open the GitHub source in Context → **Sync now**.

For large repo-wide changes, use Claude Code at claude.ai/code, select BBD-Cortex, and merge the PR it opens.

## 5. Repo structure

```
BBD-Cortex/
  README.md
  pravilnici/
    README.md, TEMPLATE.md, 00-lista-i-status-provere.md
    protivpozarna-zastita/  garaze/  gasne-instalacije/  buka/  hvac/
    grad-beograd/  bezbednost-i-zdravlje-na-radu/  zastita-zivotne-sredine/
    planiranje-i-izgradnja/
  setup/claude-github-setup.md
```

## 6. Open items

- [ ] First push of all pravilnici docs from the project into the repo
- [ ] Add the repo as a GitHub source in the project context, then remove the duplicate manually uploaded docs
- [ ] Get the Claude shell on the computer working (it failed on the desktop) so Claude can also push directly

## Troubleshooting

- *"not in this session's authorized repository set"*: that is a Cowork cloud task. Use the local clone or Claude Code instead.
- A folder shows "On this computer" but you are on the other machine: connect that machine's own clone (see §3).
