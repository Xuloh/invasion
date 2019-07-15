export default class EventsDispatcher {
    constructor() {
        this.handlers = {"*": []};
        this.events = ["keydown", "keyup", "mousedown", "mouseup", "mousemove"];
        this.events.forEach(e => this.handlers[e] = []);
        this.disableEvents = false;
        this.events.forEach(event => window.addEventListener(event, e => this._handleEvents($.Event(e)), true));
    }

    registerHandler(events, handler, options) {
        if(typeof events !== "string")
            throw new TypeError("events must a string containing a space-separated sequence of events");

        if(options != null && typeof options !== "object")
            throw new TypeError("options must be an object");
        options = options || {};

        events = this._checkEvents(events);

        events
            .forEach(e => {
                this.handlers[e].push({
                    handler: handler,
                    options: options
                });
            });
    }

    getNextEvent(events, disableEvents) {
        this.disableEvents = disableEvents || false;
        events = this._checkEvents(events);

        // eslint-disable-next-line arrow-body-style
        const promises = events.map(event => {
            return new Promise(resolve => {
                window.addEventListener(event, e => {
                    resolve(e);
                }, {
                    once: true,
                    capture: true
                });
            });
        });
        return Promise.race(promises);
    }

    _handleEvents(event) {
        if(!this.disableEvents) {
            this.handlers["*"]
                .concat(this.handlers[event.type])
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

    _checkEvents(events) {
        if(events === "*")
            return this.events;

        events = events.split(" ");
        const validEvents = events.every(e => this.events.includes(e));
        if(!validEvents)
            throw new TypeError(`invalid events '${events}', valid events are ${this.events}`);

        return events;
    }
}