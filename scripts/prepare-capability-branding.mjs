import {readFile,writeFile} from 'node:fs/promises';
import {resolve,join} from 'node:path';
const root=resolve(import.meta.dirname,'..');
const read=async name=>JSON.parse(await readFile(join(root,name),'utf8'));
const write=async(name,data)=>writeFile(join(root,name),JSON.stringify(data,null,2)+'\n');
const branding=await read('data/capability-branding.json');
const data=await read('data/capability-guides.json');
const exclusions={
 'andrej-karpathy-skills':'Coding-behavior advice in a single CLAUDE.md; no implemented input-to-output tool or complete executable workflow.',
 'vibe-coding':'README-only development guide; no executable delivery path.',
 'vibe-coding-sops':'Rules and SOP collection; the statistics script does not implement the advertised development workflow.',
 'vibe-coding-templates':'Agent instruction templates, not an implemented application or complete execution workflow.',
 'vibe-coding-blueprint':'Planning framework and packaged instructions; no implemented build-to-output pipeline.',
 'vibe-code-docs-stack':'Documentation scaffolding and packaging/check scripts; no standalone capability execution path.',
 'awesome':'Directory of external resources; repository linting is not a user capability.',
 'build-your-own-x':'Index of external tutorials; no integrated implementation to deliver a capability.',
 'PlacesToPostYourStartup':'Startup directory list; no implemented launch or publishing workflow.',
 'legal-templates':'Document templates and conversion utilities; no implemented billing or invoice-state workflow for the capability it was mapped to.',
 'VOX-COLLAGE-BROLL':'Instruction-only video recipe; requires a separately obtained MaxFusion integration or user-written replacement scripts.',
 'magic-mcp':'Legacy compatibility proxy replaced by a separately hosted 21st MCP; not a self-contained capability implementation in this repository.',
 'awesome-llm-apps':'Collection of separate examples and templates rather than one integrated maintained delivery path; individual apps can be reviewed as separate candidates.'
};
const lock=await read('data/upstreams.lock.json');
const review=await read('data/source-review.json');
const mapping=await read('data/capability-source-map.json');
const previousPolicy=await read('data/source-policy.json').catch(()=>null);
const records=previousPolicy?.sources||lock.sources.map(s=>({repository:s.repository,original_repository:s.upstream_repo,revision:s.upstream_sha,decision:exclusions[s.repository.split('/')[1]]?'excluded':'included',reason:exclusions[s.repository.split('/')[1]]||'Reviewed source tree and README document an input-to-output application, library/CLI or complete host-agent workflow. Retained as an attributed design reference; a Power Chords execution adapter is not verified.',runtime_verified:false}));
await write('data/source-policy.json',{schema_version:1,reviewed_at:'2026-11-06',publication_status:'draft_awaiting_user_approval',criteria:['A documented input, executable or complete host-agent procedure, and a concrete output.','Advice-only repositories, link lists, templates without delivery, isolated example collections and obsolete proxies are excluded.','A documented source workflow is not proof of an installed or tested Power Chords adapter.','New sources require an explicit included decision before discovery can activate them.'],sources:records});
const allowed=new Set(records.filter(s=>s.decision==='included').map(s=>s.repository));
await write('data/upstreams.lock.json',{...lock,sources:lock.sources.filter(s=>allowed.has(s.repository))});
await write('data/source-review.json',{...review,sources:review.sources.filter(s=>allowed.has(s.repository))});
await write('data/source-additions.json',(await read('data/source-additions.json')).filter(s=>allowed.has(s.repository)));
for(const names of Object.values(mapping))for(let i=names.length-1;i>=0;i--)if(exclusions[names[i]])names.splice(i,1);
await write('data/capability-source-map.json',mapping);
const discovery=await read('data/source-discovery.json');
for(const candidate of discovery.candidates)if(exclusions[candidate.name]){candidate.decision='excluded';candidate.reason=exclusions[candidate.name];}
await write('data/source-discovery.json',discovery);
for(const c of data.capabilities){
 const brand=branding.capabilities.find(b=>b.id===c.id);if(!brand)throw Error('Missing brand '+c.id);
 c.function_name??=c.name;c.core_name=brand.core;c.brand_word=brand.word;c.name=brand.core+' '+brand.word;c.publisher='Power Chords';
 c.upstream_sources=c.upstream_sources.filter(s=>allowed.has(s.fork_repository));
 c.source_guidance=c.source_guidance.filter(s=>!Object.keys(exclusions).some(name=>s.startsWith(name+':'))).map(s=>s.replaceAll('pinned upstream documentation','reviewed technical documentation'));
}
await write('data/capability-guides.json',data);
await writeFile(join(root,'docs/CAPABILITY_NAMES.md'),`# Power Chords capability names — approval draft\n\nCore function plus one distinctive word. Names are chosen once and kept stable; IDs, existing install slugs and downloads remain compatible. These are editorial naming proposals, not trademark-clearance claims.\n\n| Previous function | Proposed Power Chords name | Existing install slug |\n|---|---|---|\n${data.capabilities.map(c=>`| ${c.function_name} | **${c.name}** | \`${c.slug}\` |`).join('\n')}\n`);
await writeFile(join(root,'docs/SOURCE_DELIVERY_REVIEW.md'),`# Source delivery review — approval draft\n\nReviewed cached original README and source trees at the revisions retained in data/source-policy.json. This is a static delivery-path review, not execution testing. No third-party setup or runtime was executed. Removed means excluded from the active Power Chords inventory and capability mappings, not deleted from the GitHub account or erased from historical notices.\n\n## Proposed removals\n\n| Repository | Reason |\n|---|---|\n${records.filter(s=>s.decision==='excluded').map(s=>`| ${s.repository} | ${s.reason} |`).join('\n')}\n\n## Retained source references\n\n${allowed.size} repositories have a documented app, library/CLI, or complete agent-hosted procedure. They remain design references, not installed or verified Power Chords integrations. Host-specific connectors, permissions, models and runtime dependencies must still be reviewed and tested. All capability pages retain their true implementation status.\n\nNo third-party ownership or license notices are removed. Revision records remain in technical provenance files; the customer-facing site presents Power Chords capabilities instead of repository cards. Future discoveries cannot activate an excluded or unreviewed source automatically.\n`);
console.log(`Draft: ${data.capabilities.length} names; ${records.filter(s=>s.decision==='excluded').length} source exclusions; ${allowed.size} retained references. No publication performed.`);
