/** Power Chords universal capability-engine integration contracts.
 * Connect these interfaces through the existing Electron background service's IPC, not directly to renderer secrets.
 */
export type PowerGroup =
  | 'intelligence-memory' | 'agents-automation' | 'software-engineering'
  | 'design-creation' | 'voice-audio' | 'media-production'
  | 'research-discovery' | 'business-analytics' | 'marketing-growth'
  | 'career-professional' | 'spatial-intelligence' | 'infrastructure' | 'unclassified';
export type PowerKind = 'skill-doc' | 'reference-doc' | 'service-adapter' | 'tool-adapter';
export type PowerState = 'discovered' | 'inspected' | 'needs_review' | 'needs_adapter' |
  'inspectable' | 'installed' | 'blocked' | 'failed';
export type PowerPermission = 'read_context' | 'read_files' | 'read_web' |
  'write_files' | 'network' | 'external_write' | 'run_commands';
export interface PowerSource {
  id:string; repository:string; url:string; name:string;
  group_id:PowerGroup; license:string; created_at?:string;
  head_sha?:string; upstream?:string; default_branch?:string;
  status:PowerState; kind:string;
}
export interface PowerPackage {
  id:string;source_id:string;title:string;kind:PowerKind;
  path?:string;pinned_sha:string; state:PowerState;
  permissions:PowerPermission[]; enabled:boolean;group_enabled:boolean;effective_enabled:boolean;
}
export interface IntentMatch {
  id:string; source:string; sha:string; score:number;
  instructions:string; trust:'untrusted_external_skill_instructions';
  permissions:PowerPermission[];
}
export interface IntentResolution {
  matches:IntentMatch[]; executed:false; requires_model_broker:true;
  requires_policy_review:true; note:string;
}
/** Runtime integration contract for applications and services (not executable in v0.1). */
export interface PowerChordsAdapter {
  id:string;
  packageId:string;
  requiredPermissions:PowerPermission[];
  probe():Promise<{available:boolean;details?:string}>;
  prepare(input:unknown):Promise<{summary:string;requiredApprovals:string[]}>;
  execute(input:unknown,context:{userId:string;granted:PowerPermission[];approved:boolean}):Promise<unknown>;
  stop?():Promise<void>;
}
