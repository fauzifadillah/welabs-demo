import vue from 'rollup-plugin-vue'
import alias from 'rollup-plugin-alias'
import peerDepsExternal from 'rollup-plugin-peer-deps-external'
import buble from 'rollup-plugin-buble'
import commonjs from 'rollup-plugin-commonjs'
import css from 'rollup-plugin-css-only'

const plugins = [
  peerDepsExternal(),
  alias({
    resolve: ['.js', '.vue'],
    '~': __dirname + '/src'
  }),
  commonjs(),
  css({ 
    output: 'dist/fmv-highlight.css' 
  }),
  vue({
    css: false,
    style: {
      preprocessOptions: {
        scss: {
          includePaths: ['node_modules']
        }
      }
    }
  }),
  buble({
    objectAssign: 'Object.assign'
  })
]

export default [
  {
    input: 'src/index.js',
    output: {
      format: 'esm',
      file: 'dist/fmv-highlight.esm.js'
    },
    plugins
  },
  {
    input: 'src/index.js',
    output: {
      format: 'umd',
      name: 'FmvHighlight',
      file: 'dist/fmv-highlight.umd.js'
    },
    plugins: plugins
  }
]
