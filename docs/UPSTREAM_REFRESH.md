# Upstream code and capability refresh

Checked: 2026-11-14T02:43:03.870148+00:00.

Authenticated GitHub connector reads checked 64 existing sources. Forty-two default-branch heads advanced and four other records changed release metadata only. All forty-two comparisons are ahead of the published reference baseline. Two new public forks were reviewed and proposed as references, bringing the draft inventory to 66. The 170 owned repositories were enumerated through three authenticated search pages, including a terminal empty page. Private source details remain local.

Forty-four changed or new originals were fetched as filtered shallow Git snapshots excluding blobs at or above 1 MiB. Twenty-two unchanged records reuse earlier verified snapshots. Commit and tree identity, README, manifests, license notices and selected implementation paths were inspected. Larger blobs, Git LFS payloads, submodules and dependencies were not fetched or executed. This is not a full binary/media download, an exhaustive code audit or runtime certification. The cache and raw review evidence remain ignored under .local. Forks were not force-updated.

Current original declarations changed for Archify (MIT to Apache-2.0), Recordly (NOASSERTION to AGPL-3.0), Lemo-Opuscar (MIT to a mixed notice reported as NOASSERTION), and Sellbird, formerly Harvey (MIT to AGPL-3.0). The previous declarations remain in history and do not grant rights to the new revision. The mixed Lemo-Opuscar notice requires component-specific review. OpenMontage's canonical owner is now OpenMontageInc.

The initial refresh established a pinned baseline for the original inventory. Subsequent additions retain those verified references and add independently pinned new sources. New-source review and exclusions are documented in NEW_SOURCES.md; no change history is inferred before a source was first pinned. 56 fork revisions differ from their original upstream head.

## Applied to Power Chords

Every capability retains a reviewed source map, technical reference links, review time and explicit source-adapter scope. Forty-four portable instruction packs received focused guidance. No core workflow, first-party runtime behavior, approved skill name, ID or install slug changed. Portable instructions require checking the pinned source's current setup and host support before invoking external tools. Existing implementation statuses and first-party judgement behavior remain unchanged. Refreshed guidance covers graph provenance versus inference, independent test/evaluation evidence, marketing-context migration, and host-specific installation review. Source references are evidence for review, not a claim of operational adapters.

Licenses below are the existing catalog declarations, not a new compatibility determination. Original license documents were fetched into the local cache where present. AGPL, unknown and NOASSERTION entries remain subject to review before integration or redistribution.

