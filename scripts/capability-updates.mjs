// Dated, editorial release notes. Source metadata alone is not a product feature.
const kinds={guidance:'Instructions refined',feature:'New functionality',fix:'Fix',workflow:'Workflow improved',unchanged:'Reviewed · no changes'};
export function validateCapabilityUpdates(journal,capabilities) {
  if(journal.schema_version!==1||!Array.isArray(journal.weeks)||!journal.weeks.length)throw Error('A dated capability update journal is required.');
  const ids=new Set(capabilities.map(c=>c.id)),dates=new Set();
  for(const week of journal.weeks){
    if(!/^\d{4}-\d{2}-\d{2}$/.test(week.date)||!Number.isFinite(Date.parse(week.date))||new Date(week.date).toISOString().slice(0,10)!==week.date||dates.has(week.date))throw Error('Weekly update dates must be valid and unique.');
    dates.add(week.date);
    if(typeof week.comparison!=='string'||!week.comparison.trim()||!Array.isArray(week.capabilities))throw Error('Weekly updates need a comparison baseline and capability notes.');
    const entries=new Set();
    for(const entry of week.capabilities){
      if(!ids.has(entry.id)||entries.has(entry.id)||!Object.hasOwn(kinds,entry.kind)||typeof entry.summary!=='string'||!entry.summary.trim()||entry.summary.length>260)throw Error('Weekly capability notes must have unique known IDs, an honest change type and a short summary.');
      entries.add(entry.id);
    }
  }
  const latest=[...journal.weeks].sort((a,b)=>b.date.localeCompare(a.date))[0];
  if(latest.capabilities.length!==ids.size)throw Error('The latest weekly review must cover every capability, including unchanged ones.');
}
export function capabilityUpdates(capability, journal) {
  const records = journal.weeks.flatMap(week => {
    const entry = week.capabilities.find(entry => entry.id === capability.id);
    return entry ? [{...entry, date:week.date, comparison:week.comparison}] : [];
  }).sort((a,b) => b.date.localeCompare(a.date));
  const escape=value=>String(value).replace(/[&<>"']/g,char=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
  const dateLabel=value=>new Intl.DateTimeFormat('en-GB',{day:'numeric',month:'long',year:'numeric',timeZone:'UTC'}).format(new Date(value+'T00:00:00Z'));
  if(!records.length)return '';
  const [latest,...previous]=records;
  const status=kinds[latest.kind];
  const history=previous.length?`<details class="pc-update-history"><summary>Earlier weekly reviews</summary><ol>${previous.map(note=>`<li><time datetime="${escape(note.date)}">${dateLabel(note.date)}</time><p>${escape(note.summary)}</p></li>`).join('')}</ol></details>`:'';
  return `<section id="weekly-update" class="pc-weekly-update${latest.kind==='unchanged'?' pc-weekly-unchanged':''}" aria-labelledby="weekly-update-heading"><div class="pc-update-icon" aria-hidden="true"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M8 2v4m8-4v4M3 10h18M5 4h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Z"/><path d="m8 16 3 3 5-6"/></svg></div><div class="pc-update-copy"><div class="pc-update-meta"><p class="pc-eyebrow">WEEKLY REFRESH</p><time datetime="${escape(latest.date)}">${dateLabel(latest.date)}</time><span>${status}</span></div><h2 id="weekly-update-heading">This week’s update</h2><p class="pc-update-summary">${escape(latest.summary)}</p><p class="pc-update-comparison">${escape(latest.comparison)}</p>${history}</div></section>`;
}
