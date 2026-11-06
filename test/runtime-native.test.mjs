import test from 'node:test';
import assert from 'node:assert/strict';
import {existsSync} from 'node:fs';
import {mkdtemp,rm,readFile} from 'node:fs/promises';
import {join,resolve} from 'node:path';
import {tmpdir} from 'node:os';
import {native} from '../src/runtime/native.mjs';
const root=resolve(import.meta.dirname,'..');
const configured=existsSync(join(root,'.local/runtime-python/bin/python'));
test('native SQL executes actual aggregates and blocks database writes and file attachment',{skip:!configured},async()=>{
 const dir=await mkdtemp(join(tmpdir(),'pc-sql-'));
 try{const rows=[{partner:'A',revenue:12},{partner:'A',revenue:8},{partner:'B',revenue:5}];const result=await native('sql',{rows,query:'SELECT partner,SUM(revenue) AS total FROM data GROUP BY partner ORDER BY partner'},dir);assert.deepEqual(result.result.rows,[{partner:'A',total:20},{partner:'B',total:5}]);await assert.rejects(native('sql',{rows,query:'DROP TABLE data'},dir),/not authorized/);await assert.rejects(native('sql',{rows,query:"ATTACH DATABASE '/tmp/pc-unsafe.sqlite' AS external"},dir),/not authorized/);}finally{await rm(dir,{recursive:true,force:true});}
});
test('isolated JavaScript runs regression checks and stops infinite loops',{skip:!configured},async()=>{
 const dir=await mkdtemp(join(tmpdir(),'pc-js-'));
 try{const result=await native('javascript',{code:'function percent(x,p){return x*(1-p/100)}',assertions:['percent(100,10)===90','percent(50,0)===50']},dir);assert.equal(result.result.passed,true);await assert.rejects(native('javascript',{code:'while(true){}',assertions:['true']},dir),/interrupted/);await assert.rejects(native('javascript',{code:'require("node:fs")',assertions:['true']},dir),/not defined/);}finally{await rm(dir,{recursive:true,force:true});}
});
test('native forecasting and funnel calculations use supplied values',{skip:!configured},async()=>{
 const dir=await mkdtemp(join(tmpdir(),'pc-math-'));
 try{const result=await native('forecast',{rows:[{v:10},{v:20},{v:30}],value_column:'v'},dir);assert.equal(result.result.forecast.next_period,40);const funnel=await native('funnel',{rows:[{stage:'Visit',count:100},{stage:'Signup',count:25},{stage:'Activate',count:10}]},dir);assert.equal(funnel.result.funnel[2].conversion_from_previous,.4);const svg=await readFile(join(dir,'chart.svg'),'utf8');assert(svg.includes('<svg'));}finally{await rm(dir,{recursive:true,force:true});}
});
