import Entity from "./ecm/Entity.js";
import DivComponent from "./components/DivComponent.js";
import PlayerComponent from "./components/PlayerComponent.js";
import PointerComponent from "./components/PointerComponent.js";
import EnemyComponent from "./components/EnemyComponent.js";

export default class EntityFactory {
    makePlayer() {
        const player = new Entity({
            x: window.innerWidth / 2,
            y: window.innerHeight / 2
        }, {
            width: 50,
            height: 50
        });
        player.addComponent(new DivComponent(player, {
            cssClass: "entity player"
        }));
        player.addComponent(new PlayerComponent(450));
        return player;
    }

    makePointer(player) {
        const pointer = new Entity({
            x: window.innerWidth / 2,
            y: window.innerHeight / 2
        }, {
            width: 10,
            height: 10
        });
        pointer.addComponent(new DivComponent({
            cssClass: "entity pointer"
        }));
        pointer.addComponent(new PointerComponent(player, 70));
        return pointer;
    }

    makeBullet() {

    }

    makeEnemy(position) {
        const enemy = new Entity(position, {
            width: 50,
            height: 50
        });
        enemy.addComponent(new DivComponent({
            cssClass: "entity enemy"
        }));
        enemy.addComponent(new EnemyComponent(300));
        return enemy;
    }
}
