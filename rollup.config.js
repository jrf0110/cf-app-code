import resolve from 'rollup-plugin-node-resolve'
import sourcemaps from 'rollup-plugin-sourcemaps'
import commonjs from 'rollup-plugin-commonjs'

export default {
  entry: 'dist/cf-app-code.js',
  dest: 'dist/cf-app-code.bundle.js',
  format: 'iife',
  sourceMap: 'inline',
  plugins: [
    sourcemaps(),
    resolve({ jsnext: true, browser: true, }),
    commonjs({
      include: ['node_modules/**'],
      sourceMap: process.env.NODE_ENV !== 'production',
      namedExports: {
        'node_modules/highlight.js/lib/index.js': [
          'initHighlightingOnLoad',
          'initHighlighting',
        ],
      },
    })
  ]
}