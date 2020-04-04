import 'intersection-observer';

const observer = new IntersectionObserver(handleIntersection);
const bindings = [];
const sentModules = [];
let defaults = {
    callback() {
        //
    }
};

function deleteBinding(el) {
    for (let i = 0; i < bindings.length; ++i) {
        if (bindings[i].el === el) {
            bindings.splice(i, 1);
            return true
        }
    }
    return false
}

function findBinding(el) {
    for (let i = 0; i < bindings.length; ++i) {
        if (bindings[i].el === el) {
            return bindings[i]
        }
    }
}

function getBinding(el) {
    let binding = findBinding(el);

    if (binding) {
        return binding
    }

    binding = {
        el: el,
        binding: {}
    };
    bindings.push(binding);
    return binding;
}

function handleIntersection(entries) {
    if (!entries || !entries.length) {
        return;
    }

    for (let i = 0; i < entries.length; i++) {
        let entry = entries[i];
        if (!entry.isIntersecting) {
            continue;
        }
        handleIntersecting(entry);
    }
}

function handleIntersecting(entry) {
    let binding = getBinding(entry.target).binding.binding;
    let each = !!binding["modifiers"]["each"];
    let module = binding["arg"] || "";
    if (sentModules.includes(module) && !each) {
        return;
    }
    !sentModules.includes(module) && sentModules.push(module);
    typeof defaults["callback"] === "function" && defaults["callback"](binding["value"]);
}

function setDefaults(options) {
    defaults = Object.assign({}, defaults, options);
}

function clearSentModules() {
    sentModules.length = 0;
}

export default {
    bind: function (el, binding) {
        getBinding(el).binding = binding;
        observer.observe(el);
    },

    update: function (el, binding) {
        getBinding(el).binding = binding;
    },

    unbind(el) {
        deleteBinding(el);
        observer.unobserve(el);
    },

    setDefaults,
    clearSentModules
};
