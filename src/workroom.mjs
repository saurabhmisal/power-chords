/**
 * Power Chords Workroom — first-party, deterministic composition engine.
 * Creates usable evidence-grounded PM deliverables without model or network access.
 * Nothing in this module executes upstream code or invokes external accounts.
 */
import {mkdir,writeFile,readFile} from 'node:fs/promises';
import {resolve,join} from 'node:path';
import {randomUUID,createHash} from 'node:crypto';

const capNames = [
 'Customer problem discovery','Market landscape analysis','Competitive product teardown','Account and stakeholder intelligence','Evidence triangulation and opportunity mapping',
 'Multi-format document ingestion','OCR and structured extraction','Knowledge graph construction','Semantic and context-aware retrieval',
 'PRD and specification writing','End-to-end journey and workflow mapping','Outcome-oriented roadmapping','Opportunity sizing and prioritization','Hypothesis and experiment design',
 'API design and integration planning','Rapid application prototyping','Codebase navigation and explanation','System architecture and data-flow mapping','Debugging, testing and QA','Deployment and release readiness',
 'Wireframing and UX exploration','Interactive prototype construction','Architecture and sequence diagrams','Technical illustrations and CAD assets',
 'Multi-agent task decomposition','Task and routine orchestration','Browser and API task automation','Composable tool and workflow chains','Permission-scoped execution and controls',
 'SQL and structured-data analysis','Dashboards and visual reporting','Funnel, retention and operational diagnostics','LLM and agent evaluation','Forecasting and scenario modeling',
 'Billing and invoicing workflows','Unit economics and financial modeling','Operational command-center design','Time and resource planning',
 'Speech transcription and meeting notes','Text-to-speech and voice interfaces','Audio separation and editing','Video demos and educational content',
 'SEO and discoverability research','Launch and channel planning','Campaigns and content production','Conversion and growth experimentation',
 'Career and opportunity research','Interview preparation and learning plans',
 'Location and map-based research','Road and network visualization','Geospatial data visualization','Location-driven field insights'];
if(capNames.length!==52)throw new Error(`Expected 52 capabilities, received ${capNames.length}`);
const familyRanges=[
 ['Research & Discovery',1,5],['Document Intelligence',6,9],['Product & Strategy',10,14],
 ['Engineering & Integration',15,20],['Design & Creation',21,24],['Agentic Automation',25,29],
 ['Data & Evaluation',30,34],['Business & Operations',35,38],['Voice & Media',39,42],
 ['Marketing & Go-to-Market',43,46],['Professional Enablement',47,48],['Spatial & Field Intelligence',49,52]
];
// Honest maturity: native support means a local document/analysis operator exists, not
// that an external model, production API, browser, deployment or GPU runtime exists.
const supportedIds=new Set([1,4,5,10,11,12,13,14,15,18,19,20,25,26,28,29,32,34,36,37,38,44,46]);
export const CAPABILITIES=capNames.map((name,index)=>{
  const number=index+1;const family=familyRanges.find(([,a,b])=>number>=a&&number<=b)?.[0];
  return {id:String(number).padStart(2,'0'),number,name,family,
    status:supportedIds.has(number)?'native_assistive':'adapter_required',
    detail:supportedIds.has(number)?'Evidence-grounded planning, drafting or analysis support; not a fully autonomous implementation.':'An adapter or specialized runtime is needed for execution.'};
});

