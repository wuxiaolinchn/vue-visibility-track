import 'intersection-observer';

const observer = new IntersectionObserver((entries) => {
    if (!entries || !entries.length) {
        return;
    }

    for (let i = 0; i < entries.length; i++) {
        let entry = entries[i];
        if (entry.isIntersecting) {
            let track = entry.target._vue_visible_track;
            track && track.handleIntersecting();
        }
    }
});

class Track {
    constructor(el, binding) {
        this.el = el;
        this.binding = binding;
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

    handleIntersecting() {
        this.doDefaultCallback();
        this.doBindingCallback();
    }

    doDefaultCallback() {
        if (typeof defaults["callback"] === "function") {
            defaults["callback"](this.binding["value"]);
        }
    }

    doBindingCallback() {
        let value = this.binding["value"];
        if (!value
            || !value["callback"]
            || typeof value["callback"] !== "function") {
            return;
        }
        value["callback"](value);
    }
}

let defaults = {};
export default {
    bind(el, binding) {
        el._vue_visible_track = new Track(el, binding);
    },

    update(el, binding) {
        if (el._vue_visible_track) {
            el._vue_visible_track.setBinding(binding);
        } else {
            this.bind(el, binding);
        }
    },

    unbind(el) {
        if (el._vue_visible_track) {
            el._vue_visible_track.unobserve();
            delete el._vue_visible_track;
        }
    },

    setDefaults(options) {
        defaults = Object.assign({}, defaults, options);
    }
};
