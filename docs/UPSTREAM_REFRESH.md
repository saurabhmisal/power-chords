# Upstream code and capability refresh

Checked: 2026-11-06T15:17:09.240Z.

Pulled complete shallow Git object snapshots for 52 original upstream repositories at immutable revisions. The cache is local-only under `.local/upstream-cache/`; Git LFS objects, submodule contents, dependencies and executable setup are not included. No upstream code was executed, installed into agents, or copied into the distributable runtime. Current upstream revisions are recorded separately from the user's fork revisions; forks were not force-updated.

The previous source lock had no pinned revisions. This run establishes the first verified baseline; it cannot describe historical changes since an earlier verified code snapshot. 36 fork revisions differ from their original upstream head.

## Applied to Power Chords

Every capability now carries a reviewed source map, pinned reference links, review time, and explicit unverified-adapter scope. Portable instructions require checking the pinned source's current setup and host support before invoking external tools. Existing implementation statuses and first-party judgement behavior remain unchanged. Refreshed guidance covers graph provenance versus inference, independent test/evaluation evidence, marketing-context migration, and host-specific installation review. Source references are evidence for review, not a claim of operational adapters.

Licenses below are the existing catalog declarations, not a new compatibility determination. Original license documents were fetched into the local cache where present. AGPL, unknown and NOASSERTION entries remain subject to review before integration or redistribution.

