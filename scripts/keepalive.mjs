#!/usr/bin/env node
/** GitHub disables scheduled workflows on inactive public repositories after 60 days.
 * This file is updated every 25 days so an unchanged library remains monitored.
 */
import {readFile,writeFile} from 'node:fs/promises';
import {fileURLToPath} from 'node:url';
import path from 'node:path';
const filename=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'../.github/last-active.txt');
let previous=0;try{previous=Date.parse((await readFile(filename,'utf8')).trim());}catch{}
if(!previous||Date.now()-previous>=25*86400000){
  await writeFile(filename,new Date().toISOString().slice(0,10)+'\n');
  console.log('Updated 25-day schedule keepalive.');
}else console.log('No keepalive needed.');
