# Website and runtime recheck — unpublished draft

## Current results

| Check | Result |
|---|---|
| Complete automated suite | 67 passed, no failures or skips in the configured local environment |
| Live capability paths | 52 of 52 passed with actual Codex calls, synthetic inputs and generated files |
| Additional runtime checks | Public HTML fetch, live public web research, CSV dashboard |
| Browser interactions | Exception creation/assignment/resolution; onboarding errors and completion; calculated dashboard filter |
| Catalog and capability validators | Passed: 64 source references and 52 portable capability packs |
| Static and hosted builds | Passed locally; neither publishes |
| Generated static pages | 56, including 52 capability pages, workspace and verification gallery |
| Internal links and local assets | 1,601 checked; no missing targets |
| GIFs | Autoplay; optional pause; reduced-motion posters; no GIF download option |
| Publication | Local draft only; explicit approval still required |

[Runtime verification](RUNTIME_VERIFICATION.md) describes exact checks. The private gallery links each real run, output files and receipts. The [runtime guide](CODEX_RUNTIME.md) states inputs, dependencies and limits. The older offline Workroom remains separate; its 23/29 status split no longer describes the new Codex workspace.

## Scope that remains separate

- Illustrative GIFs explain procedures; they are not screen recordings of tool execution.
- Static hosting serves the library and instruction downloads. It cannot execute this computer’s Codex sign-in or local specialist tools. A public multi-user execution service has not been deployed.
- Browser automation currently performs public HTTP and reviewed requests. Private service logins, general browser clicking, CRM/accounting connectors, payment processing and production notifications are not claimed as implemented integrations.
- Prototypes are session-only. CAD supports rectangular STL plus dimensioned illustrations; forecasts use simple regression; video is a rendered title-card explainer. Model-generated judgments need human review.
- Retained repositories remain design references after delivery-path review; they have not all been executed or certified by this runtime. Attribution is preserved.
- External URL inventory checks do not network-verify every link. Public-source runtime checks cover representative actual URLs.
- Production analytics, public hosting, deployment cache behavior and live service credentials must be reviewed only after specific publication approval. No push or deployment has occurred.

Repeat website checks with python3 scripts/audit-website.py. Ordinary tests do not consume Codex usage; the live verification runner does.
