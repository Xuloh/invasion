import Victor from "victor";

export default class Entity {
    constructor(position, size) {
        if(position == null)
            this._position = new Victor(0, 0);
        else if(Array.isArray(position))
            this._position = Victor.fromArray(position);
        else if(typeof position === "object")
            this._position = Victor.fromObject(position);
        else
            throw TypeError("position should either be an array or an object with an x and y property");

        if(size == null || !("width" in size) || !("height" in size))
            throw new TypeError("size should be an object with a width and height property");

        this._components = [];

        this.$container = $('<div class="entity"/>');
        gameState.$container.append(this.$container);

        this.origin = new Victor(size.width / 2, size.height / 2);
        this.$container.css({
            top: Math.round(this.position.y - this.origin.y) + "px",
            left: Math.round(this.position.x - this.origin.x) + "px",
            height: size.height + "px",
            width: size.width + "px"
        });

        this.alive = true;
        this._isForDeletion = false;
    }

    // eslint-disable-next-line no-unused-vars
    update(dt) {
        this.$container.css({
            top: Math.round(this.position.y - this.origin.y) + "px",
            left: Math.round(this.position.x - this.origin.x) + "px"
        });
    }

    move(movement) {
        if(typeof movement === "object")
            movement = Victor.fromObject(movement);
        else if(Array.isArray(movement))
            movement = Victor.fromArray(movement);
        else
            throw TypeError("movement should either be an array or an object with a x and y property");

        this.position.add(movement);

        return this;
    }

    get isForDeletion() {
        return this._isForDeletion;
    }

    setForDeletion() {
        this._isForDeletion = true;
    }

    get position() {
        return this._position;
    }

    set position(position) {
        if(typeof position === "object")
            position = Victor.fromObject(position);
        else if(Array.isArray(position))
            position = Victor.fromArray(position);
        else
            throw TypeError("position should either be an array or an object with a x and y property");

        this._position.copy(position);
        return this;
    }
}
