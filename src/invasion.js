import $ from "jquery";
import Victor from "victor";
import React from "react";
import ReactDOM from "react-dom";

import App from "./ui/App.js";

import Bullet from "./game/Bullet.js";
import Enemy from "./game/Enemy.js";
import Entity from "./game/Entity.js";
import Player from "./game/Player.js";
import Pointer from "./game/Pointer.js";

import "./style.css";

window.$ = $;
window.jQuery = $;

function update(dt) {
    gameState.player.update(dt);
    gameState.pointer.update(dt);
    gameState.bullets.filter(b => b != null).forEach(b => b.update(dt));
    gameState.enemies.filter(e => e != null).forEach(e => e.update(dt));
}

$(() => {
    ReactDOM.render(<App/>, document.getElementById("app"));
});

/*
$(() => {
    $('<div id="menu"><h1 id="title" class="menu-item">Invasion</h1><button id="start" class="menu-item">Start</button></div><div id="game" class="inactive"><div id="player" class="entity"></div><div id="pointer" class="entity"></div></div>').appendTo($("body"));
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

    $("#start").on("click", event => {
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

    // *** key handlers to update key state ***
    $(window).on("keydown", event => {
        switch(event.originalEvent.code) {
            case "KeyW":
                event.preventDefault();
                gameState.keyState.up = "down";
                break;
            case "KeyS":
                event.preventDefault();
                gameState.keyState.down = "down";
                break;
            case "KeyA":
                event.preventDefault();
                gameState.keyState.left = "down";
                break;
            case "KeyD":
                event.preventDefault();
                gameState.keyState.right = "down";
                break;
            default:
                break;
        }
    });

    $(window).on("keyup", event => {
        switch(event.originalEvent.code) {
            case "KeyW":
                event.preventDefault();
                gameState.keyState.up = "up";
                break;
            case "KeyS":
                event.preventDefault();
                gameState.keyState.down = "up";
                break;
            case "KeyA":
                event.preventDefault();
                gameState.keyState.left = "up";
                break;
            case "KeyD":
                event.preventDefault();
                gameState.keyState.right = "up";
                break;
            default:
                break;
        }
    });
    // *** *** ***

    // *** mouse handler to update mouse state
    $(window).on("mousemove", event => {
        gameState.mouse.position = {
            x: event.originalEvent.clientX,
            y: event.originalEvent.clientY
        };
    });

    $(window).on("mousedown", event => {
        if(event.originalEvent.button === 0) {
            event.preventDefault();
            gameState.mouse.buttons.left = "down";
        }
    });

    $(window).on("mouseup", event => {
        if(event.originalEvent.button === 0) {
            event.preventDefault();
            gameState.mouse.buttons.left = "up";
        }
    });
});
*/
