export default class Timer {
    constructor() {
        this.reset();
    }

    dt() {
        const now = window.performance.now();
        const dt = now - this.last;
        this.last = now;
        return dt / 1000;
    }

    reset() {
        this.last = window.performance.now();
    }
}
