import test from 'ava'
import PouchDB from 'pouchdb-http'

import upsertBulk from '.'

const url = process.env.COUCHDB_URL || 'http://localhost:5984/test'

test.beforeEach(t => {
  const docs = [
    {_id: 'foo', prop: 'bar', rest: true}
  ]
  return new PouchDB(url).destroy()
    .then(() => new PouchDB(url))
    .then(db => db.bulkDocs(docs))
})

const upsertTest = (docs, t, opts) => {
  PouchDB.plugin(upsertBulk)
  const db = new PouchDB(url)
  return db.upsertBulk(docs, opts)
    .then(() => db.allDocs({include_docs: true}))
    .then(res => res.rows.forEach(row => {
      const doc = docs.find(doc => doc._id === row.doc._id)
      delete row.doc._rev
      t.deepEqual(row.doc, doc)
    }))
}

test.serial('merges existing docs', t => {
  const docs = [
    {_id: 'foo', prop: 'baz', rest: true}
  ]
  return upsertTest(docs, t)
})

test.serial('replaces existing docs if asked', t => {
  const docs = [
    {_id: 'foo', prop: 'baz'}
  ]
  return upsertTest(docs, t, {replace: true})
})
