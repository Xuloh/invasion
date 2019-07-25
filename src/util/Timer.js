export default class Timer {
    constructor() {
        this.reset();
    }

    dt(keep) {
        const now = window.performance.now();
        const dt = now - this.last;
        if(!keep)
            this.last = now;
        return dt / 1000;
    }

    reset() {
        this.last = window.performance.now();
    }
}
