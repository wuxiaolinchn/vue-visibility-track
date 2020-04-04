# vue-visible-track

[![Vue 2.x](https://img.shields.io/badge/Vue-2.x-brightgreen.svg)](https://vuejs.org/v2/guide/)
[![license](https://img.shields.io/github/license/mashape/apistatus.svg)](https://github.com/wuxiaolinchn/vue-visible-track/blob/master/LICENSE)

A Vue.js directive helps track visible elements.

## Installing

Using npm:
```bash
npm install --save vue-visible-track
```

Using yarn:
```bash
yarn add vue-visible-track
```

Using CDN:
```html
<script src="https://cdn.jsdelivr.net/npm/vue"></script>
<script src="https://cdn.jsdelivr.net/npm/vue-visible-track"></script>
```

## Usage

Use `v-visible-track` on an element:
```html
<div v-visible-track:modulename.each="{'key1':'value1','key2':'value2'}"></div>
```

```js
import Vue from "vue";
import VueVisibleTrack from "vue-visible-track";

Vue.use(VueVisibleTrack, {
    callback(args) {
        // Do something when the element is visible
        console.log(args.key1);
        console.log(args.key2);
    }
});
```

If you are using the CDN version:

```js
window.Vue.use(VueVisibleTrack, {
    callback(args) {
        // Do something when the element is visible
        console.log(args.key1);
        console.log(args.key2);
    }
});
```

## Options

Todo...
