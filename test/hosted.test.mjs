import test from 'node:test';
import assert from 'node:assert/strict';
import handler from '../api/hosted.js';

async function call(body,origin='https://power-chords.example'){
  const response={headers:{},setHeader(name,value){this.headers[name]=value;},end(value){this.body=JSON.parse(value);}};
  await handler({method:body?'POST':'GET',headers:{host:'power-chords.example',origin},body},response);
  return response;
}
test('hosted catalog exposes all sources and four workflows without shared history',async()=>{
  const response=await call();
  assert.equal(response.statusCode,200);
  assert.equal(response.body.state.sources.length,52);
  assert.equal(response.body.workroom.workflows.length,4);
  assert.deepEqual(response.body.workroom.runs,[]);
});
test('hosted generation isolates concurrent requests and enforces disabled powers',async()=>{
  const input={workflowId:'discovery-to-prd',title:'Private workspace',context:'Customers report that manual onboarding takes two hours and they need fewer steps.'};
  const [first,second]=await Promise.all([call({action:'run',input}),call({action:'run',input:{...input,title:'Another workspace'}})]);
  assert.equal(first.statusCode,200);
  assert.equal(second.statusCode,200);
  assert.notEqual(first.body.id,second.body.id);
  assert.match(first.body.content,/Private workspace/);
  assert.doesNotMatch(second.body.content,/Private workspace/);
  assert.deepEqual((await call()).body.workroom.runs,[]);
  assert.equal((await call({action:'run',input,disabled:['01']})).statusCode,400);
});
test('hosted endpoints reject cross-origin writes and oversized inputs',async()=>{
  assert.equal((await call({action:'run'},'https://other.example')).statusCode,403);
  assert.equal((await call({action:'run',input:'x'.repeat(26000)})).statusCode,413);
  assert.equal((await call({action:'unknown'})).statusCode,400);
});
