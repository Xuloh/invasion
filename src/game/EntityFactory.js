import BulletComponent from "./components/BulletComponent.js";
import DivComponent from "./components/DivComponent.js";
import EnemyComponent from "./components/EnemyComponent.js";
import Entity from "./ecm/Entity.js";
import PhysicsComponent from "./components/PhysicsComponent.js";
import PlayerComponent from "./components/PlayerComponent.js";
import PointerComponent from "./components/PointerComponent.js";

export default class EntityFactory {
    makePlayer() {
        const player = new Entity({
            x: window.innerWidth / 2,
            y: window.innerHeight / 2
        }, {
            width: 50,
            height: 50
        });
        player.addComponent(DivComponent, {
            cssClass: "entity player"
        });
        player.addComponent(PlayerComponent, 450);
        player.addComponent(PhysicsComponent, 50);
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
        pointer.addComponent(DivComponent, {
            cssClass: "entity pointer"
        });
        pointer.addComponent(PointerComponent, player, 70);
        return pointer;
    }

    makeBullet(position, direction) {
        const bullet = new Entity(position, {
            width: 10,
            height: 10
        });
        bullet.addComponent(DivComponent, {
            cssClass: "entity bullet"
        });
        bullet.addComponent(BulletComponent, direction, 800);
        bullet.addComponent(PhysicsComponent, 10);
        return bullet;
    }

    makeEnemy(position, player) {
        const enemy = new Entity(position, {
            width: 50,
            height: 50
        });
        enemy.addComponent(DivComponent, {
            cssClass: "entity enemy"
        });
        enemy.addComponent(EnemyComponent, player, 300);
        enemy.addComponent(PhysicsComponent, 50);
        return enemy;
    }
}
