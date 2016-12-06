import buble from 'rollup-plugin-buble'
import config from './rollup.config.es6.js'

const pkg = require('./package.json')

export default Object.assign(config, {
  dest: pkg.main,
  format: 'cjs',
  plugins: config.plugins.concat([
    buble()
  ])
})
