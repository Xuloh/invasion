import "./style.css";

import $ from "jquery";
import EntityFactory from "./game/EntityFactory";
import MainScene from "./game/MainScene";
import PhysicsManager from "./game/PhysicsManager";
import React from "react";
import ReactDOM from "react-dom";
import Renderer from "./game/Renderer";
import Timer from "./util/Timer";
import UI from "./ui/UI";
import {registerHandler} from "./events/EventsDispatcher";
import {setControl} from "./events/ControlsManager";
import setupFontAwesomeLibrary from "./font-awesome-library";

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
    registerHandler("keyup", gameState.stop, {
        keys: ["Escape"]
    });

    registerHandler("keyup", event => {
        if(event.originalEvent.shiftKey)
            gameState.disableEnemies = !gameState.disableEnemies;
    }, {
        keys: ["KeyQ"]
    });

    registerHandler("mousemove", event => {
        gameState.mouse.position = {
            x: event.originalEvent.clientX,
            y: event.originalEvent.clientY
        };
    });
}

function resize() {
    gameState.$container.attr({
        height: gameState.$container.height(),
        width: gameState.$container.width()
    });
    gameState.renderer.resetProjection();
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
    gameState.physicsManager.update(dt);
    gameState.mainScene.update(dt);
}

function render() {
    gameState.mainScene.render();
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
        mainScene: new MainScene(),
        physicsManager: new PhysicsManager({x: 0, y: 0}),
        pixelToMetersRatio: 50,
        renderer: new Renderer("game", {
            clearColor: "#eee"
        })
    };

    gameState.$container.on("resize", resize);
    resize();

    gameState.mainScene.load();
    setupFontAwesomeLibrary();
    registerControls();
    registerHandlers();
    ReactDOM.render(<UI/>, document.getElementById("ui"));
});
