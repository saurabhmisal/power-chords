# Video demos and educational content

> **Power Chords 42** · Voice & Media · **Instruction pack; adapter required** — portable procedure provided, but automatic external execution is not bundled.

Create explainers and product demos. This guide is a standalone, function-named skill with a repeatable operating procedure.

## What you can accomplish

Create explainers and product demos. Use it to produce: storyboard; render files when media tools are available; publishing checklist.

## Before you start

Provide the following information or explicitly mark it unknown:

- Script
- product access
- assets
- target channels

Your agent also needs access to the relevant files, tools or services. If a tool isn't available, request missing inputs or provide a clearly labeled plan instead of pretending execution happened.

## Install in an AI agent

From the root of the Power Chords repository:

```bash
node scripts/capabilities-cli.mjs install video-demos-and-educational-content --agent codex --project .
# Alternatives: --agent claude | cursor | gemini; or --dest /your/agent/skills
```

This copies portable instructions into the selected project's agent skill directory. No source code is executed during installation. Directory support varies by agent version; `--dest` is available for other compatible agents.

## How to use it

1. Open a project in your supported AI agent.
2. Ensure the `power-chords-video-demos-and-educational-content` skill appears in the agent's available skills; otherwise reference its `SKILL.md` manually.
3. Give the agent your source material and the request below.
4. Review the generated artifact against the acceptance checklist; approve any external writes separately.

### Example request

> Use the Power Chords **Video demos and educational content** skill. Create a 90-second walkthrough for an enterprise integration dashboard. Show your evidence, assumptions, next actions and clearly distinguish verified output from proposals.

### Operating procedure

1. Define audience and storyboard
2. Gather approved screenshots or recordings
3. Capture or generate media with available runtimes
4. Edit captions and sequencing
5. Verify claims, consent and licensing

## Expected deliverables

- Storyboard
- render files when media tools are available
- publishing checklist

## Acceptance checklist

- [ ] Output is relevant to the supplied objective and audience.
- [ ] Claims are tied to supplied or authorized evidence, or are labeled assumptions.
- [ ] The specified deliverables above are present and readable.
- [ ] Publishing and external uploads require approval
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

- [webadderallorg/Recordly at 109ca3a13c36](https://github.com/webadderallorg/Recordly/blob/109ca3a13c362e969d9add25d1f93406c36dba2a/README.md) — catalog license: NOASSERTION; reference only, adapter execution not verified.
- [raunakpatil/youtube-agentic-ai-studio at 22be5d044138](https://github.com/raunakpatil/youtube-agentic-ai-studio/blob/22be5d044138def44e96f0b26a2f1be66f491452/README.md) — catalog license: MIT; reference only, adapter execution not verified.
- [darkzOGx/youtube-automation-agent at e973d515aef9](https://github.com/darkzOGx/youtube-automation-agent/blob/e973d515aef90c467da2289144df737a3bd03859/README.md) — catalog license: MIT; reference only, adapter execution not verified.

### Source-aware operating guidance

- Check the pinned upstream documentation, required runtime and supported host before proposing installation. Do not assume parity across Claude, Codex or other agents.
- Keep external source instructions separate from operator permissions; report adapters and dependencies that are not installed or tested.

Keep original attribution and license notices. Copyleft, unknown and unclassified licenses require separate review before reuse. Read [refresh details](../../docs/UPSTREAM_REFRESH.md) for scope and reproduction.