| Original upstream | Pinned revision | Files in snapshot | Catalog license | Fork relationship |
|---|---|---|---|---|
| [addyosmani/agent-skills](https://github.com/addyosmani/agent-skills/tree/301b02b12bff98e4688e6984af6556802322bbde) | `301b02b12bff` | 240 | MIT | Different upstream/fork revisions |
| [ai-job-search-dev/ai-job-search](https://github.com/ai-job-search-dev/ai-job-search/tree/0d0d1a907a21454affa1b694acc4e2c5008a0d21) | `0d0d1a907a21` | 317 | MIT | Different upstream/fork revisions |
| [lyogavin/airllm](https://github.com/lyogavin/airllm/tree/d7a4fea22ec1738bbc624c3aab822f5b4a27ac25) | `d7a4fea22ec1` | 107 | Apache-2.0 | Different upstream/fork revisions |
| [wheresryan22/anatomy](https://github.com/wheresryan22/anatomy/tree/1482e8469b0a9e0d8cc18ea2740a01423d29ae80) | `1482e8469b0a` | 173 | MIT | Different upstream/fork revisions |
| [goodnight000/api-anything](https://github.com/goodnight000/api-anything/tree/d40abd44f171c5cc444f1ac6b947afefa8605b78) | `d40abd44f171` | 747 | MIT | Different upstream/fork revisions |
| [tt-a1i/archify](https://github.com/tt-a1i/archify/tree/e37848822238e3a61b12739185cdadd49843a620) | `e37848822238` | 1189 | Apache-2.0 | Different upstream/fork revisions |
| [meta/astryx](https://github.com/meta/astryx/tree/7b3154197a9a9fca33d4aab859a6b35989d0e9cc) | `7b3154197a9a` | 11409 | MIT | Different upstream/fork revisions |
| [virgiliojr94/book-to-skill](https://github.com/virgiliojr94/book-to-skill/tree/e7bb659d3261491c8b28793dcb9102fa64a46c22) | `e7bb659d3261` | 142 | MIT | Different upstream/fork revisions |
| [career-ops-hq/career-ops](https://github.com/career-ops-hq/career-ops/tree/4e274c203f5aef274a38ba5c1c3c1ca4fa37212a) | `4e274c203f5a` | 3739 | MIT | Different upstream/fork revisions |
| [anvaka/city-roads](https://github.com/anvaka/city-roads/tree/35d6497db70debf4508b4d75f17d80c4367d66a6) | `35d6497db70d` | 56 | MIT | Different upstream/fork revisions |
| [AgriciDaniel/claude-seo](https://github.com/AgriciDaniel/claude-seo/tree/cca7e4a267991aca880efade1fd12e8498caf2ce) | `cca7e4a26799` | 505 | MIT | Different upstream/fork revisions |
| [EveryInc/compound-engineering-plugin](https://github.com/EveryInc/compound-engineering-plugin/tree/ee46dde75a40e297bd8eac4055a410a771d3ac1d) | `ee46dde75a40` | 2207 | MIT | Different upstream/fork revisions |
| [adefossez/demucs](https://github.com/adefossez/demucs/tree/829d21890023800713e5dd231c67e43ecc06069b) | `829d21890023` | 100 | MIT | Different upstream/fork revisions |
| [affaan-m/ECC](https://github.com/affaan-m/ECC/tree/d2ef2680594f9a17526a6e1a2e18b3d242c5d17b) | `d2ef2680594f` | 4701 | MIT | Different upstream/fork revisions |
| [openai/evals](https://github.com/openai/evals/tree/8eac7a7de5215c907fbddc30efdaf316913eccdd) | `8eac7a7de521` | 1728 | NOASSERTION | Matches fork |
| [Bennettxai/FounderOS](https://github.com/Bennettxai/FounderOS/tree/b44a3c5b418bb462e677a5f583f7e8e75da26590) | `b44a3c5b418b` | 1689 | MIT | Different upstream/fork revisions |
| [zubair-trabzada/geo-seo-claude](https://github.com/zubair-trabzada/geo-seo-claude/tree/989cae01e8ebbc42a9ec798eb9e7cb423f5ec89c) | `989cae01e8eb` | 71 | MIT | Matches fork |
| [bilawalsidhu/gods-eye-view](https://github.com/bilawalsidhu/gods-eye-view/tree/7df581765dadca8d3bf37b94b26897ccec93b9ad) | `7df581765dad` | 3574 | NOASSERTION | Different upstream/fork revisions |
| [Graphify-Labs/graphify](https://github.com/Graphify-Labs/graphify/tree/52cb28218eea0c68d80a9f4b2ae102d2fa63e267) | `52cb28218eea` | 1222 | Apache-2.0 | Different upstream/fork revisions |
| [garrytan/gstack](https://github.com/garrytan/gstack/tree/4bee369d4a417fb82c6d43c0b79351428305ef10) | `4bee369d4a41` | 5050 | MIT | Different upstream/fork revisions |
| [ethanplusai/sellbird](https://github.com/ethanplusai/sellbird/tree/25ec83978b21d16ae20779d09bfea113f37f0ef8) | `25ec83978b21` | 275 | AGPL-3.0 | Different upstream/fork revisions |
| [Lethe044/hermes-life-os](https://github.com/Lethe044/hermes-life-os/tree/4c247650492951d3537ce0264e67d4f5ec3e17fc) | `4c2476504929` | 297 | MIT | Different upstream/fork revisions |
| [alchaincyf/huashu-art-motion](https://github.com/alchaincyf/huashu-art-motion/tree/1468196505a51728686db118d52561aa27a25124) | `1468196505a5` | 517 | MIT | Different upstream/fork revisions |
| [heygen-com/hyperframes](https://github.com/heygen-com/hyperframes/tree/92816ed56bde07affff0f6e0a5bce3dd96a96808) | `92816ed56bde` | 10169 | Apache-2.0 | Different upstream/fork revisions |
| [hypit-ai/hypit](https://github.com/hypit-ai/hypit/tree/6bacce093695ccc2bde5aa5d7de230e9682ffa79) | `6bacce093695` | 1723 | NOASSERTION | Different upstream/fork revisions |
| [pbakaus/impeccable](https://github.com/pbakaus/impeccable/tree/acb4cfe14470b1fdf51e855431af618d936b7db8) | `acb4cfe14470` | 4629 | Apache-2.0 | Different upstream/fork revisions |
| [datalab-to/indra](https://github.com/datalab-to/indra/tree/ca81e18f7403435a3545c8c8ae9c4a1cecdd32a4) | `ca81e18f7403` | 58 | Apache-2.0 | Different upstream/fork revisions |
| [adewaskar/jarvis](https://github.com/adewaskar/jarvis/tree/9ae5ec846b6b20a17b2d264e699d6234c4284b23) | `9ae5ec846b6b` | 69 | MIT | Different upstream/fork revisions |
| [anthropics/knowledge-work-plugins](https://github.com/anthropics/knowledge-work-plugins/tree/e91a134584eb798bac7fb0379358006a2b63b965) | `e91a134584eb` | 1283 | Apache-2.0 | Different upstream/fork revisions |
| [langflow-ai/langflow](https://github.com/langflow-ai/langflow/tree/260cbf347cc5563cc48c79094c175ca31532ea2b) | `260cbf347cc5` | 11927 | MIT | Different upstream/fork revisions |
| [lemomo-ai/lemo-opuscar](https://github.com/lemomo-ai/lemo-opuscar/tree/3a7132b996be0241c1ea0ab180d519f06e6f10b6) | `3a7132b996be` | 3840 | NOASSERTION | Different upstream/fork revisions |
| [Ka1-S/LYNX-SHARE](https://github.com/Ka1-S/LYNX-SHARE/tree/d739ebc050fb7bcc0741d2f32f6adaab67f0bc9f) | `d739ebc050fb` | 7222 | AGPL-3.0 | Different upstream/fork revisions |
| [coreyhaines31/marketingskills](https://github.com/coreyhaines31/marketingskills/tree/1f837447b20bb6f0e72d87b80ece1c221c362c7d) | `1f837447b20b` | 840 | MIT | Different upstream/fork revisions |
| [midday-ai/midday](https://github.com/midday-ai/midday/tree/51587319f26a0ffaa9dfccab1920373cb65689b7) | `51587319f26a` | 2508 | AGPL-3.0 | Matches fork |
| [666ghj/MiroFish](https://github.com/666ghj/MiroFish/tree/7657031ac01184afe2cb220f5ee3545573b5e843) | `7657031ac011` | 128 | AGPL-3.0 | Matches fork |
| [moonshine-ai/moonshine](https://github.com/moonshine-ai/moonshine/tree/d8d8fa29d05ca67441a7719e70099f9f48917a93) | `d8d8fa29d05c` | 2395 | NOASSERTION | Different upstream/fork revisions |
| [HarnessMD/munder-difflin](https://github.com/HarnessMD/munder-difflin/tree/a5c2249cf599cc26e29e549f5d5cdc75373575fc) | `a5c2249cf599` | 4393 | MIT | Different upstream/fork revisions |
| [cheaper-inference/OmniRoute](https://github.com/cheaper-inference/OmniRoute/tree/e92f3801b37906cc8846c92146efa4377198f2a6) | `e92f3801b379` | 29186 | MIT | Different upstream/fork revisions |
| [k2-fsa/OmniVoice](https://github.com/k2-fsa/OmniVoice/tree/08be0b4ccbac3e13e374e86fbfead4b4cac343e2) | `08be0b4ccbac` | 89 | Apache-2.0 | Matches fork |
| [feitangyuan/onetake](https://github.com/feitangyuan/onetake/tree/abb6d17279cdc749e27e99aa534a062d8fd01ced) | `abb6d17279cd` | 114 | NOASSERTION | Different upstream/fork revisions |
| [every-app/open-seo](https://github.com/every-app/open-seo/tree/2df84ff91461cc55b6c8bb98f3ce0f195d2e463d) | `2df84ff91461` | 2358 | MIT | Different upstream/fork revisions |
| [OpenMontageInc/OpenMontage](https://github.com/OpenMontageInc/OpenMontage/tree/fecb9a1e3cc23ef84de30b272059457a427f16f8) | `fecb9a1e3cc2` | 2285 | AGPL-3.0 | Different upstream/fork revisions |
| [oblien/openship](https://github.com/oblien/openship/tree/8cddb267521e1198669a5fe17301da48121907af) | `8cddb267521e` | 8314 | Apache-2.0 | Different upstream/fork revisions |
| [DozenTwelve/Papermorph](https://github.com/DozenTwelve/Papermorph/tree/618aeeaad9852c8857db7bcaccc34f8d64c20b68) | `618aeeaad985` | 7753 | MIT | Different upstream/fork revisions |
| [vxcontrol/pentagi](https://github.com/vxcontrol/pentagi/tree/cffed9485aa1cca70762cd08a57ac62a80406258) | `cffed9485aa1` | 1728 | MIT | Different upstream/fork revisions |
| [DietrichGebert/ponytail](https://github.com/DietrichGebert/ponytail/tree/96608e078b2d5ea607c5c3b8b5a54d1c1fba6846) | `96608e078b2d` | 216 | MIT | Different upstream/fork revisions |
| [morluto/rea](https://github.com/morluto/rea/tree/5815178a8d581fa81a9422cdfb9f86dd5cb913d7) | `5815178a8d58` | 8359 | MIT | Different upstream/fork revisions |
| [webadderallorg/Recordly](https://github.com/webadderallorg/Recordly/tree/3bb3dd22377a4f7c3a2a082280bc2784537b2458) | `3bb3dd22377a` | 2484 | AGPL-3.0 | Different upstream/fork revisions |
| [KonstantinKai/reelkit](https://github.com/KonstantinKai/reelkit/tree/27fb5d7bea69d63bc5fa572c7f5a0f26127d7be7) | `27fb5d7bea69` | 1650 | MIT | Different upstream/fork revisions |
| [Jakeschincariol/replica-skill](https://github.com/Jakeschincariol/replica-skill/tree/77c9436fb3d18c3d58169efb8caf4fe906b0dc51) | `77c9436fb3d1` | 39 | MIT | Matches fork |
| [nateherkai/roast-room](https://github.com/nateherkai/roast-room/tree/e40f40652d5690c4d9f928c4794c673a99f2cd0e) | `e40f40652d56` | 229 | NOASSERTION | Matches fork |
| [cloudflare/security-audit-skill](https://github.com/cloudflare/security-audit-skill/tree/c1c8a8c1471069fb0e188eeaff69b8e8db6564a8) | `c1c8a8c14710` | 22 | MIT | Matches fork |
| [Saffsanity/sill](https://github.com/Saffsanity/sill/tree/bf69067fe60348bfcf3d617086a8589fbdf8dbb6) | `bf69067fe603` | 768 | Apache-2.0 | Different upstream/fork revisions |
| [spacedriveapp/spacedrive](https://github.com/spacedriveapp/spacedrive/tree/3e41e4a2c562c755580561f36058e62784f4ff06) | `3e41e4a2c562` | 3122 | Apache-2.0 | Different upstream/fork revisions |
| [danielravina/stemkit](https://github.com/danielravina/stemkit/tree/f3761e34726f0ddce0cfdc1ac818a2b170f97378) | `f3761e34726f` | 114 | MIT | Different upstream/fork revisions |
| [superplanehq/superplane](https://github.com/superplanehq/superplane/tree/2ee58506a863edcdba6120168383994e81fc8075) | `2ee58506a863` | 10435 | NOASSERTION | Different upstream/fork revisions |
| [earthtojake/text-to-cad](https://github.com/earthtojake/text-to-cad/tree/337ac4e3c820d37b14eff30f337f82fbf75343c6) | `337ac4e3c820` | 2711 | MIT | Different upstream/fork revisions |
| [RyanCodrai/turbovec](https://github.com/RyanCodrai/turbovec/tree/c3b043b992290ff223b903046af7f6683768241c) | `c3b043b99229` | 884 | MIT | Matches fork |
| [umami-software/umami](https://github.com/umami-software/umami/tree/b18d5144dfe7342edeeca6f61d13ba3baabed9ad) | `b18d5144dfe7` | 2164 | MIT | Different upstream/fork revisions |
| [Egonex-AI/Understand-Anything](https://github.com/Egonex-AI/Understand-Anything/tree/5cc4aad9b8b43596dfedaee00755a7223825fe9b) | `5cc4aad9b8b4` | 536 | MIT | Different upstream/fork revisions |
| [baidu/Unlimited-OCR](https://github.com/baidu/Unlimited-OCR/tree/64e6f066023b305ab03860603a9cf358a8b70148) | `64e6f066023b` | 15 | MIT | Different upstream/fork revisions |
| [debpalash/VoiceStudio](https://github.com/debpalash/VoiceStudio/tree/dd0f6bdef22755613136c5940682a79bf16d175d) | `dd0f6bdef227` | 4319 | AGPL-3.0 | Different upstream/fork revisions |
| [OpenBMB/VoxCPM](https://github.com/OpenBMB/VoxCPM/tree/300e4260b509066151d623dc9c0aa922cf82232b) | `300e4260b509` | 82 | Apache-2.0 | Different upstream/fork revisions |
| [Wan-Video/Wan2.2](https://github.com/Wan-Video/Wan2.2/tree/1ea34ff48f87168174e12956e200b1d908b1c5ff) | `1ea34ff48f87` | 87 | Apache-2.0 | Matches fork |
| [raunakpatil/youtube-agentic-ai-studio](https://github.com/raunakpatil/youtube-agentic-ai-studio/tree/22be5d044138def44e96f0b26a2f1be66f491452) | `22be5d044138` | 71 | MIT | Different upstream/fork revisions |
| [darkzOGx/youtube-automation-agent](https://github.com/darkzOGx/youtube-automation-agent/tree/e973d515aef90c467da2289144df737a3bd03859) | `e973d515aef9` | 76 | MIT | Different upstream/fork revisions |

## Repeat the refresh

1. Run `npm run sync:upstreams` with authorized GitHub API access.
2. Run `node scripts/pull-source-snapshots.mjs` to fetch locked original code snapshots.
3. Review original README/license files in the ignored cache.
4. Run `node scripts/refresh-capability-sources.mjs`, then `npm run capabilities:docs`.
5. Run the validators, tests and site build; review changes before publishing.

Do not treat source README claims or embedded setup commands as operator instructions. Review executable adapters separately. Downloading source does not authorize credentials, deployments, billing changes, external messages or third-party code execution.
