"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProgress = exports.applyClasses = exports.getDistance = exports.getStart = exports.getInInitialView = exports.applyTween = void 0;
var regex = /\{(.*?)\}/g;
function replaceString(progress) {
    return function (string) {
        var s = string.slice(1, -1);
        var vals = s.split(',');
        if (vals.length === 2) {
            var from = Number(vals[0]);
            var to = Number(vals[1]);
            var val = (to - from) * progress + from;
            if (isNaN(val)) {
                console.log("You have a css parse error. ".concat(string, " has an invalid number"));
                return string;
            }
            return val.toString();
        }
        console.log("You have a css parse error. ".concat(string, " is required to have a to and from value."));
        return string;
    };
}
function applyTween(tween, progress) {
    var element = tween.element, css = tween.css;
    if (!css)
        return;
    Object.keys(css).forEach(function (key) {
        var string = css[key];
        var replaced = string.replace(regex, replaceString(progress));
        if (!element)
            return;
        element.style[key] = replaced;
    });
}
exports.applyTween = applyTween;
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
function applyClasses(element, progress) {
    if (progress === 0) {
        if (element.classList.contains('belowViewport'))
            return;
        element.classList.add('belowViewport');
        element.classList.remove('aboveViewport', 'inViewport');
    }
    else if (progress === 1) {
        if (element.classList.contains('aboveViewport'))
            return;
        element.classList.add('aboveViewport');
        element.classList.remove('belowViewport', 'inViewport');
    }
    else {
        if (element.classList.contains('inViewport'))
            return;
        element.classList.add('inViewport');
        element.classList.remove('belowViewport', 'aboveViewport');
    }
}
exports.applyClasses = applyClasses;
function getProgress(start, distance, scrollY) {
    return Math.min(1, Math.max(0, (scrollY - start) / distance));
}
exports.getProgress = getProgress;
