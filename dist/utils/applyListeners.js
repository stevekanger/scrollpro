"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function applyListeners(type, listeners) {
    listeners.forEach(function (listener) {
        if (!listener.condition)
            return;
        if (type === 'add') {
            listener.element.addEventListener(listener.event, listener.fn);
            return;
        }
        listener.element.removeEventListener(listener.event, listener.fn);
    });
}
exports.default = applyListeners;
