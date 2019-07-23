const scenes = {};
let currentScene = null;
let currentSceneName = "";
let nextScene = null;

function add(name, scene) {
    if(Object.prototype.hasOwnProperty.call(scenes, name))
        throw new Error(`A scene with the name '${name}' already exists`);
    scenes[name] = scene;
}

function load(name) {
    if(!Object.prototype.hasOwnProperty.call(scenes, name))
        throw new Error(`No scene found with the name '${name}'`);
    nextScene = name;
}

function getCurrentScene() {
    return currentSceneName;
}

function update(dt) {
    if(nextScene != null) {
        if(currentScene != null)
            currentScene.unload();
        currentScene = scenes[nextScene];
        currentSceneName = nextScene;
        currentScene.load();
        nextScene = null;
    }
    currentScene.update(dt);
}

function render() {
    currentScene.render();
}

export default {
    add,
    load,
    getCurrentScene,
    update,
    render
};
