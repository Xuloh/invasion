import BulletComponent from "./components/BulletComponent";
import EnemyComponent from "./components/EnemyComponent";
import Entity from "./ecm/Entity";
import Entity2D from "./entities/Entity2D";
import PhysicsComponent from "./components/PhysicsComponent";
import PlayerComponent from "./components/PlayerComponent";
import PointerComponent from "./components/PointerComponent";
import PolygonComponent from "./components/PolygonComponent";

export default class EntityFactory {
    makePointer(player) {
        const ratio = gameState.pixelToMetersRatio;
        const pointer = new Entity({
            x: window.innerWidth / 2 * 1 / ratio,
            y: window.innerHeight / 2 * 1 / ratio
        }, null, "Pointer");
        pointer.addComponent(PointerComponent, player, 1.5);
        return pointer;
    }

    makeBullet(position, direction) {
        const bullet = new Entity(position, {
            width: 0.2,
            height: 0.2
        }, "Bullet");
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
        }, "Enemy");
        enemy.addComponent(PhysicsComponent, 1, {
            label: "Enemy"
        });
        enemy.addComponent(EnemyComponent, player, 0.7, {x: 2.7, y: 2.7});
        return enemy;
    }

    makeTest() {
        const test = new Entity2D([0, 0], 0.0, 1.0, "WebGL Test");
        test.addComponent(PolygonComponent, 9, [0.4, 0.6, 0.4, 1.0], 1);
        return test;
    }
}
