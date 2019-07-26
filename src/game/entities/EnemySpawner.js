import Enemy from "game/entities/Enemy";
import Entity from "game/ecm/Entity";
import EntitySpawnerComponent from "game/components/EntitySpawnerComponent";

export default class EnemySpawner extends Entity {
    constructor(player) {
        super("EnemySpawner");
        this.addComponent(EntitySpawnerComponent, Enemy, 1500, {
            x: -3,
            y: 3
        }, [player]);
    }
}
