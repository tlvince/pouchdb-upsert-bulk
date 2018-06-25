import config from './rollup.config.js'

const pkg = require('./package.json')

export default Object.assign({}, config, {
  dest: pkg.module,
  format: 'es'
})
