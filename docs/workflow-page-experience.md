# Using an individual workflow

Every workflow follows three steps: download it, open it in your AI agent, and add your context. Its page names the inputs, suggests where to find them, and lists the outputs to review.

## Controls

| Control | Result |
|---|---|
| Download workflow | Opens the existing Lazo account with this workflow selected. After email verification, its Markdown file downloads automatically. A signed-in account downloads it directly. |
| See an example | Moves to a sample task, starter prompt and illustrated workflow. |
| Your AI agent | Changes the three usage instructions and the optional install command. |
| Copy starter prompt | Copies the visible example prompt. Replace its task and supply your own context in your agent. |
| Advanced: install in a project | Reveals an optional terminal command and its Git/Node.js requirements. |
| Copy install command | Copies the command for the selected workflow and agent. Replace the example project path. |
| Pause / Resume animation | Switches between the illustrated GIF and its static poster. Reduced motion starts with the poster. |
| The workflow, step by step | Expands the workflow's method and review checklist. |
| Latest workflow review | Expands the existing dated source-review history. |
| Related workflow | Opens that workflow's page. |
| All workflows | Returns to the searchable, filterable library. |
| Already registered? Sign in | Requests a sign-in code for the existing account and keeps the selected workflow. |
| Verify email | Verifies the code, signs in this browser and starts the selected available download. |

## Information and where it belongs

The account form collects first name, last name, email, an optional phone number, system preference and acceptance of the current terms. The account service records verification and download access. A single verified Lazo account has access to Pencil and Power Chords, subject to existing access restrictions and release availability.

Workflow-specific material goes in the user's chosen agent. For example, Customer Discovery uses interview notes from calls, a current process description, complaints from support tickets or reviews, and concrete failures from screenshots or incidents. The site does not collect those work inputs. Each of the 52 workflow pages has its own source guidance.

The download is a Markdown instruction file. The user's AI agent provides its model, connected tools and execution environment. The example animation illustrates the method. Review the evidence and result before using it.

## Protected delivery

Individual workflow files are served by the existing Firebase-backed account service. The service requires a verified session, access to Power Chords and the current terms. It validates each file against its reviewed manifest and checks revocation before streaming. Public static copies are removed; legacy file URLs route to the selected shared-account download.

The selected workflow persists through signup, sign-in and email verification for up to one hour in the browser's session storage. Explicitly selecting Pencil or the full bundle clears that selection. Signing out clears it too.

Completed-transfer measurement retains existing analytics choices, owner/test exclusions, byte verification and one-use measurement tickets. Workflow tickets are bound to the exact selected workflow. User work and form values are excluded from these events.

## Updating the private download manifest

After reviewing skill source changes, run:

```
node scripts/export-workflow-downloads.mjs /absolute/path/to/private-account-repo/data/power-chords-workflows.json <reviewed-40-character-source-revision>
```

Run the account integrity and authorization tests before publication. Deploy the account service before publishing pages that use the new individual-file route. Preview and exact publication approval remain required by the repository's release rules.
