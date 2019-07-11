import $ from "jquery";
import React from "react";
import ReactDOM from "react-dom";

import UI from "./ui/UI.js";

import Enemy from "./game/Enemy.js";
import Player from "./game/Player.js";
import Pointer from "./game/Pointer.js";

import "./style.css";
import { keyDownHandler, keyUpHandler, mouseDownHandler, mouseMoveHandler, mouseUpHandler } from "./event_handlers";

window.$ = $;
window.jQuery = $;

function registerHandlers() {
    $(window).on("keydown", keyDownHandler);
    $(window).on("keyup", keyUpHandler);
    $(window).on("mousemove", mouseMoveHandler);
    $(window).on("mousedown", mouseDownHandler);
    $(window).on("mouseup", mouseUpHandler);
}

function update(dt) {
    gameState.player.update(dt);
    gameState.pointer.update(dt);
    gameState.bullets.filter(b => b != null).forEach(b => b.update(dt));
    gameState.enemies.filter(e => e != null).forEach(e => e.update(dt));
}

$(() => {
    ReactDOM.render(<UI/>, document.getElementById("ui"));
    let player = new Player("#player", {x: window.innerWidth / 2, y: window.innerHeight / 2}, 450);
    let pointer = new Pointer("#pointer", {x: window.innerWidth / 2, y: window.innerHeight / 2}, player, 70);

    let enemy1 = $('<div class="enemy entity"/>');
    let enemy2 = $('<div class="enemy entity"/>');
    let enemy3 = $('<div class="enemy entity"/>');

    window.gameState = {
        $container: $("#game"),
        player: player,
        pointer: pointer,
        bullets: [],
        enemies: [],
        keyState: {
            up: "up",
            down: "up",
            left: "up",
            right: "up"
        },
        mouse: {
            position: {
                x: 0,
                y: 0
            },
            buttons: {
                left: "up"
            }
        }
    };

    enemy1.appendTo(gameState.$container);
    enemy2.appendTo(gameState.$container);
    enemy3.appendTo(gameState.$container);

    gameState.enemies = [
        new Enemy(enemy1, [100, 100], 300),
        new Enemy(enemy2, [100, window.innerHeight - 100], 300),
        new Enemy(enemy3, [window.innerWidth - 100, window.innerHeight / 2], 300)
    ];

    $("#start").on("click", () => {
        $("#menu").hide();
        $("#game").removeClass("inactive");
        let lastUpdate = window.performance.now();
        let main = now => {
            window.requestAnimationFrame(main);
            let dt = (now - lastUpdate) / 1000;
            lastUpdate = now;
            update(dt);
        };
        main(lastUpdate);
    });

    registerHandlers();
});
