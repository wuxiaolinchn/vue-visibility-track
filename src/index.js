import VueVisibleTrack from './directive';

VueVisibleTrack.install = function(Vue, options) {
    if (options) {
        VueVisibleTrack.setDefaults(options);
    }
    Vue.directive('visible-track', VueVisibleTrack);
};

export default VueVisibleTrack;
