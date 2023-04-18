"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDistance = exports.getStart = void 0;
var getOffsetTop_1 = __importDefault(require("../utils/getOffsetTop"));
var getBounds_1 = __importDefault(require("../utils/getBounds"));
var getComputedStyle_1 = __importDefault(require("../utils/getComputedStyle"));
function getStart(scrollY, viewport, options, bounds) {
    var top = options.top, start = options.start;
    if (start)
        return start;
    var viewportTop = viewport.getBounds().viewable.top || 0;
    var offsetTop = (0, getOffsetTop_1.default)(bounds.top, viewportTop, scrollY);
    return offsetTop - top;
}
exports.getStart = getStart;
function getDistance(element, options, bounds) {
    var bottom = options.bottom, ignoreBounds = options.ignoreBounds, distance = options.distance;
    if (distance)
        return distance;
    if (ignoreBounds)
        return Infinity;
    var parentNode = element.parentNode;
    var parentPadding = (0, getComputedStyle_1.default)(parentNode, 'padding');
    var elementMargin = (0, getComputedStyle_1.default)(element, 'margin');
    var parentBounds = (0, getBounds_1.default)(parentNode);
    return (((parentBounds === null || parentBounds === void 0 ? void 0 : parentBounds.height) || 0) -
        bounds.height -
        (parentPadding.totals.vertical || 0) -
        (elementMargin.totals.vertical || 0) -
        bottom);
}
exports.getDistance = getDistance;
