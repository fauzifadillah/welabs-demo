import vue from 'rollup-plugin-vue'
import alias from '@rollup/plugin-alias'
import resolve from '@rollup/plugin-node-resolve';
import peerDepsExternal from 'rollup-plugin-peer-deps-external'
import buble from 'rollup-plugin-buble'
import commonjs from '@rollup/plugin-commonjs'
import css from 'rollup-plugin-css-only'
import babel from '@rollup/plugin-babel'

const path = require('path')
const projectRootDir = path.resolve(__dirname)
const customResolver = resolve({
  extensions: ['.js', '.vue', '.scss']
})

const plugins = [
  peerDepsExternal(),
  alias({
    entries: [
      {
        find: '~',
        replacement: path.resolve(projectRootDir, 'src')
      }
    ],
    customResolver
  }),
  babel({
    babelHelpers: 'runtime',
    skipPreflightCheck: true
  }),
  resolve(),
  commonjs(),
  css({ 
    output: 'dist/fmv-charts.css' 
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
      file: 'dist/fmv-charts.esm.js'
    },
    plugins,
    external: [/@babel\/runtime/]
  },
  {
    input: 'src/index.js',
    output: {
      format: 'umd',
      name: 'FmvCharts',
      file: 'dist/fmv-charts.umd.js'
    },
    plugins: plugins,
    external: [/@babel\/runtime/]
  }
]
