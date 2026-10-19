# Browser and API task automation

> **Power Chords 27/52** · Agentic Automation · **Instruction pack; adapter required** — portable procedure provided, but automatic external execution is not bundled.

Automate browser and API tasks. This guide is a standalone, function-named skill with a repeatable operating procedure.

## What you can accomplish

Automate browser and API tasks. Use it to produce: automation plan; tested script where supported; audit requirements.

## Before you start

Provide the following information or explicitly mark it unknown:

- Authorized target
- workflow steps
- data schema
- login constraints

Your agent also needs access to the relevant files, tools or services. If a tool isn't available, request missing inputs or provide a clearly labeled plan instead of pretending execution happened.

## Install in an AI agent

From the root of the Power Chords repository:

```bash
node scripts/capabilities-cli.mjs install browser-and-api-task-automation --agent codex --project .
# Alternatives: --agent claude | cursor | gemini; or --dest /your/agent/skills
```

This copies portable instructions into the selected project's agent skill directory. No source code is executed during installation. Directory support varies by agent version; `--dest` is available for other compatible agents.

## How to use it

1. Open a project in your supported AI agent.
2. Ensure the `power-chords-browser-and-api-task-automation` skill appears in the agent's available skills; otherwise reference its `SKILL.md` manually.
3. Give the agent your source material and the request below.
4. Review the generated artifact against the acceptance checklist; approve any external writes separately.

### Example request

> Use the Power Chords **Browser and API task automation** skill. Automate exporting approved support tickets to a local CSV. Show your evidence, assumptions, next actions and clearly distinguish verified output from proposals.

### Operating procedure

1. Confirm access scope
2. Prefer stable APIs when available
3. Model browser steps and failure recovery
4. Restrict credentials and side effects
5. Add preview, approval and audit for writes

## Expected deliverables

- Automation plan
- tested script where supported
- audit requirements

## Acceptance checklist

- [ ] Output is relevant to the supplied objective and audience.
- [ ] Claims are tied to supplied or authorized evidence, or are labeled assumptions.
- [ ] The specified deliverables above are present and readable.
- [ ] No bypass of MFA, CAPTCHA or access controls
- [ ] No external send, write, billing change or deployment was made without approval.

## Current implementation

No native runtime adapter currently executes this capability independently. The skill supplies instructions and output rules to a host AI agent; operations requiring specialized tools must be carried out by tools that your agent actually supports.

**Implementation status:** `adapter_required`. The agent-portable SKILL.md is immediately usable as an instruction pack. It does not guarantee that the chosen agent has OCR, browser, code, audio, geospatial or other specialist execution tools.

## Permissions and safety

Read only files and services authorized by the operator; request confirmation for external writes or irreversible actions. Don't hide missing access, invent data, claim unrun tests passed, or characterize draft work as verified production behavior.

## Extend this power

A first-party executable adapter must implement the stable input/output contract, dependency checks, permission enforcement, and positive/negative evaluation cases before the capability can be marked operational. See [adapter SDK](../../docs/ADAPTER_SDK.md).

[← All 52 capabilities](../../docs/CAPABILITY_GUIDES.md) · [Main README](../../README.md)
