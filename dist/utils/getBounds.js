"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var isElement_1 = __importDefault(require("./isElement"));
function getBounds(element) {
    var bounds = {
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        width: 0,
        height: 0,
    };
    if (element === window) {
        bounds.width = window.innerWidth;
        bounds.height = window.innerHeight;
        return bounds;
    }
    if (!(0, isElement_1.default)(element)) {
        return bounds;
    }
    var rect = element.getBoundingClientRect();
    bounds.top = rect.top;
    bounds.bottom = rect.bottom;
    bounds.left = rect.left;
    bounds.right = rect.right;
    bounds.width = rect.width;
    bounds.height = rect.height;
    return bounds;
}
exports.default = getBounds;
