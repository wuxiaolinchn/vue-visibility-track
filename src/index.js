import VueVisibilityTrack from './directive';

VueVisibilityTrack.install = function(Vue, options) {
    if (options) {
        VueVisibilityTrack.setDefaults(options);
    }
    Vue.directive('visibility-track', VueVisibilityTrack);
};

export default VueVisibilityTrack;
