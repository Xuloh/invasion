const handlers = {"*": []};
const supportedEvents = ["keydown", "keyup", "mousedown", "mouseup", "mousemove"];
let eventsDisabled = false;

supportedEvents.forEach(event => {
    handlers[event] = [];
    window.addEventListener(event, e => handleEvents($.Event(e)), true);
});

function registerHandler(events, handler, options) {
    if(typeof events !== "string")
        throw new TypeError("events must a string containing a space-separated sequence of events");

    if(options != null && typeof options !== "object")
        throw new TypeError("options must be an object");
    options = options || {};

    events = checkEvents(events);

    events
        .forEach(e => {
            handlers[e].push({
                handler: handler,
                options: options
            });
        });
}

function getNextEvent(events, disableEvents) {
    eventsDisabled = disableEvents || false;
    events = checkEvents(events);

    // eslint-disable-next-line arrow-body-style
    const promises = events.map(event => {
        return new Promise(resolve => {
            window.addEventListener(event, e => resolve(e), {
                once: true,
                capture: true
            });
        });
    });
    return Promise.race(promises);
}

function handleEvents(event) {
    if(!eventsDisabled) {
        [...handlers["*"], ...handlers[event.type]]
            .forEach(h => {
                switch(event.type) {
                    case "keydown":
                    case "keyup": {
                        const keys = h.options.keys || [];
                        if(keys.length === 0 || keys.includes(event.originalEvent.code))
                            h.handler(event);
                        break;
                    }
                    case "mousedown":
                    case "mouseup": {
                        const buttons = h.options.buttons || [];
                        if(buttons.length === 0 || buttons.includes(event.originalEvent.button))
                            h.handler(event);
                        break;
                    }
                    case "mousemove":
                        h.handler(event);
                        break;
                    default:
                        break;
                }
            });
    }
}

function checkEvents(events) {
    if(events === "*")
        return supportedEvents;

    events = events.split(" ");
    const validEvents = events.every(e => supportedEvents.includes(e));
    if(!validEvents)
        throw new TypeError(`invalid events '${events}', valid events are ${supportedEvents}`);

    return events;
}

export {
    registerHandler,
    getNextEvent
};
