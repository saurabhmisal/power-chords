# Versioned Power Chords releases

package.json and release.json identify the reviewed semantic version and build number. A portable package embeds both identities and the exact Git source commit in its manifest and START_HERE.md. Changed distributed bytes require a new build number. The archive is deterministic for one pinned source commit.

Source pushes and weekly drafts are not customer releases. Prepare and verify the package, register the immutable artifact in Lazo Access, then explicitly select the accepted artifact ID/checksum as the published portable release. A newer upload never changes the selected customer download. Rollback selects an earlier accepted build. Capability IDs, install slugs, attribution and licenses stay unchanged.

The owner requested this release/version separation for all Lazo tools on November 7, 2026. This metadata change does not approve future capability refreshes or unrelated website publication.
