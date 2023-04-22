"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function getProgress(start, distance, scrollY) {
    return Math.min(1, Math.max(0, (scrollY - start) / distance));
}
exports.default = getProgress;
