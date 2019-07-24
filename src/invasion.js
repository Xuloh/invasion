import "./style.css";

import * as PhysicsManager from "./game/PhysicsManager";
import * as Renderer from "./game/Renderer";
import * as SceneManager from "./game/SceneManager";
import $ from "jquery";
import MainScene from "./game/MainScene";
import React from "react";
import ReactDOM from "react-dom";
import Timer from "./util/Timer";
import UI from "./ui/UI";
import {registerHandler} from "./events/EventsDispatcher";
import {setControl} from "./events/ControlsManager";
import setupFontAwesomeLibrary from "./font-awesome-library";
import {timeout} from "./util/PromiseUtil";

window.$ = $;
window.jQuery = $;

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
    registerHandler("keyup", stop, {
        keys: ["Escape"]
    });

    registerHandler("keyup", event => {
        if(event.originalEvent.shiftKey)
            gameState.disableEnemies = !gameState.disableEnemies;
    }, {
        keys: ["KeyQ"]
    });
}

function resize() {
    gameState.$container.attr({
        height: gameState.$container.height(),
        width: gameState.$container.width()
    });
    Renderer.resize();
}

function start() {
    gameState.$ui.toggleMenu(false);
    $("#game").removeClass("inactive");
    gameState.timer.reset();
    main();
}

function stop() {
    gameState.$ui.toggleMenu(true);
    $("#game").addClass("inactive");
    window.cancelAnimationFrame(gameState.mainRafToken);
}

function update(dt) {
    PhysicsManager.update(dt);
    SceneManager.update(dt);
}

function render() {
    SceneManager.render();
}

function main() {
    gameState.mainRafToken = window.requestAnimationFrame(main);
    const dt = gameState.timer.dt();
    update(dt);
    render();
}

$(() => {
    window.gameState = {
        $container: $("#game"),
        disableEnemies: false,
        start: start,
        stop: stop,
        timer: new Timer()
    };

    PhysicsManager.init({x: 0, y: 0});
    Renderer.init("game", {
        clearColor: "#eee"
    });
    gameState.$container.on("resize", resize);
    resize();
    setupFontAwesomeLibrary();
    registerControls();
    registerHandlers();
    SceneManager.add("main", new MainScene());
    SceneManager.load("main");
    ReactDOM.render(<UI/>, document.getElementById("ui"));
    timeout(1000).then(() => $("#start").click());
});
