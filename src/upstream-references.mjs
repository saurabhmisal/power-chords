import lock from '../data/upstreams.lock.json' with {type:'json'};

// Public metadata stays available when the owner's reference forks are made
// private. Never expose private GitHub credentials from the hosted Workroom.
const ownedToOriginal = new Map();
const valid = value => typeof value === 'string'
  && /^[A-Za-z0-9_.-]+\/[A-Za-z0-9_.-]+$/.test(value)
  && !value.split('/').some(part => part === '.' || part === '..');

for (const item of lock.sources || []) {
  if (!valid(item.repository) || !valid(item.upstream_repo)) continue;
  if (!item.repository.toLowerCase().startsWith('saurabhmisal/')) continue;
  if (item.repository.toLowerCase() === item.upstream_repo.toLowerCase()) continue;
  ownedToOriginal.set(item.repository.toLowerCase(), item.upstream_repo);
}

export function publicOriginalFor(repository) {
  if (!valid(repository)) return repository;
  return ownedToOriginal.get(repository.toLowerCase()) || repository;
}

export function isReviewedOriginal(repository) {
  return publicOriginalFor(repository) !== repository;
}
