# Use Power Chords with your AI agent

Power Chords **instruction packs** are portable. Actual abilities depend on your agent's access to tools, authorized content, and any installed runtime adapter. An SKILL.md file alone cannot perform OCR, deploy code, generate audio or retrieve live information.

## Install into a repository

```bash
npm run capabilities:list
node scripts/capabilities-cli.mjs show 10
node scripts/capabilities-cli.mjs install 10 --agent codex --project ./my-project
```

| Agent | Default project-relative skill folder | Invocation |
|---|---|---|
| Codex | `.agents/skills/` | Ask agent to use Power Chords skill; verify it is discovered |
| Claude Code | `.claude/skills/` | Ask agent to use Power Chords skill; verify it is discovered |
| Cursor | `.cursor/skills/` | Ask agent to use Power Chords skill; verify it is discovered |
| Gemini CLI | `.gemini/skills/` | Ask agent to use Power Chords skill; verify it is discovered |
| Other compatible agents | Custom `--dest <directory>` | Point agent to the installed `SKILL.md` |

Agent skill discovery can change with product versions and configuration. These default paths are provided as common layouts; if your agent uses another path, specify `--dest` and follow that agent's documentation.

## How to execute a skill

1. Provide your objective, authorized evidence, and desired output.
2. Ask your agent to invoke a Power Chords capability by functional name.
3. Allow read-only tool usage within the permissions you have granted.
4. Ask for a complete output, source citations where relevant, and explicitly flagged uncertainty.
5. Review the artifact; approve external writes, sends, billing changes, or deployments before any such actions.

## Running the native Workroom

```bash
npm start
# open http://127.0.0.1:4327
npm run demo
npm test
```

This exposes **four first-party structured document workflows**. Native assistance is not the same thing as autonomous implementation, and no external accounts are modified by these drafting flows.

## Security

The installer copies documentation and skill instructions only. It never runs arbitrary code or third-party installers and refuses existing destination folders unless `--force` is supplied. Review all instructions and permissions before giving an AI agent access to sensitive systems.

## Reference

- [52 usage guides](CAPABILITY_GUIDES.md)
- [Architecture](ARCHITECTURE.md)
- [Third-party notices](../THIRD_PARTY_NOTICES.md)
