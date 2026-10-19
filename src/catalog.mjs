/**
 * Power Chords external integration source inventory verified 17 Oct 2026.
 * Classification is advisory until source inspection. Every repo is discovered, NOT installed.
 */
const raw = [
  // name | fork creation date | capability group | license | summary
  ['agent-skills','2026-10-08','software-engineering','MIT','Engineering skills for coding agents'],
  ['gstack','2026-10-08','software-engineering','MIT','Engineering, design, product and QA workflows'],
  ['ECC','2026-10-08','agents-automation','MIT','Agent harness optimization and workflows'],
  ['marketingskills','2026-10-12','marketing-growth','MIT','CRO, copywriting, SEO and growth skills'],
  ['knowledge-work-plugins','2026-10-10','business-analytics','Apache-2.0','Knowledge worker plugins and workflows'],
  ['replica-skill','2026-10-10','software-engineering','MIT','App reverse engineering and recreation skills'],
  ['archify','2026-09-26','design-creation','MIT','System architecture and workflow diagram skill'],
  ['anatomy','2026-10-12','design-creation','MIT','Interactive technical illustrations'],
  ['Papermorph','2026-10-06','design-creation','MIT','Turn books into interactive narrated experiences'],
  ['ponytail','2026-10-08','software-engineering','MIT','Code simplification agent skill'],
  ['vibe-coding-sops','2026-10-10','software-engineering','MIT','Development operating procedures'],
  ['vibe-coding','2026-10-10','software-engineering','UNKNOWN','Vibe coding guidance'],
  ['vibe-coding-templates','2026-10-10','software-engineering','UNKNOWN','AI-assisted coding templates'],
  ['vibe-coding-blueprint','2026-10-10','software-engineering','MIT','Project planning and build blueprint skill'],
  ['vibe-code-docs-stack','2026-10-10','software-engineering','MIT','Development documentation and architecture decisions'],
  ['book-to-skill','2026-10-15','research-discovery','MIT','Turn books into skills'],
  ['text-to-cad','2026-10-12','design-creation','MIT','Text-driven CAD tooling'],
  ['jarvis','2026-10-08','agents-automation','MIT','Personal assistant workflows'],
  ['hermes-life-os','2026-10-10','intelligence-memory','MIT','Personal operating system memory and routines'],
  ['ai-job-search','2026-10-08','career-professional','MIT','AI-powered local job application framework'],
  ['career-ops','2026-10-08','career-professional','MIT','Job scoring and application preparation'],
  ['graphify','2026-10-08','intelligence-memory','Apache-2.0','Codebase graph and knowledge retrieval skill'],
  ['api-anything','2026-10-08','agents-automation','MIT','Agent-oriented website API automation'],
  ['youtube-automation-agent','2026-10-10','media-production','MIT','YouTube channel automation'],
  ['youtube-agentic-ai-studio','2026-10-10','media-production','MIT','AI video production pipeline'],
  ['stemkit','2026-10-12','voice-audio','MIT','Music stem separation tool'],
  ['OmniRoute','2026-09-26','infrastructure','MIT','Unified model gateway and routing'],
  ['langflow','2026-10-09','agents-automation','MIT','Visual agent and workflow development'],
  ['airllm','2026-10-10','infrastructure','Apache-2.0','Memory-efficient LLM inference'],
  ['turbovec','2026-10-12','infrastructure','MIT','Vector search indexing'],
  ['OmniVoice','2026-10-12','voice-audio','Apache-2.0','Multilingual text-to-speech and voice cloning'],
  ['VoxCPM','2026-10-12','voice-audio','Apache-2.0','Multilingual speech generation'],
  ['VoiceStudio','2026-10-07','voice-audio','AGPL-3.0','Local speech design, transcription and dubbing'],
  ['demucs','2026-10-14','voice-audio','MIT','Audio source separation'],
  ['evals','2026-10-12','infrastructure','NOASSERTION','Evaluation framework and benchmarks'],
  ['Unlimited-OCR','2026-10-12','research-discovery','MIT','Document and OCR extraction'],
  ['MiroFish','2026-10-06','agents-automation','AGPL-3.0','Swarm intelligence simulation'],
  ['munder-difflin','2026-10-06','agents-automation','MIT','Local multi-agent orchestration'],
  ['FounderOS-DEMO','2026-10-08','business-analytics','MIT','Founder command center'],
  ['Understand-Anything','2026-10-16','intelligence-memory','MIT','Interactive code knowledge graph'],
  ['open-seo','2026-10-12','marketing-growth','MIT','SEO intelligence and analytics'],
  ['Recordly','2026-10-08','media-production','NOASSERTION','Product demonstration recording'],
  ['spacedrive','2026-10-15','infrastructure','Apache-2.0','Distributed file explorer'],
  ['openship','2026-10-08','infrastructure','Apache-2.0','Self-hosted deployment platform'],
  ['midday','2026-10-08','business-analytics','AGPL-3.0','Financial operations and invoicing'],
  ['city-roads','2026-10-08','spatial-intelligence','MIT','City road network visualization'],
  ['gods-eye-view','2026-10-12','spatial-intelligence','NOASSERTION','Spatial intelligence 3D globe'],
  ['rea','2026-10-08','software-engineering','MIT','Reverse engineer software with agents'],
  ['legal-templates','2026-10-12','research-discovery','CC0-1.0','Legal document templates'],
  ['PlacesToPostYourStartup','2026-10-12','marketing-growth','CC0-1.0','Startup launch directories'],
  ['awesome','2026-10-08','research-discovery','CC0-1.0','Curated developer knowledge lists'],
  ['build-your-own-x','2026-10-08','software-engineering','UNKNOWN','Programming tutorials and learning resources']
];
export const GROUPS = [
 ['intelligence-memory','Intelligence & Memory'],
 ['agents-automation','Agentic Intelligence'],
 ['software-engineering','Software Engineering'],
 ['design-creation','Design & Creativity'],
 ['voice-audio','Voice & Audio'],
 ['media-production','Media Production'],
 ['research-discovery','Research & Discovery'],
 ['business-analytics','Business & Analytics'],
 ['marketing-growth','Marketing & Growth'],
 ['career-professional','Career & Professional'],
 ['spatial-intelligence','Spatial Intelligence'],
 ['infrastructure','System & Infrastructure'],
 ['unclassified','Unclassified Imports']
].map(([id,label])=>({id,label}));

export const FORKS = raw.map(([name,created_at,group_id,license,description], index)=>({
  id: `github:saurabhmisal/${name}`,
  name, created_at, group_id, license, description,
  url: `https://github.com/saurabhmisal/${name}`,
  repository: `saurabhmisal/${name}`,
  discovery_index: index + 1,
  origin: 'connected-github-metadata',
  kind: 'unverified',
  status: 'discovered'
}));
if (FORKS.length !== 52 || new Set(FORKS.map(x=>x.id)).size !== FORKS.length) {
  throw new Error('Fork inventory integrity failure');
}
