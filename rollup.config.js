import babel from 'rollup-plugin-babel';
import resolve from "@rollup/plugin-node-resolve";
import {version} from './package.json';

export default {
    input: './src/index.js',
    output: {
        file: `vue-visible-track.${version}.js`,
        name: 'VueVisibleTrack',
        format: 'umd'
    },
    plugins: [
        resolve(),
        babel({
            exclude: 'node_modules/**',
            presets: ['@babel/env'],
            plugins: ['@babel/transform-object-assign'],
        })
    ]
};