export const WORKFLOWS=[
 {id:'discovery-to-prd',title:'Customer Discovery → PRD',description:'Turn customer evidence into a problem statement, journey, prioritized requirements, experiment plan and risks.',capabilities:['01','04','05','10','11','13','14'],stages:['Evidence inventory','Problem framing','Journey & requirements','Experiment design','Review gates']},
 {id:'integration-readiness',title:'Integration Readiness',description:'Draft an integration decision pack, interface questions, quality plan, dependencies and go/no-go gates.',capabilities:['15','18','19','20','26','29'],stages:['Context & boundaries','Integration contract','Failure modes','Test plan','Release gates']},
 {id:'product-decision',title:'Product Decision Brief',description:'Structure options, evidence, measurable outcomes, risks and a decision memo.',capabilities:['05','12','13','32','34','36'],stages:['Problem & evidence','Alternatives','Decision criteria','Measurement','Decision record']},
 {id:'launch-readiness',title:'Launch Readiness Plan',description:'Prepare launch messaging, milestones, owners, rollout, monitoring, and contingency steps.',capabilities:['20','25','26','29','38','44','46'],stages:['Launch framing','Workstreams','Quality gates','Go-to-market','Monitoring']}
];
const ok = (s,max=20000)=>typeof s==='string'&&s.trim().length>0&&s.length<=max;
const clean=s=>s.replace(/[\u0000-\u0008\u000b\u000c\u000e-\u001f]/g,' ').trim();
const inline=s=>clean(String(s||'')).replace(/\r?\n/g,' ').replace(/[|]/g,'\\|');
const markdown=s=>clean(String(s||'')).replace(/^#{1,6}\s/gm,'\\$&');
const sentences=s=>(s.match(/[^.!?\n]+(?:[.!?]+|$)/g)||[]).map(x=>clean(x)).filter(x=>x.length>9).slice(0,70);
const lines=s=>s.split(/\r?\n/).map(clean).filter(x=>x.length>8).slice(0,70);
const tag=(entry)=>/\b(maybe|possibly|perhaps|might|estimate|assume|assuming|roughly|approximately|could)\b/i.test(entry)?'Unverified / conditional':'User-provided evidence';
function evidenceIndex(input){const items=[...new Set([...lines(input),...sentences(input)].filter(x=>x.length>15))].slice(0,32);return items.map((text,i)=>({id:`E${String(i+1).padStart(2,'0')}`,text,classification:tag(text)}));}
const evidenceTable=ev=>`| Reference | Evidence supplied | Classification |\n|---|---|---|\n${ev.map(e=>`| ${e.id} | ${inline(e.text).slice(0,330)} | ${e.classification} |`).join('\n')}`;
const checklist=(rows)=>rows.map(x=>`- [ ] ${x}`).join('\n');
const section=(title,body)=>`\n## ${title}\n\n${body}\n`;
function common({workflow,title,context,evidence}){
  return `# ${title}\n\n> **Power Chords Workroom** · ${workflow.title} · Evidence-grounded first draft\n> **Important:** This document uses only submitted context, fixed review templates and explicitly labeled assumptions. It is not external research, fact verification, system integration, or customer validation.\n\n`+
  section('Mission',markdown(context.objective||'Turn the submitted context into a practical, reviewable next decision.'))+
  section('Source context',markdown(context.raw))+
  section('Evidence ledger',evidenceTable(evidence))+
  section('What is not established',checklist(['Confirm the actual customer/users and impacted workflow.','Validate quantities, baseline metrics and dates against a trusted source.','Confirm constraints and dependencies with responsible teams.']));
}
const derive=(evidence,pattern,count=6)=>evidence.filter(e=>pattern.test(e.text)).slice(0,count).map(e=>`- **${e.id}:** ${markdown(e.text)}${e.classification==='Unverified / conditional'?' *(confirm)*':''}`).join('\n')||'No direct supporting evidence was supplied. Gather evidence before committing to a claim.';
const b=(heading,prompt)=>section(heading,prompt);
const packs={
 'discovery-to-prd':(x,e)=>b('Problem statement',`**Provisional problem:** ${inline(x.objective||'Investigate the described customer friction.')}\n\n**Supporting observations:**\n${derive(e,/problem|slow|manual|pain|time|error|miss|customer|user|broken|fail|need/i)}`)+
 b('User journey — hypothesis to validate',`| Stage | Customer task | Friction to inspect | Verification |\n|---|---|---|---|\n| Discover | Understand available options | Missing or conflicting information | Observe 3 representative user sessions |\n| Prepare | Gather prerequisite data | Manual handoffs / inconsistent inputs | List actual documents and systems |\n| Execute | Complete core workflow | Delays, errors or rework | Baseline elapsed time and error frequency |\n| Confirm | Verify successful outcome | Unclear state or missing feedback | Measure successful completion |`)+
 b('Requirements draft',`| Priority | Requirement / testable outcome | Evidence status |\n|---|---|---|\n| P0 | Describe and validate the end-to-end current state | Needs customer confirmation |\n| P0 | Detect incomplete or invalid inputs before advancing | Hypothesis |\n| P1 | Expose status, ownership, and actionable errors | Hypothesis |\n| P1 | Capture completion and failure events | Hypothesis |`)+
 b('Measurement & experiment plan',`**Hypothesis:** Removing validated workflow friction will improve successful task completion.\n\n**Primary outcome:** successful completion rate (definition and baseline pending).\n\n**Guardrails:** error rate, operator workload, customer escalations.\n\n**Design:** baseline first; then an approved controlled rollout or holdout where feasible.\n\n**Decision rule:** Define the required lift, minimum sample and observation window with stakeholders before launch.`)+
 b('PM review checklist',checklist(['Validate problem and user segment with customer.','Review prototype and scope with engineering and design.','Confirm constraints, ownership, metrics and rollout decision.'])),
 'integration-readiness':(x,e)=>b('Known integration facts',derive(e,/API|endpoint|token|auth|webhook|schema|SDK|integration|provider|system|service|data|rate|latency/i))+
 b('API / data contract — open decisions',`| Area | Contract question | Accountable reviewer |\n|---|---|---|\n| Authentication | OAuth, API key, SSO, or another approved method? | Security & platform |\n| Identity | How are user and tenant identities mapped? | IAM owner |\n| Payloads | What exact schemas, versions and nullability are supported? | API owner |\n| Limits | What are rate limits, timeouts and retry policies? | API owner |\n| Idempotency | How do we avoid duplicate writes after retries? | Backend owner |\n| Failure | Which errors are retriable and how are they reported? | Operations |\n| Data | Where is data stored, retained and deleted? | Privacy / legal |`)+
 b('System boundary',`\`\`\`text\nAuthorized client → Contract / validation → Integration adapter → External API\n          ↘ Audit & error handling ↙       ↘ Observability & retry policy\n\`\`\`\n\n*Illustrative design, not a diagram of a verified production system.*`)+
 b('Testing matrix',`| Scenario | Expected test |\n|---|---|\n| Valid request | Correct response mapping and audit |\n| Expired / invalid credential | Clear rejection without data leak |\n| Missing field | Validated and actionable error |\n| Timeout / rate limit | Bounded retry, backoff, no duplicate side effects |\n| Replayed request | Idempotent behavior |\n| Partial outage | Graceful degradation and recovery evidence |`)+
 b('Release gates',checklist(['Contract owner signs off schema and authentication.','Security and privacy reviews completed.','Staging and rollback paths exercised.','Telemetry dashboards and alert ownership documented.','Customer cutover / operational support rehearsed.'])),
 'product-decision':(x,e)=>b('Decision to make',markdown(x.objective||'Choose an evidence-backed next action.'))+
 b('Evidence for options',derive(e,/option|alternative|cost|customer|priority|estimate|revenue|impact|effort|metric|delay|constraint/i))+
 b('Options and trade-offs',`| Option | Benefit to test | Cost / risk | Missing evidence |\n|---|---|---|---|\n| A — Solve narrowest validated pain | Faster learning and lower initial scope | Might miss adjacent needs | True customer frequency |\n| B — Build extensible platform layer | Long-term reuse and scale | Larger initial investment | Multi-workflow demand |\n| C — Improve existing process first | Low-code / operational speed | May not fix root cause | Process vs. product constraint |\n| D — Defer | Preserves capacity | Leaves customer pain unsolved | Opportunity cost |`)+
 b('Decision scorecard',`Suggested weights, **not evidence-derived scores**:\n\n| Criterion | Weight | Owner |\n|---|---:|---|\n| Customer impact | 35% | PM |\n| Feasibility / time to value | 25% | Engineering |\n| Business impact | 25% | Business |\n| Operational risk | 15% | Operations |`)+
 b('Measurement',`Set an explicit **baseline → target → observation period** for the primary metric. Validate cost and effort estimates with accountable owners before making a decision.`)+
 b('Decision record',`**Status:** Not yet decided.\n\n**Decision owner:** To assign.\n\n**Alternatives rejected:** To document after review.\n\n**Revisit trigger:** Metric guardrail breach, new evidence, or agreed milestone.`),
 'launch-readiness':(x,e)=>b('Launch objective',markdown(x.objective||'Ship safely, measure adoption, and learn.'))+
 b('Confirmed launch context',derive(e,/launch|user|region|segment|target|channel|marketing|support|release|date|rollout|campaign/i))+
 b('Cross-functional workstreams',`| Workstream | Deliverable | Owner | Status |\n|---|---|---|---|\n| Product | Scope, metrics and release notes | Assign | Open |\n| Engineering | QA, observability, rollback | Assign | Open |\n| Design | User education and error states | Assign | Open |\n| Sales / marketing | Positioning, channels, enablement | Assign | Open |\n| Support | FAQ, triage and escalation | Assign | Open |\n| Compliance | Privacy, accessibility and policies | Assign | Open |`)+
 b('Rollout strategy',`**Recommended template:** Internal validation → limited cohort → monitored ramp → general availability.\n\n**Before each ramp:** Review success metrics, customer support signal, system performance and critical failure modes.\n\n*Exact percentages, dates and cohorts require actual evidence and approvals.*`)+
 b('Measurement & incident response',`**Primary metric:** Activation or validated customer outcome (define numerator and denominator).\n\n**Guardrails:** Crash/error rate, support incidents, latency, churn signals.\n\n**Fallback:** Assign incident commander; pause ramp when critical guardrails fail; document rollback and customer communication.`)+
 b('Launch checklist',checklist(['Scope and acceptance criteria signed off.','Instrumentation verified in production-like environment.','Support documentation and escalation paths ready.','Rollback tested and rollback owner assigned.','Launch communications approved.','Post-launch review scheduled.']))
};

export class Workroom {
  constructor({db,storageDir='./.power-chords',userId='local'}={}){
    if(!db)throw new Error('Database required');this.db=db;this.storageDir=resolve(storageDir);this.userId=userId;
    db.db.exec(`CREATE TABLE IF NOT EXISTS native_power_settings (
      user_id TEXT NOT NULL, capability_id TEXT NOT NULL, enabled INTEGER NOT NULL,
      updated_at TEXT NOT NULL, PRIMARY KEY(user_id,capability_id));
      CREATE TABLE IF NOT EXISTS workroom_runs (
      id TEXT PRIMARY KEY, user_id TEXT NOT NULL, workflow_id TEXT NOT NULL,
      created_at TEXT NOT NULL, title TEXT NOT NULL, file_path TEXT NOT NULL,
      sha256 TEXT NOT NULL, evidence_count INTEGER NOT NULL);`);
  }
  capabilities(){const rows=this.db.db.prepare('SELECT capability_id,enabled FROM native_power_settings WHERE user_id=?').all(this.userId);const flags=Object.fromEntries(rows.map(x=>[x.capability_id,!!x.enabled]));return CAPABILITIES.map(x=>({...x,enabled:x.status==='native_assistive'&&flags[x.id]!==false}));}
  workflows(){return WORKFLOWS.map(w=>({...w,available:w.capabilities.every(c=>this.capabilities().find(x=>x.id===c)?.enabled)}));}
  toggle(capabilityId,enabled){const c=CAPABILITIES.find(x=>x.id===capabilityId);if(!c)throw new Error('Unknown capability');if(c.status!=='native_assistive'&&enabled)throw new Error('This capability requires a runtime adapter before enabling');
    this.db.db.prepare(`INSERT INTO native_power_settings VALUES(?,?,?,?) ON CONFLICT(user_id,capability_id) DO UPDATE SET enabled=excluded.enabled,updated_at=excluded.updated_at`)
      .run(this.userId,capabilityId,enabled?1:0,new Date().toISOString());this.db.audit(this.userId,'native.toggle',capabilityId,{enabled});return this.capabilities().find(x=>x.id===capabilityId);
  }
  async run({workflowId,title,context,objective}={}){
    const w=WORKFLOWS.find(x=>x.id===workflowId);if(!w)throw new Error('Unknown workflow');
    if(!ok(context,20000)||context.trim().length<30)throw new Error('Provide 30–20,000 characters of customer context or evidence.');
    if(title!==undefined&&!ok(title,160))throw new Error('Title must be 1–160 characters');
    if(objective!==undefined&&(!ok(objective,1000)))throw new Error('Objective must be 1–1000 characters');
    if(!this.workflows().find(x=>x.id===workflowId)?.available)throw new Error('Required native power is disabled for this user');
    const chosenTitle=clean(title||w.title);const ev=evidenceIndex(context);
    // Optional inspected sources are visible in the SAME Workroom output. These are pointers
    // only: no third-party instruction is elevated to policy, and no external code is executed.
    const installed=this.db.packages(this.userId).filter(p=>p.effective_enabled && p.installed_path).slice(0,8);
    const imported=installed.length?section('Available installed power references — not executed',
      installed.map(p=>`- **${inline(p.title)}** — ${p.url} (pinned revision: \`${p.pinned_sha}\`; instruction/reference package only).`).join('\n')+
      '\n\nThese sources were available to the operator but were **not** interpreted, run, or used to substantiate claims in this draft. Review them separately if needed.'):'';
    const content=common({workflow:w,title:chosenTitle,context:{raw:context,objective},evidence:ev})+
      packs[workflowId]({objective},ev)+imported+
      section('Review and sign-off','**Draft status:** Review required. Human verification is needed before external use, publication, or customer commitments.\n\n**Production actions performed:** None.\n');
    const id=randomUUID();const directory=join(this.storageDir,'workroom',this.userId.replace(/[^a-zA-Z0-9_-]/g,'_'));
    await mkdir(directory,{recursive:true,mode:0o700});const file=resolve(directory,id+'.md');
    if(!file.startsWith(resolve(directory)+'/'))throw new Error('Invalid destination');
    await writeFile(file,content,{flag:'wx',mode:0o600});
    const sha256=createHash('sha256').update(content).digest('hex');
    this.db.db.prepare('INSERT INTO workroom_runs VALUES(?,?,?,?,?,?,?,?)').run(id,this.userId,workflowId,new Date().toISOString(),chosenTitle,file,sha256,ev.length);
    this.db.audit(this.userId,'workroom.run',workflowId,{id,sha256,evidence_count:ev.length});
    return {id,title:chosenTitle,workflowId,sha256,evidenceCount:ev.length,capabilities:w.capabilities,content,download:`/api/workroom/artifacts/${id}`,executed:true,external_actions:false};
  }
  runs(limit=30){return this.db.db.prepare('SELECT id,title,workflow_id,created_at,sha256,evidence_count FROM workroom_runs WHERE user_id=? ORDER BY created_at DESC LIMIT ?').all(this.userId,Math.max(1,Math.min(limit,100)));}
  async artifact(id){if(!/^[a-f0-9-]{36}$/.test(id))throw new Error('Invalid artifact id');const row=this.db.db.prepare('SELECT * FROM workroom_runs WHERE id=? AND user_id=?').get(id,this.userId);if(!row)throw new Error('Artifact not found');const content=await readFile(row.file_path,'utf8');if(createHash('sha256').update(content).digest('hex')!==row.sha256)throw new Error('Artifact integrity failure');return {id,title:row.title,content};}
}
