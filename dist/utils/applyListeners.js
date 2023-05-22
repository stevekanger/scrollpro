"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function applyListeners(type, listeners) {
    listeners.forEach(function (listener) {
        var _a, _b;
        if (!listener.condition)
            return;
        if (type === 'add') {
            (_a = listener.element) === null || _a === void 0 ? void 0 : _a.addEventListener(listener.event, listener.fn, listener.options || {});
            return;
        }
        (_b = listener.element) === null || _b === void 0 ? void 0 : _b.removeEventListener(listener.event, listener.fn, listener.options || {});
    });
}
exports.default = applyListeners;
