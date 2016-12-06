exports.upsertBulk = function (docs, opts = {}) {
  const allDocsOpts = {
    keys: docs.map(doc => doc._id)
  }

  if (!opts.replace) {
    allDocsOpts.include_docs = true
  }

  return this.allDocs(allDocsOpts)
    .then(res => docs.map(doc => {
      const row = res.rows.find(row => row.id === doc._id)
      if (!row || row.error) {
        return doc
      }
      if (!opts.replace) {
        return Object.assign({}, row.doc, doc)
      }
      return Object.assign({}, doc, {
        _rev: row.value.rev
      })
    }))
    .then(docs => this.bulkDocs(docs))
}
