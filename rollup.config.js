import babel from 'rollup-plugin-babel';
import resolve from "@rollup/plugin-node-resolve";
import {version} from "./package.json";

export default {
    input: './src/index.js',
    output: {
        file: `dist/vue-visibility-track.js`,
        name: 'VueVisibilityTrack',
        format: 'umd',
        banner: `/**
 * vue-visibility-track v${version}
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
