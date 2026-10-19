import { DatabaseSync } from 'node:sqlite';
import { mkdirSync } from 'node:fs';
import { dirname } from 'node:path';
import { GROUPS, FORKS } from './catalog.mjs';

export class PowersDB {
  constructor(filename = ':memory:') {
    if (filename !== ':memory:') mkdirSync(dirname(filename), {recursive:true, mode:0o700});
    this.db = new DatabaseSync(filename);
    this.db.exec('PRAGMA foreign_keys=ON; PRAGMA journal_mode=WAL;');
    this.db.exec(`
      CREATE TABLE IF NOT EXISTS groups (id TEXT PRIMARY KEY, label TEXT NOT NULL);
      CREATE TABLE IF NOT EXISTS sources (
        id TEXT PRIMARY KEY, name TEXT NOT NULL, repository TEXT UNIQUE NOT NULL,
        url TEXT NOT NULL, group_id TEXT NOT NULL REFERENCES groups(id),
        created_at TEXT, description TEXT, license TEXT, origin TEXT NOT NULL,
        kind TEXT NOT NULL DEFAULT 'unverified', status TEXT NOT NULL DEFAULT 'discovered',
        head_sha TEXT, default_branch TEXT, upstream TEXT, inspected_at TEXT,
        inspection_json TEXT
      );
      CREATE TABLE IF NOT EXISTS packages (
        id TEXT PRIMARY KEY, source_id TEXT NOT NULL REFERENCES sources(id),
        title TEXT NOT NULL, kind TEXT NOT NULL, path TEXT,
        pinned_sha TEXT NOT NULL, installed_path TEXT, installed_at TEXT,
        state TEXT NOT NULL, permissions_json TEXT NOT NULL DEFAULT '[]',
        dependencies_json TEXT NOT NULL DEFAULT '[]',
        UNIQUE(source_id,path,pinned_sha)
      );
      CREATE TABLE IF NOT EXISTS user_settings (
        user_id TEXT NOT NULL, package_id TEXT NOT NULL REFERENCES packages(id),
        enabled INTEGER NOT NULL DEFAULT 0, permissions_json TEXT NOT NULL DEFAULT '[]',
        updated_at TEXT NOT NULL, PRIMARY KEY(user_id,package_id)
      );
      CREATE TABLE IF NOT EXISTS group_settings (
        user_id TEXT NOT NULL, group_id TEXT NOT NULL REFERENCES groups(id),
        enabled INTEGER NOT NULL DEFAULT 1, updated_at TEXT NOT NULL,
        PRIMARY KEY(user_id,group_id)
      );
      CREATE TABLE IF NOT EXISTS audit (
        id INTEGER PRIMARY KEY AUTOINCREMENT, at TEXT NOT NULL, user_id TEXT,
        action TEXT NOT NULL, subject TEXT, details_json TEXT NOT NULL
      );
    `);
    this.seed();
  }
  seed() {
    const group = this.db.prepare('INSERT OR IGNORE INTO groups (id,label) VALUES (?,?)');
    const source = this.db.prepare(`INSERT OR IGNORE INTO sources
      (id,name,repository,url,group_id,created_at,description,license,origin,kind,status)
      VALUES (?,?,?,?,?,?,?,?,?,?,?)`);
    this.db.exec('BEGIN');
    try {
      for (const x of GROUPS) group.run(x.id,x.label);
      for (const x of FORKS) source.run(x.id,x.name,x.repository,x.url,x.group_id,x.created_at,x.description,x.license,x.origin,x.kind,x.status);
      this.db.exec('COMMIT');
    } catch (error) { this.db.exec('ROLLBACK'); throw error; }
  }
  allSources(userId='local') {
    return this.db.prepare(`SELECT s.*,g.label AS group_label,
      (SELECT COUNT(*) FROM packages p WHERE p.source_id=s.id) AS package_count,
      (SELECT COUNT(*) FROM packages p JOIN user_settings u ON u.package_id=p.id
       WHERE p.source_id=s.id AND u.user_id=? AND u.enabled=1) AS enabled_packages
      FROM sources s JOIN groups g ON s.group_id=g.id ORDER BY s.name COLLATE NOCASE`).all(userId);
  }
  getSource(id){return this.db.prepare('SELECT * FROM sources WHERE id=?').get(id);}
  registerSource({repository,name,description='',url,created_at=null,license='UNKNOWN'}){
    if(!/^[-\w.]+\/[-\w.]+$/.test(repository))throw new Error('Invalid repository');
    const id='github:'+repository;
    this.db.prepare(`INSERT OR IGNORE INTO sources (id,name,repository,url,group_id,created_at,description,license,origin,kind,status)
      VALUES (?,?,?,?,?,?,?,?,?,?,?)`).run(id,name,repository,url,'unclassified',created_at,description,license,'github-sync','unverified','discovered');
    return this.getSource(id);
  }
  groupState(userId){const rows=this.db.prepare('SELECT group_id,enabled FROM group_settings WHERE user_id=?').all(userId); return Object.fromEntries(rows.map(r=>[r.group_id,!!r.enabled]));}
  setGroup(userId, groupId, enabled){
    if(!GROUPS.some(x=>x.id===groupId))throw new Error('Unknown power group');
    this.db.prepare(`INSERT INTO group_settings (user_id,group_id,enabled,updated_at) VALUES (?,?,?,?)
      ON CONFLICT(user_id,group_id) DO UPDATE SET enabled=excluded.enabled,updated_at=excluded.updated_at`)
      .run(userId,groupId,enabled?1:0,new Date().toISOString());
    this.audit(userId,'group.toggle',groupId,{enabled});
  }
  updateSource(id, patch){
    const fields=['kind','status','license','head_sha','default_branch','upstream','inspected_at','inspection_json'];
    const entries=Object.entries(patch).filter(([k])=>fields.includes(k));
    if(!entries.length)return;
    const expr=entries.map(([k])=>`${k}=?`).join(',');
    const stmt=this.db.prepare(`UPDATE sources SET ${expr} WHERE id=?`);
    stmt.run(...entries.map(([,v])=>v),id);
  }
  putPackage(p) {
    this.db.prepare(`INSERT INTO packages (id,source_id,title,kind,path,pinned_sha,state,permissions_json,dependencies_json)
      VALUES (?,?,?,?,?,?,?,?,?) ON CONFLICT(id) DO UPDATE SET
      title=excluded.title,kind=excluded.kind,state=CASE WHEN packages.state='installed' THEN 'installed' ELSE excluded.state END`)
      .run(p.id,p.source_id,p.title,p.kind,p.path||null,p.pinned_sha,p.state||'inspectable',JSON.stringify(p.permissions||[]),JSON.stringify(p.dependencies||[]));
  }
  packages(userId='local'){
    const rows=this.db.prepare(`SELECT p.*,s.name AS source_name,s.url,s.license,s.group_id,s.description,s.status AS source_status,
      COALESCE(u.enabled,0) AS enabled,COALESCE(u.permissions_json,'[]') AS granted_json,
      COALESCE(gs.enabled,1) AS group_enabled
      FROM packages p JOIN sources s ON s.id=p.source_id
      LEFT JOIN user_settings u ON u.package_id=p.id AND u.user_id=?
      LEFT JOIN group_settings gs ON gs.group_id=s.group_id AND gs.user_id=?
      ORDER BY s.name,p.title`).all(userId,userId);
    return rows.map(x=>({...x,enabled:!!x.enabled,group_enabled:!!x.group_enabled,
      permissions:JSON.parse(x.permissions_json),granted:JSON.parse(x.granted_json),
      effective_enabled:!!x.enabled&&!!x.group_enabled&&x.state==='installed'}));
  }
  getPackage(id,userId='local'){return this.packages(userId).find(x=>x.id===id);}
  installPackage(id, path){this.db.prepare("UPDATE packages SET state='installed',installed_path=?,installed_at=? WHERE id=?")
    .run(path,new Date().toISOString(),id);}
  setEnabled(userId, id, enabled,granted=[]){
    const pkg=this.getPackage(id,userId);
    if(!pkg)throw new Error('Unknown package');
    if(enabled && pkg.state!=='installed') throw new Error('Package must be installed before enabling');
    if(enabled && !pkg.permissions.every(p=>granted.includes(p)))throw new Error('Required permissions not granted');
    this.db.prepare(`INSERT INTO user_settings (user_id,package_id,enabled,permissions_json,updated_at)
      VALUES (?,?,?,?,?) ON CONFLICT(user_id,package_id) DO UPDATE SET
      enabled=excluded.enabled,permissions_json=excluded.permissions_json,updated_at=excluded.updated_at`)
      .run(userId,id,enabled?1:0,JSON.stringify(enabled?granted:[]),new Date().toISOString());
    this.audit(userId,'package.toggle',id,{enabled,permissions:enabled?granted:[]});
  }
  audit(userId,action,subject,details={}){
    this.db.prepare('INSERT INTO audit(at,user_id,action,subject,details_json) VALUES(?,?,?,?,?)')
      .run(new Date().toISOString(),userId,action,subject,JSON.stringify(details));
  }
  history(userId,limit=50){return this.db.prepare('SELECT * FROM audit WHERE user_id IS NULL OR user_id=? ORDER BY id DESC LIMIT ?').all(userId,limit).map(x=>({...x,details:JSON.parse(x.details_json)}));}
  close(){this.db.close();}
}