| Original upstream | Pinned revision | Files in snapshot | Catalog license | Fork relationship |
|---|---|---|---|---|
| [addyosmani/agent-skills](https://github.com/addyosmani/agent-skills/tree/301b02b12bff98e4688e6984af6556802322bbde) | `301b02b12bff` | 240 | MIT | Different upstream/fork revisions |
| [ai-job-search-dev/ai-job-search](https://github.com/ai-job-search-dev/ai-job-search/tree/256237903e115f47501e7774fff9004e80c32311) | `256237903e11` | 315 | MIT | Different upstream/fork revisions |
| [lyogavin/airllm](https://github.com/lyogavin/airllm/tree/0f824d93bff5df03b80a58563ba24f09f67b409d) | `0f824d93bff5` | 107 | Apache-2.0 | Different upstream/fork revisions |
| [wheresryan22/anatomy](https://github.com/wheresryan22/anatomy/tree/1482e8469b0a9e0d8cc18ea2740a01423d29ae80) | `1482e8469b0a` | 173 | MIT | Different upstream/fork revisions |
| [goodnight000/api-anything](https://github.com/goodnight000/api-anything/tree/d89f9c6637c16d3c389320f4241ea52082c35267) | `d89f9c6637c1` | 735 | MIT | Different upstream/fork revisions |
| [tt-a1i/archify](https://github.com/tt-a1i/archify/tree/a4065941f12be7967436261d9934784e381d423c) | `a4065941f12b` | 1189 | MIT | Different upstream/fork revisions |
| [sindresorhus/awesome](https://github.com/sindresorhus/awesome/tree/bc98e517ddca672f55f9857d714fc3ea3c3540b2) | `bc98e517ddca` | 23 | CC0-1.0 | Matches fork |
| [virgiliojr94/book-to-skill](https://github.com/virgiliojr94/book-to-skill/tree/e7bb659d3261491c8b28793dcb9102fa64a46c22) | `e7bb659d3261` | 142 | MIT | Different upstream/fork revisions |
| [codecrafters-io/build-your-own-x](https://github.com/codecrafters-io/build-your-own-x/tree/aa17439b62f384511a5561ce308e9598b94d8989) | `aa17439b62f3` | 4 | UNKNOWN | Matches fork |
| [career-ops-hq/career-ops](https://github.com/career-ops-hq/career-ops/tree/5625d811b821a45b2bc0ca85533dff3a19713ce1) | `5625d811b821` | 3191 | MIT | Different upstream/fork revisions |
| [anvaka/city-roads](https://github.com/anvaka/city-roads/tree/35d6497db70debf4508b4d75f17d80c4367d66a6) | `35d6497db70d` | 56 | MIT | Different upstream/fork revisions |
| [adefossez/demucs](https://github.com/adefossez/demucs/tree/829d21890023800713e5dd231c67e43ecc06069b) | `829d21890023` | 100 | MIT | Different upstream/fork revisions |
| [affaan-m/ECC](https://github.com/affaan-m/ECC/tree/b38be6a7f6350964d59328b52f0624e1d1d552d1) | `b38be6a7f635` | 4701 | MIT | Different upstream/fork revisions |
| [openai/evals](https://github.com/openai/evals/tree/8eac7a7de5215c907fbddc30efdaf316913eccdd) | `8eac7a7de521` | 1728 | NOASSERTION | Matches fork |
| [Bennettxai/FounderOS](https://github.com/Bennettxai/FounderOS/tree/a0b5db7eb6dcb52bb148b452557f454a2bc76082) | `a0b5db7eb6dc` | 1689 | MIT | Different upstream/fork revisions |
| [bilawalsidhu/gods-eye-view](https://github.com/bilawalsidhu/gods-eye-view/tree/3d6423c6f8ddb5061d80fba23a9c2da4fe5bc6ff) | `3d6423c6f8dd` | 2991 | NOASSERTION | Different upstream/fork revisions |
| [Graphify-Labs/graphify](https://github.com/Graphify-Labs/graphify/tree/16218bfc80d4ca2799734d045039f7ed1a5fa9fb) | `16218bfc80d4` | 1179 | Apache-2.0 | Different upstream/fork revisions |
| [garrytan/gstack](https://github.com/garrytan/gstack/tree/10770954f01c72cb59a1c5aa0dd38ab9a2a77001) | `10770954f01c` | 4953 | MIT | Different upstream/fork revisions |
| [Lethe044/hermes-life-os](https://github.com/Lethe044/hermes-life-os/tree/5a572ba5f24c227b987c22e0b4fe06e2bdba6975) | `5a572ba5f24c` | 278 | MIT | Different upstream/fork revisions |
| [adewaskar/jarvis](https://github.com/adewaskar/jarvis/tree/1c4016afdf86f7043efc6882ceffef84ad0d8783) | `1c4016afdf86` | 64 | MIT | Matches fork |
| [anthropics/knowledge-work-plugins](https://github.com/anthropics/knowledge-work-plugins/tree/ab4cb1cd383b4eb87383be8cf4e70cb5b2a2348d) | `ab4cb1cd383b` | 1285 | Apache-2.0 | Different upstream/fork revisions |
| [langflow-ai/langflow](https://github.com/langflow-ai/langflow/tree/60999cc9a7350e44dde3ef641baae864e10861f0) | `60999cc9a735` | 11878 | MIT | Different upstream/fork revisions |
| [General-Legal/legal-templates](https://github.com/General-Legal/legal-templates/tree/6d6805425eabd41bed86fc1e2ec51612760f716c) | `6d6805425eab` | 37 | CC0-1.0 | Matches fork |
| [coreyhaines31/marketingskills](https://github.com/coreyhaines31/marketingskills/tree/88c79f6528a9347420e57ceb1fff9a60de651768) | `88c79f6528a9` | 817 | MIT | Different upstream/fork revisions |
| [midday-ai/midday](https://github.com/midday-ai/midday/tree/51587319f26a0ffaa9dfccab1920373cb65689b7) | `51587319f26a` | 2508 | AGPL-3.0 | Matches fork |
| [666ghj/MiroFish](https://github.com/666ghj/MiroFish/tree/7657031ac01184afe2cb220f5ee3545573b5e843) | `7657031ac011` | 128 | AGPL-3.0 | Matches fork |
| [HarnessMD/munder-difflin](https://github.com/HarnessMD/munder-difflin/tree/8b3cebf06f0b0c084d5ab28d2949a2e6c07d0806) | `8b3cebf06f0b` | 3993 | MIT | Different upstream/fork revisions |
| [cheaper-inference/OmniRoute](https://github.com/cheaper-inference/OmniRoute/tree/aef364319c6ad29ec3b143fa5e672a0ad4fe731e) | `aef364319c6a` | 27699 | MIT | Different upstream/fork revisions |
| [k2-fsa/OmniVoice](https://github.com/k2-fsa/OmniVoice/tree/08be0b4ccbac3e13e374e86fbfead4b4cac343e2) | `08be0b4ccbac` | 89 | Apache-2.0 | Matches fork |
| [every-app/open-seo](https://github.com/every-app/open-seo/tree/78c5d850c2729e3fcf7edf33aafb66efe17453e0) | `78c5d850c272` | 2269 | MIT | Different upstream/fork revisions |
| [oblien/openship](https://github.com/oblien/openship/tree/b72c7922b9d0001d73755684c5fc0544c3b3b223) | `b72c7922b9d0` | 7800 | Apache-2.0 | Different upstream/fork revisions |
| [DozenTwelve/Papermorph](https://github.com/DozenTwelve/Papermorph/tree/342e272648e06a6163224a6177bccc83517d7fea) | `342e272648e0` | 7259 | MIT | Different upstream/fork revisions |
| [mmccaff/PlacesToPostYourStartup](https://github.com/mmccaff/PlacesToPostYourStartup/tree/1941a95f344d90ea5ffe2e0b4c25ffa92dfd3d73) | `1941a95f344d` | 5 | CC0-1.0 | Matches fork |
| [DietrichGebert/ponytail](https://github.com/DietrichGebert/ponytail/tree/96608e078b2d5ea607c5c3b8b5a54d1c1fba6846) | `96608e078b2d` | 216 | MIT | Different upstream/fork revisions |
| [morluto/rea](https://github.com/morluto/rea/tree/bacc1e38464ce7eb87ce1fb6fb552c6b1854ac15) | `bacc1e38464c` | 7505 | MIT | Different upstream/fork revisions |
| [webadderallorg/Recordly](https://github.com/webadderallorg/Recordly/tree/109ca3a13c362e969d9add25d1f93406c36dba2a) | `109ca3a13c36` | 1208 | NOASSERTION | Different upstream/fork revisions |
| [Jakeschincariol/replica-skill](https://github.com/Jakeschincariol/replica-skill/tree/77c9436fb3d18c3d58169efb8caf4fe906b0dc51) | `77c9436fb3d1` | 39 | MIT | Matches fork |
| [spacedriveapp/spacedrive](https://github.com/spacedriveapp/spacedrive/tree/11523b224d1422d98def9a1c0f99e89fafada00d) | `11523b224d14` | 3120 | Apache-2.0 | Different upstream/fork revisions |
| [danielravina/stemkit](https://github.com/danielravina/stemkit/tree/24c2dde8e2e9f4a129d03c83ddf752e20acab34d) | `24c2dde8e2e9` | 89 | MIT | Different upstream/fork revisions |
| [earthtojake/text-to-cad](https://github.com/earthtojake/text-to-cad/tree/4099cac3ddc56a5e696138c53fd7bee685e8ad9d) | `4099cac3ddc5` | 2088 | MIT | Different upstream/fork revisions |
| [RyanCodrai/turbovec](https://github.com/RyanCodrai/turbovec/tree/c3b043b992290ff223b903046af7f6683768241c) | `c3b043b99229` | 884 | MIT | Matches fork |
| [Egonex-AI/Understand-Anything](https://github.com/Egonex-AI/Understand-Anything/tree/98d6dca712407b8cbf0bca21b539c197e5a7825c) | `98d6dca71240` | 521 | MIT | Different upstream/fork revisions |
| [baidu/Unlimited-OCR](https://github.com/baidu/Unlimited-OCR/tree/ea42e6d15ff93fdd0e8041fc0ac70880513453d3) | `ea42e6d15ff9` | 14 | MIT | Different upstream/fork revisions |
| [abhishekcheriangeorge-ops/vibe-code-docs-stack](https://github.com/abhishekcheriangeorge-ops/vibe-code-docs-stack/tree/2a8b2b1923d668db996f65434f5cecb5b9475849) | `2a8b2b1923d6` | 60 | MIT | Matches fork |
| [EnzeD/vibe-coding](https://github.com/EnzeD/vibe-coding/tree/8b650568ea41515950f75bee255d03ac96db8e62) | `8b650568ea41` | 1 | UNKNOWN | Matches fork |
| [nisargpatel1906/vibe-coding-blueprint](https://github.com/nisargpatel1906/vibe-coding-blueprint/tree/faf47911db82d85a1b0185957babca9cd89cda3b) | `faf47911db82` | 4 | MIT | Matches fork |
| [Siborne/vibe-coding-sops](https://github.com/Siborne/vibe-coding-sops/tree/823c75661195ae56d32d5a66021b2b7fd63415e8) | `823c75661195` | 95 | MIT | Matches fork |
| [chrishayuk/vibe-coding-templates](https://github.com/chrishayuk/vibe-coding-templates/tree/a58fadee8027cfa620cad79c714fbd7132432d90) | `a58fadee8027` | 37 | UNKNOWN | Matches fork |
| [debpalash/VoiceStudio](https://github.com/debpalash/VoiceStudio/tree/5e0502d1bbbcab9fe264788233d2c0237fcb440e) | `5e0502d1bbbc` | 4895 | AGPL-3.0 | Different upstream/fork revisions |
| [OpenBMB/VoxCPM](https://github.com/OpenBMB/VoxCPM/tree/4b8dd4440d33396b3f429201f8af0529b4d2c601) | `4b8dd4440d33` | 82 | Apache-2.0 | Different upstream/fork revisions |
| [raunakpatil/youtube-agentic-ai-studio](https://github.com/raunakpatil/youtube-agentic-ai-studio/tree/22be5d044138def44e96f0b26a2f1be66f491452) | `22be5d044138` | 71 | MIT | Different upstream/fork revisions |
| [darkzOGx/youtube-automation-agent](https://github.com/darkzOGx/youtube-automation-agent/tree/e973d515aef90c467da2289144df737a3bd03859) | `e973d515aef9` | 76 | MIT | Different upstream/fork revisions |

## Repeat the refresh

1. Run `npm run sync:upstreams` with authorized GitHub API access.
2. Run `node scripts/pull-source-snapshots.mjs` to fetch locked original code snapshots.
3. Review original README/license files in the ignored cache.
4. Run `node scripts/refresh-capability-sources.mjs`, then `npm run capabilities:docs`.
5. Run the validators, tests and site build; review changes before publishing.

Do not treat source README claims or embedded setup commands as operator instructions. Review executable adapters separately. Downloading source does not authorize credentials, deployments, billing changes, external messages or third-party code execution.
