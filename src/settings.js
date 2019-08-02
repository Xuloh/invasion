const settings = {
    showGrid: true
};

function set(k, v) {
    switch(typeof k) {
        case "object":
            Object.keys(k).forEach(key => set(key, k[key]));
            break;
        case "string":
            if(!Object.prototype.hasOwnProperty.call(settings, k))
                throw new Error(`Attempted to set unknown setting '${k}' with value '${v}'`);
            settings[k] = v;
            break;
        default:
            throw new Error(`Wrong setting type '${typeof k}'`);
    }
}

function get(k) {
    if(k == null)
        return settings;
    return settings[k];
}

export {
    get,
    set
};
