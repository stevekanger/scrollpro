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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var getBounds_1 = __importDefault(require("../utils/getBounds"));
var getProgress_1 = __importDefault(require("../utils/getProgress"));
var functions_1 = require("./functions");
var Sticky = /** @class */ (function () {
    function Sticky(controller, _a) {
        var element = _a.element, _b = _a.top, top = _b === void 0 ? 0 : _b, _c = _a.bottom, bottom = _c === void 0 ? 0 : _c, start = _a.start, distance = _a.distance, _d = _a.ignoreBounds, ignoreBounds = _d === void 0 ? false : _d;
        this.controller = controller;
        this.element = element;
        this.start = 0;
        this.distance = 0;
        this.progress = undefined;
        this.options = {
            top: top,
            bottom: bottom,
            start: start,
            distance: distance,
            ignoreBounds: ignoreBounds,
        };
        this.bounds = {
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            width: 0,
            height: 0,
        };
        this.init();
    }
    Sticky.prototype.setOptions = function (options) {
        this.options = __assign(__assign({}, this.options), options);
    };
    Sticky.prototype.construct = function () {
        var viewport = this.controller.viewport;
        if (!viewport)
            return;
        this.progress = undefined;
        this.element.style.transform = 'translateY(0)';
        this.bounds = (0, getBounds_1.default)(this.element);
        this.start = (0, functions_1.getStart)(this.controller.scroll.scrollY, viewport, this.options, this.bounds);
        this.distance = (0, functions_1.getDistance)(this.element, this.options, this.bounds);
        this.update();
    };
    Sticky.prototype.init = function () {
        this.construct();
        this.controller.items.sticky.add(this);
    };
    Sticky.prototype.kill = function () {
        this.controller.items.sticky.delete(this);
    };
    Sticky.prototype.update = function () {
        var scrollY = this.controller.scroll.scrollY;
        var pos = Math.min(this.distance, Math.max(0, scrollY - this.start));
        var progress = (0, getProgress_1.default)(this.start, this.distance, scrollY);
        if ((this.progress === 0 && progress === 0) ||
            (this.progress === 1 && progress === 1))
            return;
        this.element.style.transform = "translateY(".concat(pos, "px)");
        this.progress = progress;
    };
    Sticky.prototype.refresh = function () {
        this.construct();
    };
    return Sticky;
}());
exports.default = Sticky;
