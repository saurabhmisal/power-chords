# Use Power Chords across platforms

Power Chords capability packs are portable Markdown instructions. They describe inputs, steps, output contracts, and review expectations. They do not contain credentials, grant permissions, or install specialized execution tools.

## Coding agents

Clone https://github.com/saurabhmisal/power-chords and use Node.js 24.x. From that checkout, install a capability by slug:

```bash
node scripts/capabilities-cli.mjs install prd-and-specification-writing --agent claude --project ../my-project
```

Supported installer values and project-relative destinations:

| Value | Platform | Directory |
|---|---|---|
| claude | Claude Code | .claude/skills/ |
| codex | Codex | .agents/skills/ |
| cursor | Cursor | .cursor/skills/ |
| gemini | Gemini CLI | .gemini/skills/ |

Replace the slug with another capability or use `install --all` to copy the library. Confirm discovery in your host: product versions and configuration can change skill loading. An installed instruction pack is not a running external integration.

## Other agents with instruction directories

```bash
node scripts/capabilities-cli.mjs install prd-and-specification-writing --dest ../my-project/custom-skills
```

Point the host at the installed SKILL.md. Use your host's supported directory or loading mechanism; the custom path is only an example.

## Chat-based platforms, including Claude web and ChatGPT

1. Choose and download a single relevant capability Markdown file from the landing page, or retrieve its SKILL.md from the repository.
2. If your host supports file attachments or reusable instructions, add the file there. Otherwise, paste its relevant instructions into the conversation within that host's context limits.
3. Supply authorized source context, your objective, constraints, and desired output.
4. Ask the host to follow the capability's output contract and flag assumptions and missing evidence.
5. Verify sources and review the result before external use.

Claude Code folder installation does not install into Claude web. No automatic plugin or account connection is implied for any chat platform. The model may need additional tools for research, document extraction, coding, or media generation. Follow the platform's data-handling and permission settings.

## Starter request

Use the attached Power Chords capability. Work only from the authorized evidence and tools I provide. Produce the documented output, separate evidence from assumptions, and flag missing information. Do not claim unavailable tool execution. Ask before sending messages, publishing, deploying, modifying external accounts, or taking other consequential external actions.

## Native Workroom alternative

Run `npm start` in the repository and open http://127.0.0.1:4327. Native drafting uses deterministic templates, without a model key. A hosted deployment processes context on its server and stores recent history in the current browser; it is not a cross-platform account synchronization service.

First-party instructions use the repository's MIT license. Preserve attribution and review independent licenses for external source material.
