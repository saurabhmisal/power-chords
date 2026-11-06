import policy from '../data/source-policy.json' with {type:'json'};
const included=new Set(policy.sources.filter(source=>source.decision==='included').map(source=>source.repository.toLowerCase()));
export const sourceAllowed=repository=>included.has(repository.toLowerCase());
