import Timer from "util/Timer";

const timer = new Timer();
let timeScale = 1.0;

function dt() {
    return timer.dt() * timeScale;
}

function reset() {
    timer.reset();
}

function setTimeScale(scale) {
    timeScale = scale;
}

function pause() {
    timeScale = 0.0;
}

export {
    dt,
    reset,
    setTimeScale,
    pause
};
