import $ from "jquery";
import React from "react";
import ReactDOM from "react-dom";

import UI from "./ui/UI.js";

import Enemy from "./game/Enemy.js";
import Player from "./game/Player.js";
import Pointer from "./game/Pointer.js";

import "./style.css";

import EventsDispatcher from "./events/EventsDispatcher.js";
import ControlsManager from "./events/ControlsManager.js";

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
    $("#menu").hide();
    $("#game").removeClass("inactive");
    gameState.lastUpdate = window.performance.now();
    main(gameState.lastUpdate);
}

function stop() {
    window.cancelAnimationFrame(gameState.mainRafToken);
    $("#menu").show();
    $("#game").addClass("inactive");
}

function main(now) {
    gameState.mainRafToken = window.requestAnimationFrame(main);
    const dt = (now - gameState.lastUpdate) / 1000;
    gameState.lastUpdate = now;
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
        stop: stop
    };

    gameState.eventsDispatcher = new EventsDispatcher();
    gameState.controlsManager = new ControlsManager();
    gameState.player = new Player({x: window.innerWidth / 2, y: window.innerHeight / 2}, 450);
    gameState.pointer = new Pointer({x: window.innerWidth / 2, y: window.innerHeight / 2}, gameState.player, 70);
    gameState.enemies = [
        new Enemy([100, 100], 300),
        new Enemy([100, window.innerHeight - 100], 300),
        new Enemy([window.innerWidth - 100, window.innerHeight / 2], 300)
    ];

    registerControls();
    registerHandlers();
    ReactDOM.render(<UI/>, document.getElementById("ui"));
});
