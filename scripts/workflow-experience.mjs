import {readFile} from 'node:fs/promises';
import {join} from 'node:path';

export const symbol=(name,extra='')=>`<span class="wf-symbol wf-icon-${name} ${extra}" aria-hidden="true"></span>`;
export function accountOrigin(value='https://accounts.lazo.tools'){
 const url=new URL(value);
 if(url.origin!=='https://accounts.lazo.tools'&&!(url.protocol==='http:'&&['127.0.0.1','localhost'].includes(url.hostname)))throw Error('Use the existing Lazo account host or a local preview.');
 return url.origin;
}
export function workflowDownload(slug,origin){
 const url=new URL('/signup',accountOrigin(origin));url.searchParams.set('product','power-chords');url.searchParams.set('workflow',slug);return url.href;
}
export async function experiences(root,capabilities){
 const {workflows}=JSON.parse(await readFile(join(root,'data/workflow-experience.json'),'utf8'));
 if(Object.keys(workflows).length!==capabilities.length)throw Error('Every workflow needs its own input guide.');
 for(const c of capabilities){const entry=workflows[c.slug];if(!entry||entry.sources.length!==c.inputs.length||!entry.icon)throw Error('Incomplete workflow experience: '+c.slug);}
 return workflows;
}
