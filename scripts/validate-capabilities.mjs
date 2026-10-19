#!/usr/bin/env node
import {readFile,stat} from 'node:fs/promises';
import {resolve,join} from 'node:path';
import {CAPABILITIES} from '../src/workroom.mjs';
const root=resolve(import.meta.dirname,'..');
const {capabilities}=JSON.parse(await readFile(join(root,'data/capability-guides.json'),'utf8'));
const ids=new Set();const slugs=new Set();
if(capabilities.length!==52)throw Error(`Expected 52, found ${capabilities.length}`);
for(const [i,c] of capabilities.entries()){
 if(c.id!==CAPABILITIES[i].id || c.name!==CAPABILITIES[i].name || c.implementation!==CAPABILITIES[i].status)throw Error(`Mismatch at capability ${i+1}`);
 if(ids.has(c.id)||slugs.has(c.slug))throw Error(`Duplicate capability ${c.id}`);
 ids.add(c.id);slugs.add(c.slug);
 if(!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(c.slug))throw Error(`Invalid slug ${c.slug}`);
 for(const field of ['inputs','steps','outputs'])if(!Array.isArray(c[field])||c[field].length<2)throw Error(`Incomplete ${field} for ${c.id}`);
 for(const path of ['README.md','SKILL.md','capability.json','examples/example-request.md'])await stat(join(root,'capabilities',c.slug,path));
 const skill=await readFile(join(root,'capabilities',c.slug,'SKILL.md'),'utf8');
 if(!skill.includes('name: power-chords-'+c.slug))throw Error(`Broken agent skill ${c.slug}`);
}
console.log(`Validated ${capabilities.length} portable capability packs, 208 files and Workroom ID alignment.`);
