import BulletComponent from "./components/BulletComponent.js";
import DivComponent from "./components/DivComponent.js";
import EnemyComponent from "./components/EnemyComponent.js";
import Entity from "./ecm/Entity.js";
import PhysicsComponent from "./components/PhysicsComponent.js";
import PlayerComponent from "./components/PlayerComponent.js";
import PointerComponent from "./components/PointerComponent.js";

export default class EntityFactory {
    makePlayer() {
        const ratio = gameState.pixelToMetersRatio;
        const player = new Entity({
            x: window.innerWidth / 2 * 1 / ratio,
            y: window.innerHeight / 2 * 1 / ratio
        }, {
            width: 1,
            height: 1
        });
        player.addComponent(DivComponent, {
            cssClass: "entity player"
        });
        player.addComponent(PhysicsComponent, 1, {
            label: "Player"
        });
        player.addComponent(PlayerComponent, 1, {x: 3, y: 3});
        return player;
    }

    makePointer(player) {
        const ratio = gameState.pixelToMetersRatio;
        const pointer = new Entity({
            x: window.innerWidth / 2 * 1 / ratio,
            y: window.innerHeight / 2 * 1 / ratio
        }, {
            width: 0.2,
            height: 0.2
        });
        pointer.addComponent(DivComponent, {
            cssClass: "entity fas fa-chevron-right"
        });
        pointer.addComponent(PointerComponent, player, 1.5);
        return pointer;
    }

    makeBullet(position, direction) {
        const bullet = new Entity(position, {
            width: 0.2,
            height: 0.2
        });
        bullet.addComponent(DivComponent, {
            cssClass: "entity bullet"
        });
        bullet.addComponent(PhysicsComponent, 0.2, {
            label: "Bullet"
        });
        bullet.addComponent(BulletComponent, direction, 2);
        return bullet;
    }

    makeEnemy(position, player) {
        const enemy = new Entity(position, {
            width: 1,
            height: 1
        });
        enemy.addComponent(DivComponent, {
            cssClass: "entity enemy"
        });
        enemy.addComponent(PhysicsComponent, 1, {
            label: "Enemy"
        });
        enemy.addComponent(EnemyComponent, player, 0.7, {x: 2.7, y: 2.7});
        return enemy;
    }
}
