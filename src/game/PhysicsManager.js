import {Engine, World} from "matter-js";

let world = null;
let engine = null;

// categories used for collision detection
let categoryCount = 0;
const collisionFilters = {};

function init(gravity) {
    if(gravity == null)
        gravity = {x: 0, y: 9.81};
    world = World.create({
        gravity: {
            x: gravity.x,
            y: gravity.y,
            scale: 1
        }
    });
    engine = Engine.create({
        constraintIterations: 2,
        enableSleeping: false,
        positionIterations: 6,
        velocityIterations: 4,
        world: world
    });
}

function update(dt) {
    Engine.update(engine, dt);
}

function getWorld() {
    return world;
}

function addCategory(category) {
    if(Object.prototype.hasOwnProperty.call(collisionFilters, category))
        throw new Error(`Category ${category} already exists`);
    if(categoryCount > 32)
        throw new Error("Maximum number of categories 32 reached");

    collisionFilters[category] = {
        category: 1 << categoryCount++,
        mask: 0
    };
}

function setCategoryMask(category, otherCategories, remove) {
    let mask = Object.keys(collisionFilters)
        .filter(k => otherCategories.includes(k))
        .reduce((acc, k) => acc | collisionFilters[k].category, 0);

    if(remove) {
        mask = ~mask;
        collisionFilters[category].mask &= mask;
    }
    else
        collisionFilters[category].mask |= mask;
}

function getCollisionFilter(category) {
    return collisionFilters[category];
}

export {
    init,
    update,
    getWorld,
    addCategory,
    setCategoryMask,
    getCollisionFilter
};
