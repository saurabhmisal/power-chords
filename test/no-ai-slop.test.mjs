import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile, writeFile, mkdtemp, rm, mkdir, copyFile, chmod, symlink} from 'node:fs/promises';
import {tmpdir} from 'node:os';
import {join, resolve} from 'node:path';
import {fileURLToPath} from 'node:url';
import {execFileSync} from 'node:child_process';
import {createHash} from 'node:crypto';
import {getEditorialPolicy, withEditorialPolicy} from '../src/runtime/editorial-policy.mjs';
import {CodexConnection} from '../src/runtime/codex.mjs';

const root = resolve(fileURLToPath(new URL('..', import.meta.url)));
const skill = join(root, 'workflows/no-ai-slop');
const cases = JSON.parse(await readFile(join(skill,'cases.json'),'utf8'));
const policy = getEditorialPolicy();

test('versioned policy matches its approved content fingerprint and is pinned', () => {
  assert.equal(policy.sha256,createHash('sha256').update(policy.text).digest('hex'));
  assert.ok(Object.isFrozen(policy));
  assert.strictEqual(getEditorialPolicy(),policy);
});
test('prompt retains exact task, syntax and output contract', () => {
  const prompt='Return JSON only. Preserve this exact quote: "Maybe — sample unknown; not verified." Code: for (;;) {}';
  const compiled=withEditorialPolicy(prompt);
  assert.ok(compiled.endsWith(prompt));
  assert.ok(compiled.includes(policy.text));
  assert.match(compiled,/requested operation and output schema/);
  assert.throws(()=>withEditorialPolicy(''),/task prompt/);
});
test('policy supports no-change, audit-only, uncertainty, stable terms and scope', () => {
  for (const fragment of ['Leave effective writing unchanged','For an audit, quote the exact passage',
    'Keep terminology stable','Do not turn may into will','Do not use a blanket word blacklist',
    'A local edit returns the affected passage','Preserve exact quotations']) assert.ok(policy.text.includes(fragment),fragment);
});
test('all eight regression cases have explicit preservation checks and negative examples', () => {
  assert.equal(cases.length,8);
  assert.equal(new Set(cases.map(x=>x.id)).size,8);
  for(const c of cases) {
    assert.ok(['edit','audit'].includes(c.operation));
    for(const key of ['request','input','expected','negative_example']) assert.ok(typeof c[key]==='string'&&c[key].trim());
    for(const literal of c.must_preserve) assert.ok(c.input.includes(literal),`${c.id}: ${literal}`);
  }
});
test('portable skill and review sheet state limitations without authorship scoring', async () => {
  const text=await readFile(join(skill,'SKILL.md'),'utf8');
  assert.match(text,/name: power-chords-no-ai-slop/);
  assert.match(text,/editorial-policy\.md/);
  assert.match(text,/Do not rewrite the document, score AI authorship/);
  assert.match(text,/grants no file, network, publishing/);
  assert.match(await readFile(join(skill,'eval.md'),'utf8'),/No live-model pass is implied/);
});
for(const agent of ['codex','claude','cursor','gemini']) test(`portable installation for ${agent} preserves exact rules and refuses overwrite`, async () => {
  const dir=await mkdtemp(join(tmpdir(),'pc-slop-install-'));
  try {
    execFileSync(process.execPath,[join(skill,'install.mjs'),'--agent',agent,'--project',dir]);
    const folder={codex:'.agents',claude:'.claude',cursor:'.cursor',gemini:'.gemini'}[agent];
    const target=join(dir,folder,'skills/power-chords-no-ai-slop');
    assert.equal(await readFile(join(target,'editorial-policy.md'),'utf8'),policy.text);
    assert.equal(JSON.parse(await readFile(join(target,'provenance.json'),'utf8')).standard_sha256,policy.sha256);
    assert.throws(()=>execFileSync(process.execPath,[join(skill,'install.mjs'),'--agent',agent,'--project',dir],{stdio:'pipe'}));
    assert.equal(await readFile(join(target,'editorial-policy.md'),'utf8'),policy.text);
  } finally {await rm(dir,{recursive:true,force:true});}
});
test('custom destination works and symbolic-link targets are rejected', async () => {
  const dir=await mkdtemp(join(tmpdir(),'pc-slop-custom-'));
  try {
    const dest=join(dir,'skills');
    await mkdir(dest);
    const outside=join(dir,'outside');await mkdir(outside);
    await symlink(outside,join(dest,'power-chords-no-ai-slop'),'dir');
    assert.throws(()=>execFileSync(process.execPath,[join(skill,'install.mjs'),'--dest',dest],{stdio:'pipe'}));
    await rm(join(dest,'power-chords-no-ai-slop'));
    execFileSync(process.execPath,[join(skill,'install.mjs'),'--dest',dest]);
    assert.equal(await readFile(join(dest,'power-chords-no-ai-slop/editorial-policy.md'),'utf8'),policy.text);
  } finally {await rm(dir,{recursive:true,force:true});}
});
test('missing or altered policy fails before a prompt is sent', async () => {
  const dir=await mkdtemp(join(tmpdir(),'pc-slop-missing-'));
  try {
    await mkdir(join(dir,'src/runtime'),{recursive:true});
    await mkdir(join(dir,'workflows/no-ai-slop'),{recursive:true});
    await copyFile(join(root,'src/runtime/editorial-policy.mjs'),join(dir,'src/runtime/editorial-policy.mjs'));
    const command=`import {withEditorialPolicy} from ${JSON.stringify('file://'+join(dir,'src/runtime/editorial-policy.mjs'))}; withEditorialPolicy('test');`;
    assert.throws(()=>execFileSync(process.execPath,['--input-type=module','-e',command],{stdio:'pipe'}));
    for(const file of ['editorial-policy.md','provenance.json']) await copyFile(join(skill,file),join(dir,'workflows/no-ai-slop',file));
    await writeFile(join(dir,'workflows/no-ai-slop/editorial-policy.md'),policy.text+'Unreviewed change.');
    assert.throws(()=>execFileSync(process.execPath,['--input-type=module','-e',command],{stdio:'pipe'}));
  } finally {await rm(dir,{recursive:true,force:true});}
});
test('actual CodexConnection sends editorial rules without changing sandbox or schema (mock CLI)', async () => {
  const dir=await mkdtemp(join(tmpdir(),'pc-slop-wire-'));
  try {
    const binary=join(dir,'fake-codex');
    await writeFile(binary,`#!${process.execPath}\nconst fs=require('node:fs');const path=require('node:path');const args=process.argv.slice(2);let prompt='';process.stdin.setEncoding('utf8');process.stdin.on('data',x=>prompt+=x);process.stdin.on('end',()=>{const output=args[args.indexOf('--output-last-message')+1];fs.writeFileSync(path.join(path.dirname(output),'captured.json'),JSON.stringify({args,prompt}));fs.writeFileSync(output,JSON.stringify({answer:'fixture only'}));console.log(JSON.stringify({type:'turn.completed',usage:{input_tokens:1,output_tokens:1}}));});\n`);
    await chmod(binary,0o700);
    const schema={type:'object',properties:{answer:{type:'string'}},required:['answer'],additionalProperties:false};
    const prompt='Audit only. Return findings, not a rewrite. Return JSON according to the supplied schema.';
    const result=await new CodexConnection({binary,timeout:5000}).generate({prompt,schema,directory:dir});
    const captured=JSON.parse(await readFile(join(dir,'captured.json'),'utf8'));
    assert.ok(captured.prompt.includes(policy.text));assert.ok(captured.prompt.endsWith(prompt));
    assert.equal(captured.args[captured.args.indexOf('--sandbox')+1],'read-only');
    assert.ok(captured.args.includes('web_search="disabled"'));
    assert.ok(captured.args.includes('shell_tool'));assert.ok(captured.args.includes('plugins'));
    assert.deepEqual(JSON.parse(await readFile(join(dir,'response-schema.json'),'utf8')),schema);
    assert.equal(result.value.answer,'fixture only');
  } finally {await rm(dir,{recursive:true,force:true});}
});
