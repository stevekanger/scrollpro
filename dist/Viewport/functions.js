"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDeltaFromKey = exports.getViewableBounds = void 0;
var getComputedStyle_1 = __importDefault(require("../utils/getComputedStyle"));
function getViewableBounds(bounds, element) {
    var borders = (0, getComputedStyle_1.default)(element, 'border');
    return {
        top: bounds.top + borders.top,
        bottom: bounds.bottom + borders.bottom,
        left: bounds.left + borders.left,
        right: bounds.right + borders.right,
        width: bounds.width - (borders.left + borders.right),
        height: bounds.height - (borders.top + borders.bottom),
    };
}
exports.getViewableBounds = getViewableBounds;
function getDeltaFromKey(e, limitY, keyStep) {
    var x = 0;
    var y = 0;
    switch (e.key) {
        case 'ArrowLeft':
            x = -keyStep;
            break;
        case 'ArrowUp':
            y = keyStep;
            break;
        case 'ArrowRight':
            x = keyStep;
            break;
        case 'ArrowDown':
            y = -keyStep;
            break;
        case 'PageUp':
            y += window.innerHeight;
            break;
        case 'PageDown':
            y -= window.innerHeight;
            break;
        case 'Home':
            y = 0;
            break;
        case 'End':
            y = limitY || 0;
            break;
        case 'Space':
            if (!(document.activeElement instanceof HTMLInputElement) &&
                !(document.activeElement instanceof HTMLTextAreaElement)) {
                if (e.shiftKey) {
                    y -= window.innerHeight;
                }
                else {
                    y += window.innerHeight;
                }
            }
            break;
        default:
            return { x: x, y: y };
    }
    return { x: x, y: y };
}
exports.getDeltaFromKey = getDeltaFromKey;
