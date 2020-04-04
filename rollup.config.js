import babel from 'rollup-plugin-babel';
import resolve from "@rollup/plugin-node-resolve";
import {version} from "./package.json";

export default {
    input: './src/index.js',
    output: {
        file: `dist/vue-visible-track.js`,
        name: 'VueVisibleTrack',
        format: 'umd',
        banner: `/**
 * vue-visible-track v${version}
 * Copyright (c) 2020 wuxiaolinchn@outlook.com All Rights Reserved.
 * Licensed under the MIT License. See LICENSE in the project root for license information.
 */`,
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
