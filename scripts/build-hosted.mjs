import {cp,readFile,writeFile} from 'node:fs/promises';
import {buildLanding} from './landing.mjs';
await cp('public','dist',{recursive:true});
const html=await readFile('public/index.html','utf8');
await writeFile('dist/workroom.html',html.replace('<head>','<head><meta name="power-chords-hosted" content="true">'));
await buildLanding('dist',{hosted:true});
