import {PowersDB} from './db.mjs';
import {Workroom} from './workroom.mjs';
import {join,relative} from 'node:path';
const root=process.cwd();
const db=new PowersDB(join(root,'.local','demo.sqlite'));
try{
 const studio=new Workroom({db,storageDir:join(root,'.local'),userId:'demo'});
 const run=await studio.run({
  workflowId:'discovery-to-prd',
  title:'Demo: Partner Integration Customer Discovery',
  objective:'Reduce time to first successful order integration without double-processing.',
  context:'A fictional merchant operations team manually reconciles orders across three APIs. Their support inbox receives repeated complaints about missing status updates. During a simulated interview, a team member said retries can create duplicate records. We do not yet know the baseline completion rate, number of affected merchants, or the API contract. These are fictional notes for a product demo.'
 });
 console.log(`Power Chords work product created: ${run.title}`);
 console.log(`Evidence items: ${run.evidenceCount}; capabilities: ${run.capabilities.join(', ')}`);
 console.log(`Download via local Workroom: ${run.download}`);
 console.log(`Artifact ID: ${run.id}; SHA-256: ${run.sha256}`);
}finally{db.close();}
