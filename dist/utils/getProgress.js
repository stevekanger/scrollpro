"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function getProgress(start, distance, scrollY) {
    var progress = Math.min(1, Math.max(0, (scrollY - start) / distance));
    return isNaN(progress) ? 0 : progress;
}
exports.default = getProgress;
