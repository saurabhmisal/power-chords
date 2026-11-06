import guides from '../../data/capability-guides.json' with {type:'json'};
import {readFile} from 'node:fs/promises';
import {join,resolve} from 'node:path';
const root=resolve(import.meta.dirname,'../..');
const contexts={
 '01':'E1: Six of eight interviewed dispatchers reconcile failed deliveries in a spreadsheet. E2: Median reconciliation time observed in three sessions was 18 minutes. E3: Ownership is unclear after a partner rejects a delivery. These are synthetic verification notes, not real customer research.',
 '02':'Synthetic inputs: 2,000 target logistics companies in the initial region; 25% meet the integration criteria; assumed annual contract value USD 12,000; attainable first-year penetration scenarios 2%, 5%, 10%. Separate supplied estimates from measured evidence.',
 '03':'Synthetic product evidence: Product A supports batch CSV import at USD 200/month but no webhook replay. Product B supports webhooks and audit logs at USD 650/month but requires enterprise onboarding. Our prototype offers replay controls with a single-tenant limit.',
 '04':'Synthetic account: Northstar Hospital wants an analytics pilot. The CIO owns the budget; the data-platform lead owns integration; the privacy officer approves data handling. Budget and dates are unconfirmed. Monday notes record an SSO requirement and a request for a de-identified sample.',
 '05':'Synthetic evidence: five support tickets describe duplicate retries; three interviews mention unclear ownership; two sessions show users switching between dashboards. Counter-signal: one customer finds the current status page sufficient. No prevalence estimate is established.',
 '06':'Synthetic document: The onboarding pilot is for dispatch operators. Initial scope covers partner failure ingestion, assignment and an auditable retry. User approval is required before any retry reaches an external system.',
 '08':'Synthetic source: A customer owns several orders. Each order belongs to one delivery. A dispatcher is assigned to each delivery. A partner emits delivery events, and an event can open an incident. All relationships come from these statements.',
 '10':'Synthetic evidence: dispatchers need a visible owner and status for failed partner deliveries. The pilot supports one partner, an incident queue, assignment and retry review. It excludes automatic retries. Success is measured as time to find the accountable owner; baseline remains to be measured.',
 '11':'Synthetic journey: a courier signs up, verifies identity, chooses a shift, accepts a delivery, reaches pickup, delivers the item and confirms completion. Identity rejection, missing inventory and an unavailable customer are known exception states.',
 '12':'Synthetic constraints: two engineers and one designer for a quarter. Target outcome is clearer partner onboarding. Proposed opportunities include input validation, status visibility and replay controls. Dependencies include partner API access and a security review.',
 '13':'Synthetic options: input validation impact 8 confidence .8 effort 3; ownership display impact 7 confidence .9 effort 2; automated replay impact 9 confidence .4 effort 8. Prioritize for learning speed; scoring is a decision aid rather than measured business impact.',
 '14':'Synthetic hypothesis: a guided setup checklist improves self-serve API activation. Primary metric is completion within seven days. Guardrails are error rate and support contacts. The baseline and sample-size assumptions are not established.',
 '15':'Synthetic contract: POST /orders accepts external_id and items; the partner sends signed order.updated webhooks. Retries are at least once; order IDs are partner-scoped. Clarify rate limits, signing algorithm, timeout behavior and retention before production integration.',
 '16':'Build a self-contained delivery-exceptions dashboard. Users must add an exception with partner, reference and severity, filter the list, assign an owner and mark it resolved. Include empty states and form validation. Data stays in the isolated browser session.',
 '17':'Supplied source files:\nserver.mjs: import {authenticate} from "./auth.mjs"; export function handle(req){ const user=authenticate(req); return {tenant:user.tenant}; }\nauth.mjs: export function authenticate(req){if(!req.token)throw Error("Unauthenticated");return {tenant:"demo"};}\nTrace only these supplied files.',
 '18':'Synthetic requirements: a multi-tenant event ingestion service accepts partner webhooks, validates schemas, deduplicates by partner plus event ID, places events on a queue, and supports audited replay. Design for tenant isolation and bounded retries.',
 '19':'Investigate the supplied JavaScript discount function. The expected rule is amount minus percentage discount. Reproduce the supplied failing test, return a corrected fixed.js, and preserve the public function name discount.',
 '20':'Synthetic release evidence: staging QA passed happy paths; replay deduplication has a regression test; security review is open; rollback is documented but unexercised; support has a draft FAQ. Identify actual go/no-go gaps, not an invented approval.',
 '21':'Explore a delivery incident queue for an operations team. The primary decisions are which incident needs attention, who owns it and what action is safe. Include a list, detail view, empty state and review-before-retry state.',
 '22':'Create a clickable onboarding prototype: company details, API setup, validation, confirmation. Visitors can move between steps, see required-field errors and complete a valid sample flow. Keep it self-contained and do not make network calls.',
 '23':'Sequence: Partner sends a signed webhook to Gateway. Gateway validates the signature then sends an event to Queue. Worker deduplicates the event in Database and updates the delivery. A failed signature returns 401 without enqueueing.',
 '24':'Create a rectangular enclosure 40 mm wide, 25 mm high and 12 mm deep as a simple solid reference part. State units and validate dimensions. No tolerance or manufacturability certification is implied.',
 '25':'Coordinate a team to deliver an incident dashboard: research defines user decisions, engineering implements the queue, design reviews hierarchy, and QA verifies assignment and resolution. Create explicit handoffs, dependencies and acceptance checks.',
 '26':'Prepare a local daily document-review routine that runs Customer Discovery Compass from these supplied notes. The schedule should remain inactive until I explicitly activate it. The local server must be running for scheduled execution.',
 '27':'Read or update only the selected request target. Show exactly what happened, and hold non-GET requests for explicit review and approval.',
 '28':'Execute a real two-stage workflow: aggregate supplied revenue rows with SQLite, then render the resulting table as a dashboard. Pass the actual SQL output into the next capability.',
 '29':'Evaluate a read request, an external write and a publication attempt. Reads are allowed within authorized scope; writes require exact action approval; publication is blocked until release approval.',
 '30':'Dataset contains partner, revenue and cost. Aggregate revenue and cost by partner and calculate contribution. Use the supplied rows, execute SQL and return the reproducible query and results.',
 '31':'Create a readable revenue dashboard from the actual supplied rows. Show the chart, source records, definitions and data limitations. Table filtering should work in the resulting HTML.',
 '32':'Analyze the supplied funnel stages, compute conversion and drop-off, and identify the largest loss. These synthetic counts are a fixture, not real conversion measurements.',
 '33':'Execute the supplied evaluation cases against the current Codex connection. Score the literal expectedIncludes criteria and explain why this small fixture is not a broad quality benchmark.',
 '34':'Fit a simple trend to the supplied monthly revenue. Calculate the next observation and transparent low/base/high scenarios. Do not characterize scenario assumptions as confidence intervals.',
 '35':'Create an invoice from the supplied line items and operator-provided tax rate. Exercise draft → issued → paid. Do not charge a payment method or determine jurisdictional tax compliance.',
 '36':'Calculate contribution and contribution margin from the supplied revenue and cost rows. Explain assumptions and identify which additional inputs are needed for CAC or LTV.',
 '37':'Create an operations cockpit from the supplied incident rows. Prioritize status, owner and next action. This is a snapshot, not a live monitoring feed.',
 '38':'Synthetic capacity: two engineers have 30 hours each this week; one designer has 20 hours. Work items: queue 24 engineering hours, assignment 18 engineering hours, validation 12 engineering hours, UX review 14 design hours. Leave buffers and flag missing estimates.',
 '39':'Transcribe the uploaded speech with timestamps, then extract decisions and follow-ups. Do not guess speaker names.',
 '40':'Narrate the supplied text using the local system voice. Produce an actual audio file with duration and metadata. This is not voice cloning.',
 '41':'Separate the uploaded preview audio into real model-generated stems. Report the processing engine and artifacts; do not claim that synthetic tones make a representative quality benchmark.',
 '42':'Create a short explainer: operations teams supply evidence, Power Chords structures a reviewed decision, and the team approves action. Render an actual captioned MP4, not just a storyboard.',
 '43':'Audit the supplied page using actually retrieved HTML. Check title, description, H1, image alt text and structured-data signals. Current rankings, traffic and business impact are not supplied.',
 '44':'Synthetic launch: healthcare scheduling API pilot for three design partners. Product scope is frozen; security review and support rehearsal are open. No launch date is committed. Define audiences, channel work, owners and go/no-go checks.',
 '45':'Draft a launch campaign for a delivery incident-ownership feature. Target audience: operations leads. Verified benefit: one queue shows owner and status. Do not claim numerical time savings. Produce email, social and landing-page copy for review only.',
 '46':'Synthetic funnel evidence: strong signup volume, larger drop at API setup, and support requests about webhook validation. Propose controlled tests and guardrails; do not claim a measured causal uplift.',
 '47':'Supplied synthetic opportunities: Platform PM at SampleCo A requires API product experience and SQL; Operations PM at SampleCo B requires last-mile logistics and on-site work. Candidate evidence: five years API platform leadership and workflow research, no stated logistics employment. These are sample roles, not current openings.',
 '48':'Synthetic candidate evidence: led API onboarding redesign; coordinated engineering and support; a baseline metric is not supplied. Prepare a principal PM practice plan. Never invent achievements, metrics or employer details.',
 '49':'Compare candidate sites in the supplied coordinate rows. Use actual coordinates and label any suitability criterion not supplied. Do not invent live availability or travel times.',
 '50':'Inspect the supplied GeoJSON road network. Count actual nodes, links, junctions and dead ends; render the network. Crossing lines are only joined where coordinates explicitly define a shared node.',
 '51':'Visualize the supplied geographic points accurately with a readable map and source bounds. The data is a synthetic fixture in EPSG:4326, not a live location feed.',
 '52':'Analyze the supplied site observations and geographic distribution. Derive field interventions from evidence, flag the small sample, and avoid inferring individual behavior or exact travel times.'
};
const revenue=[{partner:'North',label:'Jan',revenue:1200,cost:700},{partner:'South',label:'Feb',revenue:1450,cost:800},{partner:'North',label:'Mar',revenue:1600,cost:900},{partner:'South',label:'Apr',revenue:1800,cost:950}];
const geo=[{name:'Site A',lat:18.5204,lon:73.8567,issues:5},{name:'Site B',lat:18.5362,lon:73.8939,issues:2},{name:'Site C',lat:18.5018,lon:73.8636,issues:8}];
export async function exampleFor(id,{origin='http://127.0.0.1:4333',includeFiles=true}={}){
 const c=guides.capabilities.find(c=>c.id===id||c.slug===id);if(!c)throw Error('Example not found.');id=c.id;
 const body={capabilityId:id,task:c.example,context:'PRIVATE PREVIEW: the supplied examples below are synthetic verification fixtures, not customer data.\n'+(contexts[id]||''),inputs:{},files:[],research:false};
 if(['16','19','22','24','27','28','30','31','33','35','39','40','41','42'].includes(id))body.task=contexts[id];
 if(id==='07')body.task='Extract the invoice number, customer, subtotal and total from this uploaded invoice image and report confidence.';
 if(id==='09'){body.inputs={query:'How does the system avoid processing the same partner notification twice?',documents:['Webhook idempotency uses the partner identifier plus the event identifier as a deduplication key.','Invoices are generated from billable events after a finance review.','The dashboard shows incident ownership and a status filter.']};body.task='Retrieve the passage that explains avoiding duplicate event processing and provide a cited answer.';}
 if(id==='19')body.inputs={code:'function discount(amount, percent){ return amount + amount * percent / 100; }',assertions:['discount(100,10)===90','discount(200,0)===200','discount(80,25)===60']};
 if(id==='24')body.inputs={width:40,height:25,depth:12};
 if(id==='26')body.inputs={routine:{capabilityId:'01',task:'Summarize the supplied interview evidence into a problem brief.',context:contexts['01'],interval_seconds:86400}};
 if(id==='27')body.inputs={request:{url:origin+'/runtime-fixture/source',method:'GET'}};
 if(id==='28')body.inputs={chain:[{capabilityId:'30',task:'Aggregate revenue by partner from these rows.',inputs:{rows:revenue,query:'SELECT partner,SUM(revenue) AS revenue FROM data GROUP BY partner ORDER BY partner'}},{capabilityId:'31',task:'Build a dashboard of the actual aggregated revenue by partner.'}]};
 if(['30','31','34','36'].includes(id))body.inputs={rows:revenue,value_column:'revenue',...(id==='30'?{query:'SELECT partner,SUM(revenue) AS revenue,SUM(cost) AS cost,SUM(revenue-cost) AS contribution FROM data GROUP BY partner ORDER BY partner'}:{})};
 if(id==='32')body.inputs={rows:[{stage:'Visit',count:1000},{stage:'Signup',count:250},{stage:'API setup',count:75},{stage:'Activated',count:60}],value_column:'count'};
 if(id==='33')body.inputs={cases:[{prompt:'What is two plus two? Answer with the numeral only.',expectedIncludes:'4'},{prompt:'Complete the phrase: least privilege means granting only the minimum ____ needed. Use the word permissions.',expectedIncludes:'permissions'}]};
 if(id==='35')body.inputs={number:'PC-204',customer:'Synthetic Example Company',currency:'USD',tax_rate:.1,items:[{description:'Pilot setup',quantity:1,unit_price:1000},{description:'Support hours',quantity:2,unit_price:125}],events:['issue','pay']};
 if(id==='37')body.inputs={rows:[{incident:'I-01',status:'Open',owner:'Operations',age_hours:3},{incident:'I-02',status:'Review',owner:'Platform',age_hours:1}]};
 if(id==='40')body.inputs={text:'Power Chords turns customer evidence into a clear product plan. The team will review the prototype on Friday.'};
 if(id==='42')body.inputs={seconds_per_scene:2};
 if(id==='43')body.inputs={urls:[origin+'/runtime-fixture/source']};
 if(['49','51','52'].includes(id))body.inputs={rows:geo};
 if(id==='50')body.inputs={geojson:{type:'FeatureCollection',features:[{type:'Feature',properties:{name:'Main road'},geometry:{type:'LineString',coordinates:[[73.85,18.52],[73.86,18.52],[73.87,18.52]]}},{type:'Feature',properties:{name:'Branch'},geometry:{type:'LineString',coordinates:[[73.86,18.52],[73.86,18.53]]}}]}};
 const fileMap={'06':['pilot-notes.docx','pilot-brief.pdf'],'07':['invoice.png'],'39':['meeting.wav'],'41':['audio-mix.wav']};
 if(includeFiles)for(const name of fileMap[id]||[])body.files.push({name,base64:(await readFile(join(root,'.local/runtime/examples',name))).toString('base64')});
 return body;
}
