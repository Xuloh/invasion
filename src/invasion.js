import "./style.css";

import $ from "jquery";
import ControlsManager from "./events/ControlsManager.js";
import EntityFactory from "./game/EntityFactory.js";
import EventsDispatcher from "./events/EventsDispatcher.js";
import MainScene from "./game/MainScene.js";
import React from "react";
import ReactDOM from "react-dom";
import Timer from "./util/Timer.js";
import UI from "./ui/UI.js";

window.$ = $;
window.jQuery = $;

function registerControls() {
    gameState.controlsManager.setControl("up", "KeyW");
    gameState.controlsManager.setControl("down", "KeyS");
    gameState.controlsManager.setControl("left", "KeyA");
    gameState.controlsManager.setControl("right", "KeyD");
    gameState.controlsManager.setControl("fire", "mouse0");
}

function registerHandlers() {
    gameState.eventsDispatcher.registerHandler("keyup", gameState.stop, {
        keys: ["Escape"]
    });

    gameState.eventsDispatcher.registerHandler("keyup", event => {
        if(event.originalEvent.shiftKey)
            gameState.disableEnemies = !gameState.disableEnemies;
    }, {
        keys: ["KeyQ"]
    });

    gameState.eventsDispatcher.registerHandler("mousemove", event => {
        gameState.mouse.position = {
            x: event.originalEvent.clientX,
            y: event.originalEvent.clientY
        };
    });
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
    gameState.mainScene.update(dt);
}

function main() {
    gameState.mainRafToken = window.requestAnimationFrame(main);
    const dt = gameState.timer.dt();
    update(dt);
}

$(() => {
    window.gameState = {
        $container: $("#game"),
        mouse: {
            position: {
                x: 0,
                y: 0
            }
        },
        disableEnemies: false,
        start: start,
        stop: stop,
        timer: new Timer(),
        ef: new EntityFactory(),
        mainScene: new MainScene()
    };

    gameState.eventsDispatcher = new EventsDispatcher();
    gameState.controlsManager = new ControlsManager(gameState.eventsDispatcher);
    gameState.mainScene.load();
    registerControls();
    registerHandlers();
    ReactDOM.render(<UI/>, document.getElementById("ui"));
});
