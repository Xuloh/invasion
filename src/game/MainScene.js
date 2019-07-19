import Scene from "./ecm/Scene";

export default class MainScene extends Scene {
    load() {
        const player = gameState.ef.makePlayer();
        const ratio = gameState.pixelToMetersRatio;
        this.entities.push(player);
        this.entities.push(gameState.ef.makePointer(player));
        this.entities.push(gameState.ef.makeEnemy([100 * 1 / ratio, 100 * 1 / ratio], player));
        this.entities.push(gameState.ef.makeEnemy([100 * 1 / ratio, (window.innerHeight - 100) * 1 / ratio], player));
        this.entities.push(gameState.ef.makeEnemy([(window.innerWidth - 100) * 1 / ratio, (window.innerHeight / 2) * 1 / ratio], player));
    }
}
