import babel from 'rollup-plugin-babel';
import resolve from "@rollup/plugin-node-resolve";

export default {
    input: './src/index.js',
    output: {
        file: `dist/vue-visible-track.js`,
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
