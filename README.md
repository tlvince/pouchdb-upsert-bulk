# pouchdb-upsert-bulk

[![Build Status][travis-image]][travis-url]
[![npm version][npm-image]][npm-url]
[![License][license-image]][license-url]

[travis-url]: https://travis-ci.org/tlvince/pouchdb-upsert-bulk
[travis-image]: https://img.shields.io/travis/tlvince/pouchdb-upsert-bulk.svg
[npm-url]: https://www.npmjs.com/package/pouchdb-upsert-bulk
[npm-image]: https://img.shields.io/npm/v/pouchdb-upsert-bulk.svg
[license-url]: https://opensource.org/licenses/MIT
[license-image]: https://img.shields.io/npm/l/pouchdb-upsert-bulk.svg

> Upsert bulk plugin for PouchDB

```js
db.allDocs({include_docs: true})
//=> {rows: [{doc: {_id: '1', _rev: '1', prop: 'foo', other: true}}]}

// Merge
db.upsertBulk([{_id: '1', prop: 'bar'}])
  .then(() => db.allDocs({include_docs: true}))
  //=> {rows: [{doc: {_id: '1', _rev: '2', prop: 'bar', other: true}}]}

// Replace
db.upsertBulk([{_id: '1', prop: 'bar'}], {replace: true})
  .then(() => db.allDocs({include_docs: true}))
  //=> {rows: [{doc: {_id: '1', _rev: '3', prop: 'bar'}}]}
```

**Note** only tested in Node >=6.

## Usage

```shell
npm install --save pouchdb-upsert-bulk
```

```js
import PouchDB from 'pouchdb'
import upsertBulk from 'pouchdb-upsert-bulk'

PouchDB.plugin(upsertBulk)
```

## API

### `upsertBulk(<docs> [, opts])`

Perform a bulk upsert (update or insert) operation. Inserts new docs. Merges existing docs.

* `opts.replace`: **replaces** existing docs

## Future work

* Browser support
* [pouchdb-upsert][]-like diff functions

[pouchdb-upsert]: https://github.com/pouchdb/upsert

## Author

© 2016 Tom Vincent <git@tlvince.com> (https://tlvince.com)

## License

Released under the [MIT license](http://tlvince.mit-license.org).
