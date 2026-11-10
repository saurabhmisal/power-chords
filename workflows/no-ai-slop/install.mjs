#!/usr/bin/env node
import {mkdir, copyFile, rm, lstat} from 'node:fs/promises';
import {resolve, join, dirname} from 'node:path';
import {fileURLToPath} from 'node:url';

const files = ['SKILL.md','editorial-policy.md','eval.md','cases.json','provenance.json','LICENSE.upstream.txt'];
const folders = {codex:'.agents/skills',claude:'.claude/skills',cursor:'.cursor/skills',gemini:'.gemini/skills'};
const args = process.argv.slice(2);
const options = {};
try {
  for (let i=0; i<args.length; i+=2) {
    if (!['--agent','--project','--dest'].includes(args[i]) || !args[i+1] || args[i+1].startsWith('--') || options[args[i]])
      throw new Error('Use --agent codex|claude|cursor|gemini [--project DIR], or --dest SKILLS_DIRECTORY.');
    options[args[i]] = args[i+1];
  }
  if (options['--dest'] && (options['--agent'] || options['--project'])) throw new Error('Use --dest separately from --agent and --project.');
  const agent = options['--agent'] || 'codex';
  if (!options['--dest'] && !folders[agent]) throw new Error('Unsupported agent. Use --dest for another host.');
  const dest = options['--dest'] ? resolve(options['--dest']) : resolve(options['--project'] || process.cwd(), folders[agent]);
  const target = join(dest, 'power-chords-no-ai-slop');
  const source = dirname(fileURLToPath(import.meta.url));
  // Never overwrite an existing skill or follow a target symlink.
  try {await lstat(target); throw new Error('Skill already exists. Review or remove that installation explicitly before replacing it.');}
  catch (error) {if (error.code !== 'ENOENT') throw error;}
  await mkdir(dest, {recursive:true});
  await mkdir(target); // EEXIST also rejects a concurrent installation.
  try {for (const file of files) await copyFile(join(source, file), join(target, file));}
  catch (error) {await rm(target, {recursive:true, force:true}); throw error;}
  console.log(`Installed instruction files at ${target}. The host must load SKILL.md and editorial-policy.md. No model calls or external actions ran.`);
} catch (error) {
  console.error(error.message);
  process.exitCode = 1;
}
