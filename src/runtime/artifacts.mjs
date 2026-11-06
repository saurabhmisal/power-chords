export const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
export function safeName(name){if(typeof name!=='string'||!/^[-a-zA-Z0-9_.]{1,120}$/.test(name)||name==='.'||name==='..')throw Error('Invalid artifact filename.');return name;}
export function graphSvg({nodes=[],edges=[]},title='Power Chords workflow'){
 if(!Array.isArray(nodes)||!nodes.length||nodes.length>40||!Array.isArray(edges)||edges.length>100)throw Error('A graph needs 1–40 nodes and up to 100 edges.');
 const indexed=new Map(nodes.map((n,i)=>[String(n.id),{...n,x:90+(i%3)*300,y:140+Math.floor(i/3)*140}]));
 if(indexed.size!==nodes.length||edges.some(e=>!indexed.has(String(e.from))||!indexed.has(String(e.to))))throw Error('Graph edges must reference unique declared nodes.');
 const height=220+Math.ceil(nodes.length/3)*140;
 return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 ${height}" width="1000" height="${height}"><rect width="1000" height="${height}" fill="#101a14"/><defs><marker id="arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto-start-reverse"><path d="M0 0L10 5L0 10Z" fill="#a5c9aa"/></marker></defs><text x="40" y="55" fill="#e4f778" font-size="25" font-family="sans-serif">${esc(title)}</text>${edges.map(e=>{const a=indexed.get(String(e.from)),b=indexed.get(String(e.to));return `<path d="M${a.x+100} ${a.y+30}L${b.x+100} ${b.y+30}" stroke="#a5c9aa" stroke-width="2" marker-end="url(#arrow)"/><text x="${(a.x+b.x)/2+100}" y="${(a.y+b.y)/2+20}" fill="#c9d6c9" font-size="12">${esc(e.label||'')}</text>`;}).join('')}${[...indexed.values()].map(n=>`<rect x="${n.x}" y="${n.y}" width="230" height="70" rx="10" fill="#24372a" stroke="#a5c9aa"/><text x="${n.x+14}" y="${n.y+30}" fill="#eef3e8" font-size="15" font-family="sans-serif">${esc(String(n.label||n.id).slice(0,26))}</text>`).join('')}</svg>`;
}
export function dashboardHtml({title,rows=[],chart='',summary={}}){
 const keys=rows.length?Object.keys(rows[0]):[];
 return `<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${esc(title)}</title><style>body{font:16px/1.6 system-ui;background:#101a14;color:#eef3e8;padding:32px}h1{color:#e4f778}table{width:100%;border-collapse:collapse}td,th{text-align:left;padding:12px;border-bottom:1px solid #3f5645}input{padding:12px;background:#23352a;color:white;border:1px solid #637464}svg{max-width:100%;height:auto}pre{white-space:pre-wrap}#count{color:#b4c9b8}</style></head><body><h1>${esc(title)}</h1><p>Calculated from supplied data. Filter the table to explore individual records.</p>${chart}<label>Filter records <input id="filter" type="search"></label><p id="count"></p><table><thead><tr>${keys.map(k=>`<th>${esc(k)}</th>`).join('')}</tr></thead><tbody id="rows">${rows.map(r=>`<tr>${keys.map(k=>`<td>${esc(r[k])}</td>`).join('')}</tr>`).join('')}</tbody></table><h2>Calculated results</h2><pre>${esc(JSON.stringify(summary,null,2))}</pre><script>const rows=[...document.querySelectorAll('#rows tr')];function filter(){let count=0;const q=document.querySelector('#filter').value.toLowerCase();for(const row of rows){row.hidden=!row.textContent.toLowerCase().includes(q);if(!row.hidden)count++}document.querySelector('#count').textContent=count+' records'}document.querySelector('#filter').addEventListener('input',filter);filter();</script></body></html>`;
}
export function boxStl({width=30,height=20,depth=10}={}){
 for(const n of [width,height,depth])if(!Number.isFinite(n)||n<=0||n>10000)throw Error('CAD dimensions must be between 0 and 10,000 mm.');
 const v=[[0,0,0],[width,0,0],[width,height,0],[0,height,0],[0,0,depth],[width,0,depth],[width,height,depth],[0,height,depth]];
 const f=[[0,2,1],[0,3,2],[4,5,6],[4,6,7],[0,1,5],[0,5,4],[1,2,6],[1,6,5],[2,3,7],[2,7,6],[3,0,4],[3,4,7]];
 return 'solid power_chords\n'+f.map(face=>'facet normal 0 0 0\nouter loop\n'+face.map(i=>'vertex '+v[i].join(' ')).join('\n')+'\nendloop\nendfacet').join('\n')+'\nendsolid power_chords\n';
}
export function invoiceModel(input){
 const items=input.items||[];if(!items.length||items.length>100)throw Error('An invoice needs 1–100 line items.');
 const money=n=>Math.round(n*100)/100;
 for(const row of items)if(!Number.isFinite(row.quantity)||!Number.isFinite(row.unit_price)||row.quantity<=0||row.unit_price<0)throw Error('Invoice quantities and prices must be valid positive numbers.');
 const subtotal=money(items.reduce((n,r)=>n+money(r.quantity*r.unit_price),0));
 const taxRate=input.tax_rate??0;if(!Number.isFinite(taxRate)||taxRate<0||taxRate>1)throw Error('Tax rate must be a fraction between 0 and 1.');
 const tax=money(subtotal*taxRate);let state='draft';const trace=[];const transitions={draft:{issue:'issued'},issued:{pay:'paid',void:'void'},paid:{refund:'refunded'}};
 for(const event of input.events||['issue']){const next=transitions[state]?.[event];if(!next)throw Error(`Invalid invoice transition: ${state} → ${event}`);trace.push({from:state,event,to:next});state=next;}
 return {number:input.number||'PC-001',currency:input.currency||'USD',customer:input.customer||'Customer',items,subtotal,tax_rate:taxRate,tax,total:money(subtotal+tax),state,trace,tax_basis:'Operator-supplied rate; no tax determination or external payment performed.'};
}
export function invoiceHtml(invoice){return dashboardHtml({title:`Invoice ${invoice.number} · ${invoice.customer}`,rows:invoice.items.map(i=>({...i,total:Math.round(i.quantity*i.unit_price*100)/100})),summary:invoice});}
