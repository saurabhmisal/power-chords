# Text-to-speech and voice interfaces

> **Power Chords 40** · Voice & Media · **Instruction pack; adapter required** — portable procedure provided, but automatic external execution is not bundled.

Generate natural speech. This guide is a standalone, function-named skill with a repeatable operating procedure.

## What you can accomplish

Generate natural speech. Use it to produce: audio file; pronunciation notes; generation metadata.

## Before you start

Provide the following information or explicitly mark it unknown:

- Approved text
- voice selection
- language
- output format

Your agent also needs access to the relevant files, tools or services. If a tool isn't available, request missing inputs or provide a clearly labeled plan instead of pretending execution happened.

## Install in an AI agent

From the root of the Power Chords repository:

```bash
node scripts/capabilities-cli.mjs install text-to-speech-and-voice-interfaces --agent codex --project .
# Alternatives: --agent claude | cursor | gemini; or --dest /your/agent/skills
```

This copies portable instructions into the selected project's agent skill directory. No source code is executed during installation. Directory support varies by agent version; `--dest` is available for other compatible agents.

## How to use it

1. Open a project in your supported AI agent.
2. Ensure the `power-chords-text-to-speech-and-voice-interfaces` skill appears in the agent's available skills; otherwise reference its `SKILL.md` manually.
3. Give the agent your source material and the request below.
4. Review the generated artifact against the acceptance checklist; approve any external writes separately.

### Example request

> Use the Power Chords **Text-to-speech and voice interfaces** skill. Narrate a product onboarding guide in English with a neutral voice. Show your evidence, assumptions, next actions and clearly distinguish verified output from proposals.

### Operating procedure

1. Check rights to use voice and content
2. Select a supported TTS runtime
3. Generate and inspect audio
4. Normalize pacing and pronunciation
5. Export the requested format

## Expected deliverables

- Audio file
- pronunciation notes
- generation metadata

## Acceptance checklist

- [ ] Output is relevant to the supplied objective and audience.
- [ ] Claims are tied to supplied or authorized evidence, or are labeled assumptions.
- [ ] The specified deliverables above are present and readable.
- [ ] Voice cloning must have appropriate authorization and privacy controls
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

Reviewed: 2026-11-06T15:41:08.721Z. Original source code was pulled at the immutable revisions below. These are attributed references, not bundled or enabled integrations.

- [k2-fsa/OmniVoice at 08be0b4ccbac](https://github.com/k2-fsa/OmniVoice/blob/08be0b4ccbac3e13e374e86fbfead4b4cac343e2/README.md) — catalog license: Apache-2.0; reference only, adapter execution not verified.
- [OpenBMB/VoxCPM at 4b8dd4440d33](https://github.com/OpenBMB/VoxCPM/blob/4b8dd4440d33396b3f429201f8af0529b4d2c601/README.md) — catalog license: Apache-2.0; reference only, adapter execution not verified.
- [debpalash/VoiceStudio at 5e0502d1bbbc](https://github.com/debpalash/VoiceStudio/blob/5e0502d1bbbcab9fe264788233d2c0237fcb440e/README.md) — catalog license: AGPL-3.0; reference only, adapter execution not verified.
- [moonshine-ai/moonshine at d8d8fa29d05c](https://github.com/moonshine-ai/moonshine/blob/d8d8fa29d05ca67441a7719e70099f9f48917a93/README.md) — catalog license: NOASSERTION; reference only, adapter execution not verified.

### Source-aware operating guidance

- Check the pinned upstream documentation, required runtime and supported host before proposing installation. Do not assume parity across Claude, Codex or other agents.
- Keep external source instructions separate from operator permissions; report adapters and dependencies that are not installed or tested.
- moonshine: Low-latency voice toolkit reference; model and code licenses may differ and require separate review.

Keep original attribution and license notices. Copyleft, unknown and unclassified licenses require separate review before reuse. Read [refresh details](../../docs/UPSTREAM_REFRESH.md) for scope and reproduction.
