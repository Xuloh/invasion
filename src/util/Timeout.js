export default class Timeout {
    constructor(timeout) {
        this.timeout = timeout;
        this.timer = timeout;
    }

    // return true if the timer expired and optionaly reset it
    update(dt, reset) {
        if(this.timer <= 0) {
            this.timer = reset ? this.timeout : 0;
            return true;
        }
        this.timer -= dt;
        return false;
    }

    reset() {
        this.timer = this.timeout;
    }
}
