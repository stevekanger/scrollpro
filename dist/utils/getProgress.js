"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function getProgress(start, distance, scrollY) {
    var progress = Math.min(1, Math.max(0, (scrollY - start) / distance));
    return progress ? progress : 0;
}
exports.default = getProgress;
