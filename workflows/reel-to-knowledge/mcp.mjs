#!/usr/bin/env node
// Zero-dependency MCP stdio adapter: newline-delimited JSON-RPC 2.0; no logging to stdout.
import { createInterface } from 'node:readline';
import { KnowledgeBase } from './core.mjs';
const kb=new KnowledgeBase();
const schema={type:'object',additionalProperties:false,properties:{}};
const tools=[
 {name:'reel_to_knowledge',description:'Convert an authorized short video or accessible Reel/Short into a cited, timestamped Markdown knowledge note. Requires local ffmpeg and captions or local speech recognition.',inputSchema:{type:'object',properties:{source:{type:'string',description:'Local video path or permitted public Reel/Short URL'},transcript:{type:'string',description:'Optional local SRT/VTT/JSON/TXT path'},title:{type:'string'},ocr:{type:'boolean'},stt:{type:'string',enum:['auto','none']},model:{type:'string',enum:['tiny','base','small','medium','large-v3']},exportDir:{type:'string',description:'Existing user-authorized local output directory'}},required:['source']}},
 {name:'search_reel_knowledge',description:'Search extracted captions and on-screen text stored in the local knowledge base.',inputSchema:{type:'object',properties:{query:{type:'string'},limit:{type:'integer',minimum:1,maximum:50}},required:['query']}},
 {name:'list_reel_knowledge',description:'List locally stored knowledge notes.',inputSchema:schema},
 {name:'read_reel_knowledge',description:'Read one knowledge note by its identifier.',inputSchema:{type:'object',properties:{id:{type:'string'}},required:['id']}}
];
const aliases={reversereel_ingest:"reel_to_knowledge",reversereel_search:"search_reel_knowledge",reversereel_list:"list_reel_knowledge",reversereel_read:"read_reel_knowledge"};
for(const [name,legacy] of Object.entries(aliases)){const tool=tools.find(item=>item.name===legacy);tools.push({...tool,name,description:"ReverseReel — Turn short videos into searchable knowledge. "+tool.description});tool.description="ReverseReel legacy alias. "+tool.description;}
async function execute(name,a){name=aliases[name]||name;if(name==='reel_to_knowledge')return kb.ingest(a);if(name==='search_reel_knowledge')return kb.search(a.query,a.limit);if(name==='list_reel_knowledge')return kb.list();if(name==='read_reel_knowledge')return kb.get(a.id);throw Error(`Unknown tool: ${name}`);}
function respond(obj){process.stdout.write(JSON.stringify(obj)+'\n');}
const rl=createInterface({input:process.stdin,crlfDelay:Infinity});
for await(const line of rl){if(!line.trim())continue;let req;try{req=JSON.parse(line);if(req.jsonrpc!=='2.0'||typeof req.method!=='string')throw Error('Invalid JSON-RPC request');
 if(req.id===undefined)continue;
 let result;
 if(req.method==='initialize')result={protocolVersion:'2024-11-05',capabilities:{tools:{listChanged:false}},serverInfo:{name:'power-chords-reel-to-knowledge',version:'0.4.1'}};
 else if(req.method==='ping')result={};
 else if(req.method==='tools/list')result={tools};
 else if(req.method==='tools/call'){const a=req.params?.arguments||{};try{const value=await execute(req.params?.name,a);result={content:[{type:'text',text:JSON.stringify(value)}]};}catch(e){result={isError:true,content:[{type:'text',text:String(e.message)}]};}}
 else {respond({jsonrpc:'2.0',id:req.id,error:{code:-32601,message:'Method not found'}});continue;}
 respond({jsonrpc:'2.0',id:req.id,result});
 }catch(e){respond({jsonrpc:'2.0',id:req?.id??null,error:{code:-32600,message:String(e.message)}});}}
kb.close();
