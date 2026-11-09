import {readFile,writeFile,mkdir,copyFile,readdir,rm} from 'node:fs/promises';
import {join,resolve} from 'node:path';
import {icon,familyIcons} from './icons.mjs';
import {buildCapabilityPages,statusLabel} from './capability-pages.mjs';
import {createHash} from 'node:crypto';

const root=resolve(import.meta.dirname,'..');
const escape=value=>String(value).replace(/[&<>"']/g,char=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
const featured=['customer-problem-discovery','prd-and-specification-writing','opportunity-sizing-and-prioritization','hypothesis-and-experiment-design','api-design-and-integration-planning','launch-and-channel-planning'];
const featuredIcons=['search','document','layers','target','plug','rocket'];

export async function buildLanding(destination,{hosted=false}={}){
  const {capabilities}=JSON.parse(await readFile(join(root,'data/capability-guides.json'),'utf8'));
  const directory=resolve(destination);
  await mkdir(join(directory,'assets'),{recursive:true});
  await mkdir(join(directory,'downloads'),{recursive:true});
  await mkdir(join(directory,'assets/fonts'),{recursive:true});
  for(const font of ['commissioner-cyrillic-ext.woff2', 'commissioner-cyrillic.woff2', 'commissioner-greek.woff2', 'commissioner-vietnamese.woff2', 'commissioner-latin-ext.woff2', 'commissioner-latin.woff2', 'Commissioner-OFL.txt'])await copyFile(join(root,'assets/fonts',font),join(directory,'assets/fonts',font));
  const styles={};
  for(const filename of ['landing.css','capabilities.css']){
    const css=await readFile(join(root,'landing',filename),'utf8');
    styles[filename]=filename.replace('.css',`-${createHash('sha256').update(css).digest('hex').slice(0,12)}.css`);
    await writeFile(join(directory,styles[filename]),css);
  }
  function card(item){
    const index=featured.indexOf(item.slug);
    return `<article class="capability-card" data-family="${escape(item.family)}" data-keywords="${escape(item.function_name+' '+item.inputs.join(' ')+' '+item.outputs.join(' '))}"><span class="pc-icon">${icon(index>=0?featuredIcons[index]:familyIcons[item.family]||'grid')}</span><p class="pc-core">${escape(item.family)}</p><h3>${escape(item.name)}</h3><p>${escape(item.outcome)}.</p><span class="pc-badge ${item.implementation==='adapter_required'?'pc-badge-tool':''}">${statusLabel(item)}</span><div class="pc-card-actions"><a href="capabilities/${item.slug}/index.html" aria-label="Explore ${escape(item.name)}">See workflow →</a><a href="workspace.html?capability=${escape(item.slug)}" aria-label="Run ${escape(item.name)}">Run with Codex ↗</a><a class="pc-portable-link" href="#pc-setup" data-install="${escape(item.slug)}" aria-label="Install ${escape(item.name)}">Agent setup</a></div></article>`;
  }
  const replacements={
    CAPABILITY_CARDS:[...featured.map(slug=>capabilities.find(item=>item.slug===slug)),...capabilities.filter(item=>!featured.includes(item.slug))].map(card).join('\n'),
    FAMILY_OPTIONS:[...new Set(capabilities.map(item=>item.family))].map(family=>`<option value="${escape(family)}">${escape(family)}</option>`).join(''),
    HOW_CONTEXT_ICON:icon('document'),HOW_WORK_ICON:icon('branch'),HOW_REVIEW_ICON:icon('check'),
    INSTALL_OPTIONS:capabilities.map(item=>`<option value="${escape(item.slug)}"${item.slug==='prd-and-specification-writing'?' selected':''}>${escape(item.name)}</option>`).join(''),
    WORKROOM_URL:hosted?'workroom.html':'https://github.com/saurabhmisal/power-chords#readme',
    WORKROOM_LABEL:hosted?'Open the Workroom':'Read about the Workroom'
  };
  const template=await readFile(join(root,'landing/template.html'),'utf8');
  const browserScript=await readFile(join(root,'landing/landing.js'),'utf8');
  const scriptName=`landing-${createHash('sha256').update(browserScript).digest('hex').slice(0,12)}.js`;
  for(const filename of await readdir(directory))if(/^(?:landing|capability)-[a-f0-9]{12}\.js$/.test(filename)&&filename!==scriptName)await rm(join(directory,filename));
  await writeFile(join(directory,scriptName),browserScript);
  const coverScript=await readFile(join(root,'landing/cover-motion.js'),'utf8');
  const coverName=`cover-motion-${createHash('sha256').update(coverScript).digest('hex').slice(0,12)}.js`;
  for(const filename of await readdir(directory))if(/^cover-motion-[a-f0-9]{12}\.js$/.test(filename)&&filename!==coverName)await rm(join(directory,filename));
  await writeFile(join(directory,coverName),coverScript);
  let html=template.replace(/\{\{([A-Z_]+)\}\}/g,(_,key)=>replacements[key]).replace('src="landing.js"',`src="${scriptName}"`).replace('src="cover-motion.js"',`src="${coverName}"`);
  for(const [filename,versioned] of Object.entries(styles))html=html.replace(`href="${filename}"`,`href="${versioned}"`);
  await writeFile(join(directory,'index.html'),html);
  for(const filename of ['brand-theme.css','brand-type.css','landing.css','theme.css','capabilities.css','landing.js','analytics.js'])await copyFile(join(root,'landing',filename),join(directory,filename));
  let workspace=await readFile(join(root,'landing/workspace.html'),'utf8');
  const workspaceAssets={};
  for(const filename of ['workspace.css','workspace.js']){
    const content=await readFile(join(root,'landing',filename),'utf8');
    const versioned=filename.replace(/\.(css|js)$/,(_,ext)=>`-${createHash('sha256').update(content).digest('hex').slice(0,12)}.${ext}`);
    await writeFile(join(directory,versioned),content);
    workspaceAssets[filename]=versioned;
    workspace=workspace.replace(filename,versioned);
  }
  await writeFile(join(directory,'workspace.html'),workspace);
  const verificationScript=await readFile(join(root,'landing/verification.js'),'utf8');
  const verificationName=`verification-${createHash('sha256').update(verificationScript).digest('hex').slice(0,12)}.js`;
  await writeFile(join(directory,verificationName),verificationScript);
  const verification=await readFile(join(root,'landing/verification.html'),'utf8');
  await writeFile(join(directory,'verification.html'),verification.replace('workspace.css',workspaceAssets['workspace.css']).replace('verification.js',verificationName));
  for(const filename of ['lazo-mark.svg','power-chords-cover-clean.jpg','power-chords-loop-pc-icon.png','power-chords-loop-pc-logo.png','power-chords-favicon-32.png','power-chords-favicon-16.png','power-chords-apple-touch-icon.png'])await copyFile(join(root,'assets',filename),join(directory,'assets',filename));
  for(const item of capabilities){
    const instructions=await readFile(join(root,'capabilities',item.slug,'SKILL.md'),'utf8');
    const standalone=instructions.replace('[README.md](README.md)',`[complete capability guide](https://powerchords.lazo.tools/capabilities/${item.slug}/)`);
    await writeFile(join(directory,'downloads',item.slug+'.md'),standalone);
  }
  await copyFile(join(root,'docs/PORTABLE_AGENT_GUIDE.md'),join(directory,'downloads/power-chords-agent-guide.md'));
  await buildCapabilityPages(root,directory,capabilities,styles);
  // Fingerprint consent assets so a cached pre-consent tag can never survive a new page release.
  const familyAssets = {};
  for (const filename of ['analytics.js', 'brand-theme.css', 'brand-type.css']) {
    const content = await readFile(join(root,'landing',filename),'utf8');
    const versioned = filename.replace(/\.(js|css)$/,(_,ext)=>`-${createHash('sha256').update(content).digest('hex').slice(0,12)}.${ext}`);
    familyAssets[filename] = versioned;
    await writeFile(join(directory,versioned),content);
  }
  async function updatePages(folder) {
    for (const entry of await readdir(folder,{withFileTypes:true})) {
      const file = join(folder,entry.name);
      if (entry.isDirectory()) await updatePages(file);
      else if (entry.name.endsWith('.html')) {
        let page = await readFile(file,'utf8');
        for (const [filename,versioned] of Object.entries(familyAssets)) page = page.replaceAll(filename,versioned);
        await writeFile(file,page);
      }
    }
  }
  await updatePages(directory);
}
