import VueVisibleTrack from './directive'

const install = function(Vue, options) {
    if (options) {
        VueVisibleTrack.setDefaults(options);
    }
    Vue.directive('visible-track', VueVisibleTrack);
};

if (typeof window !== 'undefined' && window.Vue) {
    window.VueVisibleTrack = VueVisibleTrack;
    window.Vue.use(install);
}

VueVisibleTrack.install = install;
export default VueVisibleTrack;