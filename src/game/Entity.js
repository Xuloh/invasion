import Victor from "victor";

export default class Entity {
    constructor(container, position) {
        if(typeof container === "string")
            this.$container = $(container);
        else if(container instanceof jQuery)
            this.$container = container;

        if(position == null)
            this.position = new Victor(0, 0);
        else if(Array.isArray(position))
            this.position = Victor.fromArray(position);
        else if(typeof position === "object")
            this.position = Victor.fromObject(position);
        else
            throw TypeError("position should either be an array or an object with a x and y property");

        this.center = new Victor(this.$container.width() / 2, this.$container.height() / 2);

        this.$container.css({
            top: Math.round(this.position.y - this.center.y) + "px",
            left: Math.round(this.position.x - this.center.x) + "px"
        });
    }

    update() {
        this.$container.css({
            top: Math.round(this.position.y - this.center.y) + "px",
            left: Math.round(this.position.x - this.center.x) + "px"
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

    setPosition(position) {
        if(typeof position === "object")
            position = Victor.fromObject(position);
        else if(Array.isArray(position))
            position = Victor.fromArray(position);
        else
            throw TypeError("position should either be an array or an object with a x and y property");

        this.position.copy(position);
        return this;
    }
}
