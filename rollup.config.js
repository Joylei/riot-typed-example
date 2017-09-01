import buble from 'rollup-plugin-buble'
import typescript from 'rollup-plugin-typescript'
import nodeResolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'

export default {
    entry: 'app.ts',
    external:['riot'],
    plugins: [
        typescript({
            typescript: require('typescript')
        }),
        nodeResolve({esnext:true, main:true}),
        commonjs(),
        buble()
    ],
    format: 'iife',
    dest: 'bundle.js'
}