"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
function applyTween(element, progress, css) {
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
exports.default = applyTween;
