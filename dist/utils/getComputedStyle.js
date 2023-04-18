"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var isElement_1 = __importDefault(require("./isElement"));
function getComputedStyle(element, value) {
    var styles = {
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        totals: {
            vertical: 0,
            horizontal: 0,
        },
    };
    if (!(0, isElement_1.default)(element))
        return styles;
    var computed = window.getComputedStyle(element);
    if (!computed) {
        return styles;
    }
    styles.top = parseFloat(computed["".concat(value, "Top")]);
    styles.bottom = parseFloat(computed["".concat(value, "Bottom")]);
    styles.left = parseFloat(computed["".concat(value, "Left")]);
    styles.right = parseFloat(computed["".concat(value, "Right")]);
    styles.totals.vertical = styles.top + styles.bottom;
    styles.totals.horizontal = styles.left + styles.right;
    return styles;
}
exports.default = getComputedStyle;
