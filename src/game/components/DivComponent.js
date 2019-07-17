import Component from "../ecm/Component.js";

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

        const position = this.parent.position;
        const origin = this.parent.origin;
        const size = this.parent.size;

        this.$container.css({
            top: Math.round(position.y - origin.y) + "px",
            left: Math.round(position.x - origin.x) + "px",
            height: size.height + "px",
            width: size.width + "px"
        });

        gameState.$container.append(this.$container);
    }

    update() {
        this.$container.css({
            top: Math.round(this.parent.position.y - this.parent.origin.y) + "px",
            left: Math.round(this.parent.position.x - this.parent.origin.x) + "px",
            height: this.parent.size.height + "px",
            width: this.parent.size.width + "px"
        });
    }
}
