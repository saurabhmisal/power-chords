# No AI Slop publication proposal

Status: repository publication approved by the user on November 10, 2026 after reviewing the local preview. The approval covers committing the prepared update to Power Chords. Website redesign, external releases and installed-client updates are outside this approval.

Proposed change: add the portable `power-chords-no-ai-slop` skill with editing and audit modes, apply its shared editorial standard to CodexConnection requests, and expose the workflow through the repository instructions. Existing capability IDs, the 52 base capabilities, website headers and navigation remain unchanged.

The policy preserves voice, uncertainty, meaningful detail and consistent technical terms. Audits return findings rather than unsolicited rewrites. Technical words are assessed in context rather than prohibited. Exact quotations and valid code remain unchanged.

Preview files: `workflows/no-ai-slop/SKILL.md`, `editorial-policy.md`, `eval.md`, `cases.json` and `README.md`. Implementation files: `src/runtime/editorial-policy.mjs`, the minimal change to `src/runtime/codex.mjs`, and `test/no-ai-slop.test.mjs`.

Verification: targeted local integration and installation checks passed. The suite includes a mock Codex executable, not a live-model call. Eight positive and negative behaviour cases are supplied for later live evaluation. The complete repository suite and hosted deployment were not run.

The approved change is limited to the files described above. Autonomous upstream updates remain disabled. Repository checks, deployment and installed-client status must be reported separately.
