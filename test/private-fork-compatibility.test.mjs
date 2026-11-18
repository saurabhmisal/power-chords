import test from 'node:test';
import assert from 'node:assert/strict';
import { PowersDB } from '../src/db.mjs';
import { FORKS } from '../src/catalog.mjs';
import { publicOriginalFor, isReviewedOriginal } from '../src/upstream-references.mjs';
import { GitHubClient } from '../src/github.mjs';

test('reviewed Lazo fork IDs remain stable while public URLs point to upstreams', () => {
  assert.equal(publicOriginalFor('saurabhmisal/gstack'), 'garrytan/gstack');
  assert.equal(isReviewedOriginal('saurabhmisal/gstack'), true);
  assert.equal(isReviewedOriginal('another/unknown'), false);
  const row = FORKS.find(x => x.repository === 'saurabhmisal/gstack');
  assert.equal(row.id, 'github:saurabhmisal/gstack');
  assert.equal(row.url, 'https://github.com/garrytan/gstack');
  const db = new PowersDB();
  try {
    assert.equal(db.getSource(row.id).url, row.url);
    assert.equal(db.getSource(row.id).repository, row.repository);
  } finally { db.close(); }
});

test('GitHub inspection and source reads work using public originals', async () => {
  const commit = 'a'.repeat(40);
  const seen = [];
  const response = (data) => ({
    ok: true, status: 200,
    text: async () => JSON.stringify(data)
  });
  const client = new GitHubClient({
    token: null,
    fetchImpl: async (url) => {
      seen.push(url);
      if (url.endsWith('/repos/garrytan/gstack')) return response({
        fork: false, default_branch: 'main', license: {spdx_id: 'MIT'}, size: 42
      });
      if (url.endsWith('/repos/garrytan/gstack/branches/main')) {
        return response({commit:{sha:commit}});
      }
      if (url.includes('/repos/garrytan/gstack/git/trees/')) {
        return response({tree:[{type:'blob',path:'SKILL.md'}],truncated:false});
      }
      if (url.includes('/repos/garrytan/gstack/contents/SKILL.md')) {
        return response({type:'file',encoding:'base64',size:6,content:Buffer.from('# Test').toString('base64')});
      }
      throw Error('Unexpected private or unreviewed GitHub request: '+url);
    }
  });
  const result = await client.inspect('saurabhmisal/gstack');
  assert.equal(result.sha, commit);
  assert.equal(result.upstream, 'garrytan/gstack');
  assert.deepEqual(result.skillPaths,['SKILL.md']);
  assert.equal(await client.getFile('saurabhmisal/gstack',commit,'SKILL.md'),'# Test');
  assert.ok(seen.every(url => url.startsWith('https://api.github.com/repos/garrytan/gstack')));
  assert.ok(seen.every(url => !url.includes('/saurabhmisal/gstack')));
});

test('unreviewed repository sources do not silently bypass fork validation', async () => {
  const c = new GitHubClient({
    token: null,
    fetchImpl: async () => ({ok:true,status:200,text:async()=>JSON.stringify({fork:false,default_branch:'main'})})
  });
  await assert.rejects(c.inspect('unknown-owner/not-a-fork'),/Source is not a fork/);
});
