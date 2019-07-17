import Scene from "./ecm/Scene.js";
import EntityFactory from "./EntityFactory.js";

export default class MainScene extends Scene {
    load() {
        const player = gameState.ef.makePlayer();
        this.entities.push(player);
        this.entities.push(gameState.ef.makePointer(player));
        this.entities.push(gameState.ef.makeEnemy([100, 100], player));
        this.entities.push(gameState.ef.makeEnemy([100, window.innerHeight - 100], player));
        this.entities.push(gameState.ef.makeEnemy([window.innerWidth - 100, window.innerHeight / 2], player));
    }
}
