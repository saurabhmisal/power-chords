#!/usr/bin/env bash
# One-time publication with the REPOSITORY OWNER'S authenticated GitHub CLI.
# No secrets are bundled or written to files by this script.
set -euo pipefail
ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT"
if ! command -v git >/dev/null || ! command -v gh >/dev/null; then
  echo 'Install Git and GitHub CLI (gh) before publishing.' >&2
  exit 1
fi
if ! gh auth status >/dev/null 2>&1; then
  echo "Run 'gh auth login' with the saurabhmisal account and retry." >&2
  exit 1
fi
ACTIVE="$(gh api user --jq .login)"
if [[ "$ACTIVE" != 'saurabhmisal' ]]; then
  echo "Authenticated as $ACTIVE; expected saurabhmisal. Publication aborted." >&2
  exit 1
fi
REPOSITORY='saurabhmisal/power-chords'
REPOSITORY_EXISTS=false
if gh repo view "$REPOSITORY" >/dev/null 2>&1; then
  REPOSITORY_EXISTS=true
  # Accept a new, empty repository created in the GitHub web UI.
  # Never overwrite a non-empty repository or an existing history.
  BRANCH_COUNT="$(gh api "repos/$REPOSITORY/branches?per_page=1" --jq 'length')"
  if [[ "$BRANCH_COUNT" != '0' ]]; then
    echo "Repository $REPOSITORY already has branches. Refusing to overwrite existing history." >&2
    exit 1
  fi
fi
npm run validate:catalog
npm test
npm run build:site
if [[ ! -d .git ]]; then
  git init -b main
fi
if ! git rev-parse --verify HEAD >/dev/null 2>&1; then
  git add .
  git -c user.name='Saurabh Misal' \
      -c user.email='7881835+saurabhmisal@users.noreply.github.com' \
      commit -m 'feat: launch Power Chords — 52 capabilities for builders'
fi
# Create a public repository or use an existing empty one under the user's account.
if [[ "$REPOSITORY_EXISTS" == 'true' ]]; then
  if git remote get-url origin >/dev/null 2>&1; then
    echo 'An origin remote is already configured; refusing to change it.' >&2
    exit 1
  fi
  git remote add origin "https://github.com/$REPOSITORY.git"
  git push --set-upstream origin main
else
  gh repo create "$REPOSITORY" --public --description 'Power Chords: 52 practical capabilities for forward-deployed product managers and builders' --source . --remote origin --push
fi
printf 'Repository published: https://github.com/%s\n' "$REPOSITORY"
# GitHub Pages requires repository-level setup, attempted where allowed.
if gh api --method POST "repos/$REPOSITORY/pages" -f build_type=workflow >/dev/null 2>&1; then
  echo 'Enabled GitHub Pages (workflow mode).'
else
  echo "Enable GitHub Pages at https://github.com/$REPOSITORY/settings/pages -> Source: GitHub Actions"
fi
# The first push triggers the sync workflow. Manual dispatch is also possible.
echo 'Actions status: https://github.com/saurabhmisal/power-chords/actions'
echo 'Site (after first successful Pages deploy): https://saurabhmisal.github.io/power-chords/'

# Optional GitHub Projects V2 board, created under the same user when the CLI
# credential has the `project` scope. A missing scope does not block publishing.
echo 'Creating the Power Chords GitHub Project board (requires project scope)...'
if PROJECT_NUMBER="$(gh project create --owner "$ACTIVE" --title 'Power Chords' --format json --jq '.number' 2>/dev/null)" && [[ "$PROJECT_NUMBER" =~ ^[0-9]+$ ]]; then
  gh project edit "$PROJECT_NUMBER" --owner "$ACTIVE" --visibility PUBLIC \
    --description 'Power Chords: 52 composable capability sources, adapters, documentation, and safety' >/dev/null || true
  gh project link "$PROJECT_NUMBER" --owner "$ACTIVE" --repo "$REPOSITORY" || true
  echo "GitHub Project created: https://github.com/users/$ACTIVE/projects/$PROJECT_NUMBER"
  for TITLE in \
    'Implement reviewed adapters for executable third-party applications' \
    'Embed Power Chords in compatible desktop, web, and agent hosts' \
    'Implement verified skill upgrades, migration tests, and rollback' \
    'Add optional GitHub upstream webhook relay and notifications' \
    'Perform dependency, license, and permission review for all 52 sources'; do
      ISSUE_URL="$(gh issue create --repo "$REPOSITORY" --title "$TITLE" \
         --body 'Track as part of the Power Chords roadmap. See docs/PROJECT.md for the security, architecture, and acceptance requirements.' 2>/dev/null)" || continue
      gh project item-add "$PROJECT_NUMBER" --owner "$ACTIVE" --url "$ISSUE_URL" >/dev/null 2>&1 || true
  done
else
  echo "Could not create GitHub Project board with current GitHub CLI permissions. Run 'gh auth refresh -s project' and create it later if desired."
fi
