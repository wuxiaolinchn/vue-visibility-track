import 'intersection-observer';

let observer = new IntersectionObserver((entries) => {
    if (!entries || !entries.length) {
        return;
    }
    for (let i = 0; i < entries.length; i++) {
        let track = entries[i].target._vue_visibility_track;
        track && track.handleIntersection(entries[i]);
    }
});

let genTrackId = function () {
    let rnd = Math.floor(Math.random() * 10000);
    let time = new Date().getTime();
    return `${time}_${rnd}`;
};

let trackId = genTrackId();
class Track {
    constructor(el, binding) {
        this.el = el;
        this.binding = binding;
        this.intersectionObserverEntry = null;
        this.lastIntersectionObserverEntry = null;
        this.timeoutId = 0;
        this.trackId = "";
        this.observe();
    }

    setBinding(binding) {
        this.binding = binding;
    }

    observe() {
        observer.observe(this.el);
    }

    unobserve() {
        observer.unobserve(this.el);
    }

    handleIntersection(entry) {
        clearTimeout(this.timeoutId);
        this.timeoutId = setTimeout(() => {
            this.setIntersectionObserverEntry(entry);
            if (!this.isChanged()) {
                return;
            }
            if (this.trackId === trackId
                && this.binding["modifiers"]["once"]) {
                return;
            }
            this.trackId = trackId;
            this.doDefaultCallback();
            this.doBindingCallback();
        }, 200);
    }

    setIntersectionObserverEntry(entry) {
        this.lastIntersectionObserverEntry = this.intersectionObserverEntry;
        this.intersectionObserverEntry = entry;
    }

    isChanged() {
        if (this.trackId !== trackId
            && this.intersectionObserverEntry
            && this.intersectionObserverEntry.isIntersecting) {
            return true;
        }

        return this.lastIntersectionObserverEntry
            && this.intersectionObserverEntry
            && this.lastIntersectionObserverEntry.isIntersecting !== this.intersectionObserverEntry.isIntersecting;
    }

    doDefaultCallback() {
        if (typeof defaults["callback"] === "function") {
            defaults["callback"](this.intersectionObserverEntry.isIntersecting, this.getCallbackValue());
        }
    }

    doBindingCallback() {
        let callback = this.getCallback();
        if (typeof callback === "function") {
            callback(this.intersectionObserverEntry.isIntersecting, this.getCallbackValue());
        }
    }

    getCallback() {
        return this.binding["value"] && this.binding["value"]["callback"] || null;
    }

    getCallbackValue() {
        return this.binding["value"] && this.binding["value"]["callbackValue"] || null;
    }
}

let defaults = {};
export default {
    bind(el, binding) {
        el._vue_visibility_track = new Track(el, binding);
    },

    update(el, binding) {
        if (el._vue_visibility_track) {
            el._vue_visibility_track.setBinding(binding);
        } else {
            this.bind(el, binding);
        }
    },

    unbind(el) {
        if (el._vue_visibility_track) {
            el._vue_visibility_track.unobserve();
            delete el._vue_visibility_track;
        }
    },

    setDefaults(options) {
        defaults = Object.assign({}, defaults, options);
    },

    reset() {
        trackId = genTrackId();
        let entries = observer.takeRecords();
        if (entries && entries.length) {
            for (let i = 0; i < entries.length; i++) {
                let entry = entries[i];
                if (entry && entry.target) {
                    observer.unobserve(entry.target);
                    observer.observe(entry.target);
                }
            }
        }
    }
};
