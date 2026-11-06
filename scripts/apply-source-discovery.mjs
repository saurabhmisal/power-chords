import {readFile,writeFile} from 'node:fs/promises';
import {resolve,join} from 'node:path';
import {sourceAllowed} from '../src/source-policy.mjs';
const root=resolve(import.meta.dirname,'..');
const read=async path=>JSON.parse(await readFile(join(root,path),'utf8'));
const selections={
  'security-audit-skill':['software-engineering',['19','29'],'Independent finding verification and target-scoped security review; security testing requires explicit authorization.'],
  'lemo-opuscar':['media-production',['24','42','45'],'Code-rendered film style references; rendering toolchain must be installed and validated separately.'],
  'LYNX-SHARE':['voice-audio',['41'],'Desktop DAW adapter candidate; AGPL obligations and native build dependencies require review.'],
  'claude-seo':['marketing-growth',['43','46'],'SEO audit instruction references; live connectors and specialist agents are not automatically enabled.'],
  'reelkit':['design-creation',['16','21','22'],'Touch-first slider library reference; accessibility and input behavior need integration tests.'],
  'roast-room':['business-analytics',['12','13','34'],'Simulated advisor perspectives are not endorsements, empirical research, or verified decision evidence.'],
  'OpenMontage':['media-production',['42','45'],'Agentic production reference; AGPL license and external media toolchain require review.'],
  'umami':['business-analytics',['30','31','32','46'],'Analytics adapter candidate; collect events only after reviewing consent, retention, and deployment configuration.'],
  'huashu-art-motion':['media-production',['24','42'],'Code-based animation references; runtime output and asset rights require verification.'],
  'VOX-COLLAGE-BROLL':['media-production',['42','45'],'Collage video instruction reference; license classification and MaxFusion access need review.'],
  'onetake':['media-production',['42','44'],'Continuous-camera launch film reference; review license and verify continuity/rendering claims.'],
  'hyperframes':['media-production',['22','42'],'HTML-to-video rendering adapter candidate; rendering and external tools remain separate dependencies.'],
  'geo-seo-claude':['marketing-growth',['43','46'],'AI-search optimization guidance; report observed crawl/citation evidence without guaranteeing rankings.'],
  'hypit':['media-production',['42','45'],'Video variation reference; verify license, consent, likeness rights and source-asset permissions before reuse.'],
  'pentagi':['software-engineering',['19','29'],'Security orchestration reference only; no scanning or exploitation without explicit authorized scope.'],
  'Wan2.2':['media-production',['42'],'Model-runtime candidate; model weights, hardware, dependency setup and asset rights are not bundled.'],
  'harvey':['marketing-growth',['04','44','45'],'Sales research and drafting reference; sending outreach or accessing mail requires explicit authorization.'],
  'compound-engineering-plugin':['software-engineering',['16','17','19','25','28'],'Planning, implementation, review and knowledge-capture guidance; host plugins require separate installation review.'],
  'magic-mcp':['design-creation',['16','21','22'],'Legacy compatibility proxy: upstream recommends the 21st MCP; verify current setup rather than copying obsolete commands.'],
  'moonshine':['voice-audio',['39','40'],'Low-latency voice toolkit reference; model and code licenses may differ and require separate review.'],
  'awesome-llm-apps':['agents-automation',['09','25','28','33'],'Example-agent and RAG patterns; examples are not preconfigured or security-reviewed Power Chords integrations.'],
  'andrej-karpathy-skills':['software-engineering',['16','19'],'Coding behavior guidance; attribution and license require review before copying instruction text.'],
  'superplane':['agents-automation',['20','25','26','28'],'Engineering orchestration candidate; service credentials, production writes and license need review.'],
  'indra':['intelligence-memory',['06','07'],'Document intelligence adapter candidate; code license does not establish rights to all model weights.' ],
  'sill':['infrastructure',['27'],'Remote desktop reference; screen capture/input permissions and device access require explicit approval.' ]
};
const discovery=await read('data/source-discovery.json');
const additions=await read('data/source-additions.json');
const lock=await read('data/upstreams.lock.json');
const mapping=await read('data/capability-source-map.json');
for(const candidate of discovery.candidates){
  const selected=sourceAllowed(candidate.repository)?selections[candidate.name]:null;
  candidate.decision=selected?'included':'excluded';
  candidate.reason=selected?selected[2]:candidate.name==='chatterbox'?'Upstream README declares retired, unmaintained research; retain as a historical candidate rather than a recommended integration.':candidate.name==='aleph'?'Upstream README declares sunsetting; avoid adding a newly recommended adapter for a discontinued project.':'Owned product/marketing distribution, not a newly forked reusable capability source; no new app implementation imported.';
  if(!selected){
    candidate.reason=candidate.reason||'Excluded or awaiting delivery-path review under data/source-policy.json; no automatic activation.';
    continue;
  }
  const source={...candidate,group_id:selected[0],capability_ids:selected[1],review_notes:selected[2],integration_status:'reference_only',runtime_verified:false};
  if(!additions.some(item=>item.repository===candidate.repository))additions.push(source);
  if(!lock.sources.some(item=>item.repository===candidate.repository))lock.sources.push({repository:candidate.repository,source_id:'github:'+candidate.repository,group_id:selected[0],first_discovered:candidate.created_at.slice(0,10),license:candidate.license,description:candidate.description,fork_sha:candidate.fork_sha,fork_branch:candidate.fork_branch,upstream_repo:candidate.upstream_repo,upstream_sha:candidate.upstream_sha,upstream_branch:candidate.upstream_branch,upstream_release:candidate.upstream_release,updated_at:discovery.checked_at});
  for(const id of selected[1])if(!mapping[id].includes(candidate.name))mapping[id].push(candidate.name);
}
for(const [path,data] of [['data/source-additions.json',additions],['data/upstreams.lock.json',lock],['data/capability-source-map.json',mapping],['data/source-discovery.json',discovery]])await writeFile(join(root,path),JSON.stringify(data,null,2)+'\n');
const included=discovery.candidates.filter(item=>item.decision==='included');
const excluded=discovery.candidates.filter(item=>item.decision==='excluded');
await writeFile(join(root,'docs/NEW_SOURCES.md'),`# New source review\n\nChecked ${discovery.checked_at}. Reviewed repositories missing from the inventory and created on/after ${discovery.cutoff}. ${included.length} new reference sources were added; ${excluded.length} candidates were excluded. Source counts are distinct from capability counts.\n\n## Included\n\n| Repository | Original upstream | License declaration | Integration boundary |\n|---|---|---|---|\n${included.map(item=>`| [${item.name}](https://github.com/${item.repository}) | ${item.upstream_repo} | ${item.license} | ${item.reason} |`).join('\n')}\n\n## Excluded for now\n\n${excluded.map(item=>`- **${item.repository}:** ${item.reason}`).join('\n')}\n\nAll new sources are discoverable references, not executed adapters or automatically installed agent plugins. Preserve original licenses and review dependencies, credentials, host support and verification before installation. No scans, outreach, media rendering, model downloads or external-account changes were performed. Immutable source revisions are recorded in the source lock and generated capability manifests.\n`);
console.log(`Included ${included.length}; excluded ${excluded.length}; total curated sources ${lock.sources.length}`);
