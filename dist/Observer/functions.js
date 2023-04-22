"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDistance = exports.getStart = exports.getInInitialView = void 0;
function getInInitialView(offsetTop, viewBounds) {
    return offsetTop < viewBounds.height;
}
exports.getInInitialView = getInInitialView;
function getStart(offsetTop, inInitialView, options, viewport) {
    var start = options.start, offsetStart = options.offsetStart;
    if (start)
        return start;
    if (inInitialView)
        return 0 + offsetStart;
    return offsetTop - viewport.getBounds().viewable.height + offsetStart;
}
exports.getStart = getStart;
function getDistance(offsetTop, inInitialView, options, viewport, bounds) {
    var distance = options.distance, offsetStart = options.offsetStart, offsetEnd = options.offsetEnd, normalizeInitialView = options.normalizeInitialView;
    if (distance)
        return Math.max(0, distance);
    var totalOffsets = offsetStart + offsetEnd;
    if (inInitialView && !normalizeInitialView)
        return Math.max(0, offsetTop + bounds.height - totalOffsets);
    return Math.max(0, viewport.getBounds().viewable.height + bounds.height - totalOffsets);
}
exports.getDistance = getDistance;
