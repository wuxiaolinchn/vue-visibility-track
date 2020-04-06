# vue-visibility-track

[![Vue 2.x](https://img.shields.io/badge/Vue-2.x-brightgreen.svg)](https://vuejs.org/v2/guide/)
[![npm](https://img.shields.io/npm/v/vue-visibility-track.svg)](https://www.npmjs.com/package/vue-visibility-track)
[![npm-downloads](https://img.shields.io/npm/dm/vue-visibility-track.svg)](https://www.npmjs.com/package/vue-visibility-track)
[![license](https://img.shields.io/github/license/mashape/apistatus.svg)](https://github.com/wuxiaolinchn/vue-visibility-track/blob/master/LICENSE)

A Vue.js directive helps track elements's visibility.

## Installing

Using npm:
```bash
npm install --save vue-visibility-track
```

Using yarn:
```bash
yarn add vue-visibility-track
```

Using CDN:
```html
<script src="https://cdn.jsdelivr.net/npm/vue"></script>
<script src="https://cdn.jsdelivr.net/npm/vue-visibility-track"></script>
```

## Usage

Install the directive by `Vue.use()`, here you can define the global callback function:
```js
import Vue from "vue";
import VueVisibilityTrack from "vue-visibility-track";

Vue.use(VueVisibilityTrack, {
    callback(isVisible, value) {
        // Do something when the element's visibility is changed
        console.log(isVisible);
        console.log(value); // -> "Hello, world!"
    }
});
```

If you are using the CDN version:

```js
window.Vue.use(window.VueVisibilityTrack, {
    callback(isVisible, value) {
        // Do something when the element's visibility is changed
        console.log(isVisible);
        console.log(value); // -> "Hello, world!"
    }
});
```

Use `v-visibility-track` on an element:
```html
<div v-visibility-track="{callbackValue: 'Hello, world!', callback: yourCallbackMethodName}"></div>
```

If you want track visibility change event only ONE time, add the `once` modifier:

```html
<div v-visibility-track.once="{callbackValue: 'Hello, world!', callback: yourCallbackMethodName}"></div>
```

Handle visibility change event:
```js
new Vue({
    methods: {
        yourCallbackMethodName(isVisible, value){
            // Do something when the element's visibility is changed
            console.log(isVisible);
            console.log(value); // -> "Hello, world!"
        }
    }
});
```

## License

Licensed under the MIT License. See LICENSE in the project root for license information.
