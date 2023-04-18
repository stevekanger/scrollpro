"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function getOffsetTop(elTop, viewportTop, scrollY) {
    return elTop + scrollY - viewportTop;
}
exports.default = getOffsetTop;
