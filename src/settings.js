const defaultSettings = {
    showGrid: true
};

const settings = {};

const SETTINGS_PREFIX = "invasion.";

// https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API/Using_the_Web_Storage_API#Testing_for_availability
const localStorageAvailable = (function() {
    let storage;
    try {
        storage = window.localStorage;
        const x = "__storage_test__";
        storage.setItem(x, x);
        storage.removeItem(x);
        return true;
    }
    catch(e) {
        return e instanceof DOMException && (
            // everything except Firefox
            e.code === 22 ||
            // Firefox
            e.code === 1014 ||
            // test name field too, because code might not be present
            // everything except Firefox
            e.name === "QuotaExceededError" ||
            // Firefox
            e.name === "NS_ERROR_DOM_QUOTA_REACHED") &&
            // acknowledge QuotaExceededError only if there's something already stored
            (storage && storage.length !== 0);
    }
})();

function init() {
    if(localStorageAvailable) {
        Object.keys(defaultSettings)
            .filter(k => localStorage.getItem(SETTINGS_PREFIX + k) == null)
            .forEach(k => localStorage.setItem(SETTINGS_PREFIX + k, defaultSettings[k]));
    }
    else
        Object.keys(defaultSettings).forEach(k => settings[k] = defaultSettings[k]);
}

function set(k, v) {
    switch(typeof k) {
        case "object":
            Object.keys(k).forEach(key => set(key, k[key]));
            break;
        case "string":
            if(!Object.prototype.hasOwnProperty.call(defaultSettings, k))
                throw new Error(`Attempted to set unknown setting '${k}' with value '${v}'`);
            if(localStorageAvailable)
                localStorage.setItem(SETTINGS_PREFIX + k, v);
            else
                settings[k] = v;
            break;
        default:
            throw new Error(`Wrong setting type '${typeof k}'`);
    }
}

function getAll() {
    if(localStorageAvailable) {
        const res = {};
        for(let i = 0; i < localStorage.length; i++) { // eslint-disable-line
            let key = localStorage.key(i);
            if(key.startsWith(SETTINGS_PREFIX)) {
                key = key.slice(SETTINGS_PREFIX.length);
                res[key] = get(key);
            }
        }
        return res;
    }
    return settings;
}

function get(k) {
    if(k == null)
        return getAll();

    let value = null;

    if(localStorageAvailable)
        value = localStorage.getItem(SETTINGS_PREFIX + k);
    else
        value = settings[k];

    if(value === "true")
        return true;
    if(value === "false")
        return false;
    if(!isNaN(value)) // if value is a string representing a number
        return +value; // transform string into corresponding number
    return value;
}

function reset() {
    if(localStorageAvailable)
        Object.keys(defaultSettings).forEach(k => localStorage.setItem(SETTINGS_PREFIX + k, defaultSettings[k]));
    else
        Object.keys(defaultSettings).forEach(k => settings[k] = defaultSettings[k]);
}

window.getSetting = get;
window.setSetting = set;

export {
    init,
    get,
    set,
    reset,
    localStorageAvailable
};
