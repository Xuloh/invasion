import BulletComponent from "./components/BulletComponent";
import DivComponent from "./components/DivComponent";
import EnemyComponent from "./components/EnemyComponent";
import Entity from "./ecm/Entity";
import PhysicsComponent from "./components/PhysicsComponent";
import PlayerComponent from "./components/PlayerComponent";
import PointerComponent from "./components/PointerComponent";

export default class EntityFactory {
    makePlayer() {
        const ratio = gameState.pixelToMetersRatio;
        const player = new Entity({
            x: window.innerWidth / 2 * 1 / ratio,
            y: window.innerHeight / 2 * 1 / ratio
        }, {
            width: 1,
            height: 1
        }, "Player");
        player.addComponent(DivComponent, {
            cssClass: "entity player"
        });
        player.addComponent(PhysicsComponent, "circle", {
            radius: 1
        });
        player.addComponent(PlayerComponent, 1, {x: 3, y: 3});
        return player;
    }

    makePointer(player) {
        const ratio = gameState.pixelToMetersRatio;
        const pointer = new Entity({
            x: window.innerWidth / 2 * 1 / ratio,
            y: window.innerHeight / 2 * 1 / ratio
        }, null, "Pointer");
        pointer.addComponent(DivComponent, {
            cssClass: "entity pointer fas fa-chevron-right"
        });
        pointer.addComponent(PointerComponent, player, 1.5);
        return pointer;
    }

    makeBullet(position, direction) {
        const bullet = new Entity(position, {
            width: 0.2,
            height: 0.2
        }, "Bullet");
        bullet.addComponent(DivComponent, {
            cssClass: "entity bullet"
        });
        bullet.addComponent(PhysicsComponent, "circle", {
            radius: 0.2
        });
        bullet.addComponent(BulletComponent, direction, 2);
        return bullet;
    }

    makeEnemy(position, player) {
        const enemy = new Entity(position, {
            width: 1,
            height: 1
        }, "Enemy");
        enemy.addComponent(DivComponent, {
            cssClass: "entity enemy"
        });
        enemy.addComponent(PhysicsComponent, "circle", {
            radius: 1
        });
        enemy.addComponent(EnemyComponent, player, 0.7, {x: 2.7, y: 2.7});
        return enemy;
    }

    makeWalls() {
        const ratio = gameState.pixelToMetersRatio;
        const wall1 = new Entity({
            x: window.innerWidth / 2 * 1 / ratio,
            y: -0.5
        }, {
            width: window.innerWidth * 1 / ratio,
            height: 1
        }, "Top wall");
        wall1.addComponent(PhysicsComponent, "rectangle", {
            width: window.innerWidth * 1 / ratio,
            height: 1
        });

        const wall2 = new Entity({
            x: (window.innerWidth * 1 / ratio) + 0.5,
            y: window.innerHeight / 2 * 1 / ratio
        }, {
            width: 1,
            height: window.innerHeight * 1 / ratio
        }, "Right wall");
        wall2.addComponent(PhysicsComponent, "rectangle", {
            width: 1,
            height: window.innerHeight * 1 / ratio
        });

        const wall3 = new Entity({
            x: window.innerWidth / 2 * 1 / ratio,
            y: (window.innerHeight * 1 / ratio) + 0.5
        }, {
            width: window.innerWidth * 1 / ratio,
            height: 1
        }, "Bottom wall");
        wall3.addComponent(PhysicsComponent, "rectangle", {
            width: window.innerWidth * 1 / ratio,
            height: 1
        });

        const wall4 = new Entity({
            x: -0.5,
            y: window.innerHeight / 2 * 1 / ratio
        }, {
            width: 1,
            height: window.innerHeight * 1 / ratio
        }, "Left wall");
        wall4.addComponent(PhysicsComponent, "rectangle", {
            width: 1,
            height: window.innerHeight * 1 / ratio
        });

        return [wall1, wall2, wall3, wall4];
    }
}
