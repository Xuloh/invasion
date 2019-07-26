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

export {
    dt,
    reset,
    setTimeScale
};
