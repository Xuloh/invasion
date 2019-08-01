import Component from "game/ecm/Component";

export default class HealthComponent extends Component {
    constructor(parent, maxHealth, displayHealthBar, startHealth) {
        super(parent);
        this._maxHealth = maxHealth;
        this._health = startHealth || maxHealth;
        this._displayHealthBar = displayHealthBar;
    }

    update(dt) {
        super.update(dt);
        if(this.health <= 0)
            this._parent.setForDeletion();
    }

    render() {
        if(this._displayHealthBar)
            console.log(`${this._parent.label} : ${this._health} / ${this._maxHealth} HP`);
    }

    set health(value) {
        this._health = Math.min(value, this._maxHealth);
    }

    get health() {
        return this._health;
    }
}
