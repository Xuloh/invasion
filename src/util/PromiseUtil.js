function timeout(delay) {
    return new Promise(resolve => setTimeout(resolve, delay));
}

export {timeout};
