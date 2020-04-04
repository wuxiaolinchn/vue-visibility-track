import VueVisibleTrack from './directive';

VueVisibleTrack.install = function(Vue, options) {
    if (options) {
        VueVisibleTrack.setDefaults(options);
    }
    Vue.directive('visible-track', VueVisibleTrack);
};

if (typeof window !== 'undefined' && window.Vue) {
    window.VueVisibleTrack = VueVisibleTrack;
}

export default VueVisibleTrack;
