import $ from "jquery";
import React from "react";
import ReactDOM from "react-dom";

import UI from "./ui/UI.js";

import Enemy from "./game/Enemy.js";
import Player from "./game/Player.js";
import Pointer from "./game/Pointer.js";

import "./style.css";
import {initHandlers, registerKeyHandler, registerMouseHandler} from "./event_handlers";

window.$ = $;
window.jQuery = $;


function registerHandlers() {
    registerKeyHandler("KeyW", event => {
        if(event.type === "keydown")
            gameState.keyState.up = "down";
        else if(event.type === "keyup")
            gameState.keyState.up = "up";
    });
    registerKeyHandler("KeyS", event => {
        if(event.type === "keydown")
            gameState.keyState.down = "down";
        else if(event.type === "keyup")
            gameState.keyState.down = "up";
    });
    registerKeyHandler("KeyA", event => {
        if(event.type === "keydown")
            gameState.keyState.left = "down";
        else if(event.type === "keyup")
            gameState.keyState.left = "up";
    });
    registerKeyHandler("KeyD", event => {
        if(event.type === "keydown")
            gameState.keyState.right = "down";
        else if(event.type === "keyup")
            gameState.keyState.right = "up";
    });
    registerMouseHandler(0, event => {
        if(event.type === "mousedown")
            gameState.mouse.buttons.left = "down";
        else if(event.type === "mouseup")
            gameState.mouse.buttons.left = "up";
    });
    registerKeyHandler("Escape", event => {
        if(event.type === "keyup") {
            window.cancelAnimationFrame(gameState.mainRafToken);
            $("#menu").show();
            $("#game").addClass("inactive");
        }
    });
}

function update(dt) {
    gameState.player.update(dt);
    gameState.pointer.update(dt);
    gameState.bullets.filter(b => b != null).forEach(b => b.update(dt));
    gameState.enemies.filter(e => e != null).forEach(e => e.update(dt));
}

$(() => {
    ReactDOM.render(<UI/>, document.getElementById("ui"));
    const player = new Player("#player", {x: window.innerWidth / 2, y: window.innerHeight / 2}, 450);
    const pointer = new Pointer("#pointer", {x: window.innerWidth / 2, y: window.innerHeight / 2}, player, 70);

    const enemy1 = $('<div class="enemy entity"/>');
    const enemy2 = $('<div class="enemy entity"/>');
    const enemy3 = $('<div class="enemy entity"/>');

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
        const main = now => {
            gameState.stopMain = window.requestAnimationFrame(main);
            const dt = (now - lastUpdate) / 1000;
            lastUpdate = now;
            update(dt);
        };
        main(lastUpdate);
    });

    registerHandlers();
});
