import $ from "jquery";
import React from "react";
import ReactDOM from "react-dom";

import UI from "./ui/UI.js";

import EventsDispatcher from "./events/EventsDispatcher.js";
import ControlsManager from "./events/ControlsManager.js";
import Timer from "./util/Timer.js";
import EntityFactory from "./game/EntityFactory.js";

import "./style.css";

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

function update(dt) {
    gameState.player.update(dt);
    gameState.pointer.update(dt);
    gameState.bullets.filter(b => b != null).forEach(b => b.update(dt));
    gameState.enemies.filter(e => e != null && !gameState.disableEnemies).forEach(e => e.update(dt));
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

function main() {
    gameState.mainRafToken = window.requestAnimationFrame(main);
    const dt = gameState.timer.dt();
    update(dt);
}

$(() => {
    window.gameState = {
        $container: $("#game"),
        bullets: [],
        mouse: {
            position: {
                x: 0,
                y: 0
            }
        },
        disableEnemies: false,
        start: start,
        stop: stop,
        timer: new Timer()
    };
    const ef = new EntityFactory();

    gameState.eventsDispatcher = new EventsDispatcher();
    gameState.controlsManager = new ControlsManager();
    gameState.player = ef.makePlayer();
    gameState.pointer = ef.makePointer(gameState.player);
    gameState.enemies = [
        ef.makeEnemy([100, 100]),
        ef.makeEnemy([100, window.innerHeight - 100]),
        ef.makeEnemy([window.innerWidth - 100, window.innerHeight / 2])
    ];

    registerControls();
    registerHandlers();
    ReactDOM.render(<UI/>, document.getElementById("ui"));
});
