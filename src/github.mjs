import { createHash } from 'node:crypto';

const APPROVED_LICENSES = new Set(['MIT','APACHE-2.0','CC0-1.0','BSD-2-CLAUSE','BSD-3-CLAUSE','ISC']);
const SKILL_PATH = /(^|\/)SKILL\.md$/i;
const SAFE_PERMISSIONS = new Set(['read_context','read_files','read_web','write_files','network','external_write','run_commands']);
export const isLicenseReviewed = license => Boolean(license) && APPROVED_LICENSES.has(license.toUpperCase());
export const isSkillPath = path => SKILL_PATH.test(path) && !path.split('/').some(x=>x==='..'||x==='');

export class GitHubClient {
  constructor({token=process.env.GITHUB_TOKEN,fetchImpl=globalThis.fetch}={}) {
    this.token=token;this.fetchImpl=fetchImpl;
  }
  async api(path){
    if(!/^\/(repos|users)\/[A-Za-z0-9._-]+\//.test(path))throw new Error('Disallowed GitHub API path');
    const response=await this.fetchImpl(`https://api.github.com${path}`,{
      headers:{'Accept':'application/vnd.github+json','User-Agent':'power-chords/0.2',
        ...(this.token?{'Authorization':`Bearer ${this.token}`}:{})},
      signal:AbortSignal.timeout(12000)
    });
    if(!response.ok)throw new Error(`GitHub returned ${response.status}${response.status===403?' (rate limit or permissions)':''}`);
    const body=await response.text();
    if(body.length>8_000_000)throw new Error('GitHub response too large');
    return JSON.parse(body);
  }
  async inspect(repository){
    const [owner,repo]=repository.split('/');
    if(!owner||!repo||!checkPart(owner)||!checkPart(repo))throw new Error('Invalid repository');
    const base=`/repos/${owner}/${repo}`;
    const metadata=await this.api(base);
    if(!metadata.fork)throw new Error('Source is not a fork');
    const branch=metadata.default_branch||'main';
    const branchInfo=await this.api(`${base}/branches/${encodeURIComponent(branch)}`);
    const sha=branchInfo.commit?.sha;
    if(!/^[0-9a-f]{40}$/i.test(sha||''))throw new Error('Unpinned repository commit');
    const tree=await this.api(`${base}/git/trees/${sha}?recursive=1`);
    const paths=(tree.tree||[]).filter(x=>x.type==='blob').map(x=>x.path);
    const skillPaths=paths.filter(isSkillPath);
    const license=metadata.license?.spdx_id||'UNKNOWN';
    const kind=skillPaths.length>0?'skill-bundle':paths.some(x=>/(^|\/)Dockerfile$|package\.json$|pyproject\.toml$|Cargo\.toml$/i.test(x))?'requires-adapter':'reference';
    return {
      sha,branch,license,upstream:metadata.parent?.full_name||null,
      kind, status:tree.truncated?'needs_review':'inspected',
      skillPaths:skillPaths.slice(0,250),
      referencePaths:kind==='reference' ? paths.filter(p=>/^(README|INDEX)\.md$/i.test(p)).slice(0,2) : [],
      truncated:!!tree.truncated||skillPaths.length>250,
      blockers:[...(tree.truncated?['Repository tree truncated']:[]),
        ...(!isLicenseReviewed(license)?[`License ${license} requires review`]:[])],
      size:metadata.size, has_manifest:paths.some(x=>x==='power-chords.json'),
      inspected_at:new Date().toISOString()
    };
  }
  async getFile(repository,sha,path){
    if(!isSkillPath(path))throw new Error('Unsupported file request');
    return this.getTextFile(repository,sha,path);
  }
  async getTextFile(repository,sha,path){
    if(!/^[0-9a-f]{40}$/i.test(sha)||!/^[-\w.]+(?:\/[-\w.]+)*\.md$/i.test(path)||path.split('/').some(x=>x==='..'))throw new Error('Unsupported file request');
    const [owner,repo]=repository.split('/');
    if(!checkPart(owner)||!checkPart(repo))throw new Error('Invalid repository');
    const encodedPath=path.split('/').map(encodeURIComponent).join('/');
    const data=await this.api(`/repos/${owner}/${repo}/contents/${encodedPath}?ref=${sha}`);
    if(data.type!=='file'||data.encoding!=='base64'||data.size>300000)throw new Error('Invalid or oversized skill document');
    const content=Buffer.from(data.content.replace(/\s/g,''),'base64').toString('utf8');
    if(Buffer.byteLength(content)>300000)throw new Error('Skill document exceeded allowed size');
    return content;
  }
  async listRecentForks(owner='saurabhmisal',since='2026-09-17'){
    if(!checkPart(owner)||!/\d{4}-\d{2}-\d{2}/.test(since))throw new Error('Invalid account or since date');
    const items=[];
    for(let page=1;page<=20;page++){
      const entries=await this.api(`/users/${owner}/repos?per_page=100&page=${page}&type=owner`);
      if(!Array.isArray(entries))throw new Error('Invalid GitHub API response');
      items.push(...entries.filter(x=>x.fork&&x.created_at?.slice(0,10)>=since));
      if(entries.length<100)break;
    }
    return items;
  }
}
function checkPart(s){return /^[A-Za-z0-9_.-]+$/.test(s||'') && s!=='.' && s!=='..';}
export function validatePermissions(values){
  if(!Array.isArray(values)||values.length>12||!values.every(v=>typeof v==='string'&&SAFE_PERMISSIONS.has(v)))throw new Error('Invalid permission grants');
  return [...new Set(values)];
}
export function safeSlug(value){return value.replace(/[^A-Za-z0-9_-]/g,'_').slice(0,70)+'_'+createHash('sha256').update(value).digest('hex').slice(0,12);}
