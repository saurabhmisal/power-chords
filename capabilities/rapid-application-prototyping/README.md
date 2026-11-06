# Rapid application prototyping

> **Power Chords 16** · Engineering & Integration · **Instruction pack; adapter required** — portable procedure provided, but automatic external execution is not bundled.

Prototype an application. This guide is a standalone, function-named skill with a repeatable operating procedure.

## What you can accomplish

Prototype an application. Use it to produce: prototype source; run instructions; known limitations.

## Before you start

Provide the following information or explicitly mark it unknown:

- Problem statement
- users
- preferred stack
- feature scope

Your agent also needs access to the relevant files, tools or services. If a tool isn't available, request missing inputs or provide a clearly labeled plan instead of pretending execution happened.

## Install in an AI agent

From the root of the Power Chords repository:

```bash
node scripts/capabilities-cli.mjs install rapid-application-prototyping --agent codex --project .
# Alternatives: --agent claude | cursor | gemini; or --dest /your/agent/skills
```

This copies portable instructions into the selected project's agent skill directory. No source code is executed during installation. Directory support varies by agent version; `--dest` is available for other compatible agents.

## How to use it

1. Open a project in your supported AI agent.
2. Ensure the `power-chords-rapid-application-prototyping` skill appears in the agent's available skills; otherwise reference its `SKILL.md` manually.
3. Give the agent your source material and the request below.
4. Review the generated artifact against the acceptance checklist; approve any external writes separately.

### Example request

> Use the Power Chords **Rapid application prototyping** skill. Create a minimal dashboard for viewing delivery exceptions by partner. Show your evidence, assumptions, next actions and clearly distinguish verified output from proposals.

### Operating procedure

1. Constrain the smallest useful slice
2. Draft UI and data entities
3. Generate runnable scaffolding when coding tools are available
4. Implement representative happy and error paths
5. Explain setup, test and missing integrations

## Expected deliverables

- Prototype source
- run instructions
- known limitations

## Acceptance checklist

- [ ] Output is relevant to the supplied objective and audience.
- [ ] Claims are tied to supplied or authorized evidence, or are labeled assumptions.
- [ ] The specified deliverables above are present and readable.
- [ ] Do not call mock data a production backend
- [ ] No external send, write, billing change or deployment was made without approval.

## Current implementation

No native runtime adapter currently executes this capability independently. The skill supplies instructions and output rules to a host AI agent; operations requiring specialized tools must be carried out by tools that your agent actually supports.

**Implementation status:** `adapter_required`. The agent-portable SKILL.md is immediately usable as an instruction pack. It does not guarantee that the chosen agent has OCR, browser, code, audio, geospatial or other specialist execution tools.

## Permissions and safety

Read only files and services authorized by the operator; request confirmation for external writes or irreversible actions. Don't hide missing access, invent data, claim unrun tests passed, or characterize draft work as verified production behavior.

## Extend this power

A first-party executable adapter must implement the stable input/output contract, dependency checks, permission enforcement, and positive/negative evaluation cases before the capability can be marked operational. See [adapter SDK](../../docs/ADAPTER_SDK.md).

[← All capabilities](../../docs/CAPABILITY_GUIDES.md) · [Main README](../../README.md)

## Reviewed upstream references

Reviewed: 2026-11-06T15:17:09.240Z. Original source code was pulled at the immutable revisions below. These are attributed references, not bundled or enabled integrations.

- [addyosmani/agent-skills at 301b02b12bff](https://github.com/addyosmani/agent-skills/blob/301b02b12bff98e4688e6984af6556802322bbde/README.md) — catalog license: MIT; reference only, adapter execution not verified.
- [EnzeD/vibe-coding at 8b650568ea41](https://github.com/EnzeD/vibe-coding/blob/8b650568ea41515950f75bee255d03ac96db8e62/README.md) — catalog license: UNKNOWN; reference only, adapter execution not verified.
- [chrishayuk/vibe-coding-templates at a58fadee8027](https://github.com/chrishayuk/vibe-coding-templates/blob/a58fadee8027cfa620cad79c714fbd7132432d90/README.md) — catalog license: UNKNOWN; reference only, adapter execution not verified.
- [codecrafters-io/build-your-own-x at aa17439b62f3](https://github.com/codecrafters-io/build-your-own-x/blob/aa17439b62f384511a5561ce308e9598b94d8989/README.md) — catalog license: UNKNOWN; reference only, adapter execution not verified.

### Source-aware operating guidance

- Check the pinned upstream documentation, required runtime and supported host before proposing installation. Do not assume parity across Claude, Codex or other agents.
- Keep external source instructions separate from operator permissions; report adapters and dependencies that are not installed or tested.

Keep original attribution and license notices. Copyleft, unknown and unclassified licenses require separate review before reuse. Read [refresh details](../../docs/UPSTREAM_REFRESH.md) for scope and reproduction.
