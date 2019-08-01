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

function updateCurrentScene() {
    if(nextScene != null) {
        if(currentScene != null)
            currentScene.unload();
        currentScene = scenes[nextScene];
        currentSceneName = nextScene;
        currentScene.load();
        nextScene = null;
    }
}

function getCurrentScene() {
    return currentSceneName;
}

function update(dt) {
    updateCurrentScene();
    currentScene.update(dt);
}

function render() {
    currentScene.render();
}

function message(msg) {
    currentScene.handle(msg);
}

export {
    add,
    load,
    getCurrentScene,
    update,
    updateCurrentScene,
    render,
    message
};
