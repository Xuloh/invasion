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
        player.addComponent(new DivComponent(player, {
            cssClass: "entity player"
        }));
        player.addComponent(new PlayerComponent(player, 450));
        player.addComponent(new PhysicsComponent(player, 50));
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
        pointer.addComponent(new DivComponent(pointer, {
            cssClass: "entity pointer"
        }));
        pointer.addComponent(new PointerComponent(pointer, player, 70));
        return pointer;
    }

    makeBullet(position, direction) {
        const bullet = new Entity(position, {
            width: 10,
            height: 10
        });
        bullet.addComponent(new DivComponent(bullet, {
            cssClass: "entity bullet"
        }));
        bullet.addComponent(new BulletComponent(bullet, direction, 800));
        bullet.addComponent(new PhysicsComponent(bullet, 10));
        return bullet;
    }

    makeEnemy(position, player) {
        const enemy = new Entity(position, {
            width: 50,
            height: 50
        });
        enemy.addComponent(new DivComponent(enemy, {
            cssClass: "entity enemy"
        }));
        enemy.addComponent(new EnemyComponent(enemy, player, 300));
        enemy.addComponent(new PhysicsComponent(enemy, 50));
        return enemy;
    }
}
