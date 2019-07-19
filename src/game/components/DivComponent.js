import Component from "../ecm/Component";

export default class DivComponent extends Component {
    constructor(parent, options) {
        super(parent);
        if(typeof options !== "object")
            throw new TypeError("options must be an object");

        this.$container = $("<div />");

        if(Object.prototype.hasOwnProperty.call(options, "cssClass")) {
            if(typeof options.cssClass !== "string")
                throw new TypeError("options.cssClass must be a string");
            this.$container.addClass(options.cssClass);
        }

        if(Object.prototype.hasOwnProperty.call(options, "css")) {
            if(typeof options.css !== "object")
                throw new TypeError("options.css must be an object");
            this.$container.css(options.css);
        }

        const position = this._parent.position;
        const origin = this._parent.origin;
        const size = this._parent.size;
        const ratio = gameState.pixelToMetersRatio;
        this.$container.css({
            top: `${Math.round((position.y - origin.y) * ratio)}px`,
            left: `${Math.round((position.x - origin.x) * ratio)}px`,
            height: `${size.height * ratio}px`,
            width: `${size.width * ratio}px`,
            transform: `rotateZ(${this._parent.angle}rad)`
        });

        gameState.$container.append(this.$container);
    }

    update() {
        const ratio = gameState.pixelToMetersRatio;
        this.$container.css({
            top: `${Math.round((this._parent.position.y - this._parent.origin.y) * ratio)}px`,
            left: `${Math.round((this._parent.position.x - this._parent.origin.x) * ratio)}px`,
            height: `${this._parent.size.height * ratio}px`,
            width: `${this._parent.size.width * ratio}px`,
            transform: `rotateZ(${this._parent.angle}rad)`
        });
    }

    destroy() {
        this.$container.remove();
    }
}
