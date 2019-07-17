import Entity from "./ecm/Entity.js";
import DivComponent from "./components/DivComponent.js";
import PlayerComponent from "./components/PlayerComponent.js";

export default class EntityFactory {
    makePlayer() {
        const player = new Entity({x: window.innerWidth / 2, y: window.innerHeight / 2});
        player.addComponent(new DivComponent({
            cssClass: "entity player"
        }));
        player.addComponent(new PlayerComponent(450));
        return player;
    }

    makePointer() {

    }

    makeBullet() {

    }

    makeEnemy() {

    }
}
