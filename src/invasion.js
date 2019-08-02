import "./style.css";

import * as PhysicsManager from "game/PhysicsManager";
import * as Renderer from "game/Renderer";
import * as SceneManager from "game/SceneManager";
import * as Settings from "settings";
import * as TimeManager from "game/TimeManager";
import $ from "jquery";
import MainScene from "game/MainScene";
import React from "react";
import ReactDOM from "react-dom";
import UI from "ui/UI";
import {registerHandler} from "events/EventsDispatcher";
import {setControl} from "events/ControlsManager";
import setupFontAwesomeLibrary from "font-awesome-library";

let $container = null;
let disableEnemies = false;
let mainRafToken = null; // eslint-disable-line
let pause = true;

// this function is provided by the UI component when it is created
// function performUIAction(action, args)
let performUIAction = null;

// eslint-disable-next-line no-unused-vars
function handleUIAction(action, args) {
    switch(action) {
        case "startClick":
            performUIAction("toggleMenu", {display: false});
            $container.removeClass("inactive");
            pause = false;
            break;
        default:
            break;
    }
}

function registerControls() {
    [
        ["up", "KeyW"],
        ["down", "KeyS"],
        ["left", "KeyA"],
        ["right", "KeyD"],
        ["fire", "mouse0"]
    ].forEach(control => setControl(control[0], control[1]));
}

function registerHandlers() {
    registerHandler("keyup", openMenu, {
        keys: ["Escape"]
    });

    registerHandler("keyup", event => {
        if(event.originalEvent.shiftKey)
            disableEnemies = !disableEnemies;
    }, {
        keys: ["KeyQ"]
    });
}

function addCollisionCategories() {
    PhysicsManager.addCategory("player");
    PhysicsManager.addCategory("enemy");
    PhysicsManager.addCategory("bullet");

    PhysicsManager.setCategoryMask("player", ["enemy"]);
    PhysicsManager.setCategoryMask("enemy", ["player", "bullet"]);
    PhysicsManager.setCategoryMask("bullet", ["enemy"]);
}

function openMenu() {
    performUIAction("toggleMenu", {display: true});
    $container.addClass("inactive");
    pause = true;
}

function update(dt) {
    PhysicsManager.update(dt);
    SceneManager.update(dt);
}

function render() {
    Renderer.resize();
    SceneManager.render();
    Renderer.render();
}

function main() {
    mainRafToken = window.requestAnimationFrame(main);
    const dt = TimeManager.dt();
    if(!pause) {
        update(dt);
        render();
    }
}

$(() => {
    PhysicsManager.init({x: 0, y: 0});
    Renderer.init("game", {
        clearColor: "#fff",
        debug: false
    });
    Settings.init();

    $container = $("#game");
    setupFontAwesomeLibrary();
    registerControls();
    registerHandlers();
    addCollisionCategories();

    SceneManager.add("main", new MainScene());
    SceneManager.load("main");
    SceneManager.updateCurrentScene();
    render();
    main();

    ReactDOM.render(
        <UI
            performAction={func => performUIAction = func}
            handleAction={handleUIAction}
        />,
        document.getElementById("ui")
    );
});
