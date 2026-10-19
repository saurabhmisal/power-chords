import { mkdir,writeFile,readFile } from 'node:fs/promises';
import { resolve,join } from 'node:path';
import { GitHubClient, isLicenseReviewed,safeSlug,validatePermissions } from './github.mjs';
import { GROUPS } from './catalog.mjs';

export class PowersEngine {
  constructor({db,github=new GitHubClient(),storageDir='./.power-chords',userId='local'}={}){
    if(!db)throw new Error('Database required');
    this.db=db;this.github=github;this.storageDir=resolve(storageDir);this.userId=userId;
  }
  summary(){
    const sources=this.db.allSources(this.userId),packs=this.db.packages(this.userId);
    return {sources:sources.length,inspected:sources.filter(s=>s.inspected_at).length,
      installed:packs.filter(p=>p.state==='installed').length,
      enabled:packs.filter(p=>p.effective_enabled).length,
      groups:GROUPS.length,mode:'local-first',remote_execution:false};
  }
  list(){return {summary:this.summary(),groups:GROUPS.map(g=>({...g,enabled:this.db.groupState(this.userId)[g.id]!==false})),
    sources:this.db.allSources(this.userId).map(({inspection_json,...source})=>({
      ...source,inspection:inspection_json?JSON.parse(inspection_json):null
    })),packages:this.db.packages(this.userId)};}
  async syncForks({owner='saurabhmisal',since=new Date(Date.now()-30*86400000).toISOString().slice(0,10)}={}){
    if(owner!=='saurabhmisal')throw new Error('Only connected owner is supported');
    const forks=await this.github.listRecentForks(owner,since);
    for(const f of forks){
      if(!f.fork||!f.full_name?.startsWith(owner+'/'))continue;
      this.db.registerSource({repository:f.full_name,name:f.name,url:f.html_url,description:f.description||'',
        created_at:f.created_at?.slice(0,10),license:f.license?.spdx_id||'UNKNOWN'});
    }
    this.db.audit(this.userId,'sources.sync',null,{owner,since,found:forks.length});
    return {found:forks.length,total:this.db.allSources(this.userId).length};
  }
  async inspect(sourceId){
    const source=this.db.getSource(sourceId);
    if(!source)throw new Error('Unknown source');
    const info=await this.github.inspect(source.repository);
    this.db.updateSource(sourceId,{kind:info.kind,status:info.status,license:info.license,head_sha:info.sha,
      default_branch:info.branch,upstream:info.upstream,inspected_at:info.inspected_at,inspection_json:JSON.stringify(info)});
    const paths=info.skillPaths;
    if(paths.length){
      for(const path of paths){
        const id=`${sourceId}#${path}@${info.sha}`;
        this.db.putPackage({id,source_id:sourceId,title:path==='SKILL.md'?source.name:path.replace(/\/SKILL\.md$/i,'').split('/').at(-1),
          kind:'skill-doc',path,pinned_sha:info.sha,state:info.truncated?'needs_review':'inspectable'});
      }
    } else if(info.kind==='reference' && info.referencePaths?.length){
      for(const path of info.referencePaths){
        this.db.putPackage({id:`${sourceId}#${path}@${info.sha}`,source_id:sourceId,title:source.name,
          kind:'reference-doc',path,pinned_sha:info.sha,state:info.truncated?'needs_review':'inspectable'});
      }
    } else {
      this.db.putPackage({id:`${sourceId}#adapter@${info.sha}`,source_id:sourceId,title:source.name,
        kind:info.kind==='reference'?'reference':'service-adapter',path:null,pinned_sha:info.sha,
        state:'needs_adapter'});
    }
    this.db.audit(this.userId,'source.inspect',sourceId,{kind:info.kind,skills:paths.length,sha:info.sha,blockers:info.blockers});
    return info;
  }
  async install(packageId){
    const pkg=this.db.getPackage(packageId,this.userId);
    if(!pkg)throw new Error('Unknown package');
    if(!['skill-doc','reference-doc'].includes(pkg.kind))throw new Error('This repository requires a reviewed Power Chords adapter before installation');
    if(pkg.state==='needs_review')throw new Error('Repository inspection incomplete; manual review required');
    if(!isLicenseReviewed(pkg.license))throw new Error(`License ${pkg.license} needs review before installation`);
    if(pkg.state==='installed')return pkg;
    if(pkg.state!=='inspectable')throw new Error('Package must be inspected before installation');
    const source=this.db.getSource(pkg.source_id);
    if(source.head_sha!==pkg.pinned_sha)throw new Error('Pinned revision no longer matches inspected source; re-inspect');
    const content=pkg.kind==='skill-doc'?await this.github.getFile(source.repository,pkg.pinned_sha,pkg.path):
      await this.github.getTextFile(source.repository,pkg.pinned_sha,pkg.path);
    if(pkg.kind==='skill-doc'&&!/^---\s*[\s\S]{0,5000}?---|^#\s+/m.test(content))throw new Error('Skill document missing recognizable structure');
    const rel=join(safeSlug(source.repository),pkg.pinned_sha,safeSlug(pkg.path));
    const root=resolve(this.storageDir,'installed');
    const target=resolve(root,rel,pkg.kind==='skill-doc'?'SKILL.md':'README.md');
    if(!target.startsWith(root+'/'))throw new Error('Unsafe installation destination');
    await mkdir(resolve(target,'..'),{recursive:true,mode:0o700});
    await writeFile(target,content,{flag:'w',mode:0o600});
    this.db.installPackage(pkg.id,target);
    this.db.audit(this.userId,'package.install',pkg.id,{sha:pkg.pinned_sha,kind:pkg.kind});
    return this.db.getPackage(pkg.id,this.userId);
  }
  togglePackage(id,enabled,permissions=[]){
    this.db.setEnabled(this.userId,id,Boolean(enabled),validatePermissions(permissions));
    return this.db.getPackage(id,this.userId);
  }
  toggleGroup(groupId,enabled){this.db.setGroup(this.userId,groupId,Boolean(enabled));return this.db.groupState(this.userId);}
  async resolveIntent(intent,{max=4}={}){
    if(typeof intent!=='string'||intent.length<3||intent.length>4000)throw new Error('Intent length must be 3–4000 characters');
    const words=new Set(intent.toLowerCase().match(/[a-z0-9]{3,}/g)||[]);
    const candidates=this.db.packages(this.userId).filter(p=>p.effective_enabled).map(pkg=>{
      const hay=[pkg.title,pkg.description,pkg.source_name,pkg.group_id].join(' ').toLowerCase();
      let score=0;for(const word of words)if(hay.includes(word))score+=word.length>5?2:1;
      return {...pkg,score};
    }).filter(x=>x.score>0).sort((a,b)=>b.score-a.score).slice(0,Math.min(8,Math.max(1,max)));
    const matches=[];
    for(const p of candidates){
      if(!['skill-doc','reference-doc'].includes(p.kind)||!p.installed_path)continue;
      const text=await readFile(p.installed_path,'utf8');
      if(!this.db.getPackage(p.id,this.userId)?.effective_enabled)continue; // honor concurrent revocation
      matches.push({id:p.id,source:p.url,sha:p.pinned_sha,score:p.score,
        // Retrieved skill instructions are UNTRUSTED reference material, not system policy or tool permission grants.
        instructions:text.slice(0,15000),trust:'untrusted_external_skill_instructions',
        permissions:p.granted});
    }
    this.db.audit(this.userId,'intent.resolve',null,{matched:matches.map(x=>x.id),intent_length:intent.length});
    return {matches,executed:false,requires_model_broker:true,requires_policy_review:true,
      note:'Composition requires a host application with context and permission-policy validation. No tools or external actions were executed.'};
  }
  audit(limit=50){return this.db.history(this.userId,limit);}
}
