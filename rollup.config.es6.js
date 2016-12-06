import external from 'builtin-modules'

const pkg = require('./package.json')

export default {
  entry: 'index.js',
  dest: pkg.module,
  format: 'es',
  external,
  plugins: []
}
