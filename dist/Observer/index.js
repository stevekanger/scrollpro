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
var getOffsetTop_1 = __importDefault(require("../utils/getOffsetTop"));
var applyClasses_1 = __importDefault(require("../utils/applyClasses"));
var applyTween_1 = __importDefault(require("../utils/applyTween"));
var getProgress_1 = __importDefault(require("../utils/getProgress"));
var functions_1 = require("./functions");
var Observer = /** @class */ (function () {
    function Observer(controller, _a) {
        var element = _a.element, _b = _a.normalizeInitialView, normalizeInitialView = _b === void 0 ? false : _b, _c = _a.offsetStart, offsetStart = _c === void 0 ? 0 : _c, _d = _a.offsetEnd, offsetEnd = _d === void 0 ? 0 : _d, start = _a.start, distance = _a.distance, _e = _a.callback, callback = _e === void 0 ? function () { } : _e;
        this.controller = controller;
        this.element = element;
        this.start = 0;
        this.distance = 0;
        this.progress = null;
        this.options = {
            normalizeInitialView: normalizeInitialView,
            offsetStart: offsetStart,
            offsetEnd: offsetEnd,
            start: start,
            distance: distance,
            callback: callback,
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
    Observer.prototype.setOptions = function (options) {
        this.options = __assign(__assign({}, this.options), options);
    };
    Observer.prototype.construct = function () {
        var viewport = this.controller.viewport;
        if (!viewport)
            return;
        var callback = this.options.callback;
        callback({ element: this.element, progress: 0, applyClasses: applyClasses_1.default, applyTween: applyTween_1.default });
        this.bounds = (0, getBounds_1.default)(this.element);
        var viewBounds = viewport.getBounds().viewable;
        var scrollY = this.controller.scroll.scrollY;
        var offsetTop = (0, getOffsetTop_1.default)(this.bounds.top, viewBounds.top, scrollY);
        var inInitialView = (0, functions_1.getInInitialView)(offsetTop, viewBounds);
        this.start = (0, functions_1.getStart)(offsetTop, inInitialView, this.options, viewport);
        this.distance = (0, functions_1.getDistance)(offsetTop, inInitialView, this.options, viewport, this.bounds);
        this.update();
    };
    Observer.prototype.init = function () {
        this.construct();
        this.controller.items.observer.add(this);
    };
    Observer.prototype.kill = function () {
        this.controller.items.observer.delete(this);
    };
    Observer.prototype.update = function () {
        var scrollY = this.controller.scroll.scrollY;
        var callback = this.options.callback;
        var progress = (0, getProgress_1.default)(this.start, this.distance, scrollY);
        if ((this.progress === 0 && progress === 0) ||
            (this.progress === 1 && progress === 1))
            return;
        callback({ element: this.element, progress: progress, applyClasses: applyClasses_1.default, applyTween: applyTween_1.default });
        this.progress = progress;
    };
    Observer.prototype.refresh = function () {
        this.construct();
    };
    return Observer;
}());
exports.default = Observer;
