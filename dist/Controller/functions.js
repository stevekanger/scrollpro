"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLerpScroll = exports.getScrollDiff = exports.setScrollToDeltas = exports.setScrollDeltas = exports.getProgress = void 0;
function getProgress(scroll, limit) {
    return limit > 0 ? scroll / limit : 0;
}
exports.getProgress = getProgress;
function lerp(start, end, ease) {
    return (1 - ease) * start + ease * end;
}
function setScrollDeltas(x, y, scroll) {
    var deltaX = scroll.deltaX, deltaY = scroll.deltaY, limitX = scroll.limitX, limitY = scroll.limitY;
    deltaX = x !== undefined ? x : deltaX;
    deltaY = y !== undefined ? y : deltaY;
    deltaX = Math.max(0, deltaX);
    deltaY = Math.max(0, deltaY);
    deltaX = Math.min(limitX, deltaX);
    deltaY = Math.min(limitY, deltaY);
    return __assign(__assign({}, scroll), { deltaX: deltaX, deltaY: deltaY });
}
exports.setScrollDeltas = setScrollDeltas;
function setScrollToDeltas(scroll) {
    var scrollX = scroll.deltaX;
    var scrollY = scroll.deltaY;
    var progressX = getProgress(scroll.deltaX, scroll.limitX);
    var progressY = getProgress(scroll.deltaY, scroll.limitY);
    return __assign(__assign({}, scroll), { scrollX: scrollX, scrollY: scrollY, progressX: progressX, progressY: progressY });
}
exports.setScrollToDeltas = setScrollToDeltas;
function getScrollDiff(scroll) {
    return {
        diffX: scroll.scrollX - scroll.deltaX,
        diffY: scroll.scrollY - scroll.deltaY,
    };
}
exports.getScrollDiff = getScrollDiff;
function getLerpScroll(scroll, options) {
    var scrollX = lerp(scroll.scrollX, scroll.deltaX, options.ease);
    var scrollY = lerp(scroll.scrollY, scroll.deltaY, options.ease);
    var progressX = getProgress(scroll.scrollX, scroll.limitX);
    var progressY = getProgress(scroll.scrollY, scroll.limitY);
    return __assign(__assign({}, scroll), { scrollX: scrollX, scrollY: scrollY, progressX: progressX, progressY: progressY });
}
exports.getLerpScroll = getLerpScroll;
