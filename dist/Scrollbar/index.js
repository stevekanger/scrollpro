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
var functions_1 = require("./functions");
var applyListeners_1 = __importDefault(require("../utils/applyListeners"));
var Scrollbar = /** @class */ (function () {
    function Scrollbar(controller, _a) {
        var element = _a.element, _b = _a.axis, axis = _b === void 0 ? 'y' : _b, _c = _a.orientation, orientation = _c === void 0 ? 'vertical' : _c, _d = _a.useAnimation, useAnimation = _d === void 0 ? true : _d;
        this.controller = controller;
        this.element = element;
        this.track = document.createElement('div');
        this.thumb = document.createElement('span');
        this.options = {
            axis: axis,
            orientation: orientation,
            useAnimation: useAnimation,
        };
        this.bounds = {
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
            width: 0,
            height: 0,
        };
        this.onPointerDown = this.onPointerDown.bind(this);
        this.onPointerMove = this.onPointerMove.bind(this);
        this.onPointerUp = this.onPointerUp.bind(this);
        this.onWheel = this.onWheel.bind(this);
        this.init();
    }
    Scrollbar.prototype.setOptions = function (options) {
        this.options = __assign(__assign({}, this.options), options);
    };
    Scrollbar.prototype.init = function () {
        this.element.appendChild(this.track);
        this.track.appendChild(this.thumb);
        (0, functions_1.setStyles)(this.options.orientation, this.track, this.thumb);
        this.bounds = (0, getBounds_1.default)(this.track);
        this.controller.items.scrollbar.add(this);
        this.update();
        var _a = this.controller.browserSupport, hasWheel = _a.hasWheel, hasPointer = _a.hasPointer;
        (0, applyListeners_1.default)('add', [
            {
                element: this.element,
                event: 'wheel',
                fn: this.onWheel,
                condition: hasWheel,
            },
            {
                element: this.element,
                event: 'pointerdown',
                fn: this.onPointerDown,
                condition: hasPointer,
            },
            {
                element: window,
                event: 'pointerup',
                fn: this.onPointerUp,
                condition: hasPointer,
            },
        ]);
    };
    Scrollbar.prototype.kill = function () {
        this.controller.items.scrollbar.delete(this);
        this.track.remove();
        var _a = this.controller.browserSupport, hasWheel = _a.hasWheel, hasPointer = _a.hasPointer;
        (0, applyListeners_1.default)('remove', [
            {
                element: this.element,
                event: 'wheel',
                fn: this.onWheel,
                condition: hasWheel,
            },
            {
                element: this.element,
                event: 'pointerdown',
                fn: this.onPointerDown,
                condition: hasPointer,
            },
            {
                element: window,
                event: 'pointerup',
                fn: this.onPointerUp,
                condition: hasPointer,
            },
        ]);
    };
    Scrollbar.prototype.update = function () {
        var _a = this.controller.scroll, progressX = _a.progressX, progressY = _a.progressY;
        var _b = this.options, axis = _b.axis, orientation = _b.orientation;
        var percent = axis === 'y' ? progressY * 100 : progressX * 100;
        this.thumb.style.transform =
            orientation === 'vertical'
                ? "translateY(".concat(percent, "%)")
                : "translateX(".concat(percent, "%)");
    };
    Scrollbar.prototype.refresh = function () {
        var orientation = this.options.orientation;
        this.thumb.style.right = orientation === 'vertical' ? '0' : '100%';
        this.thumb.style.bottom = orientation === 'vertical' ? '100%' : '0';
        this.bounds = (0, getBounds_1.default)(this.track);
        this.update();
    };
    Scrollbar.prototype.preventSelect = function (e) {
        e.preventDefault();
    };
    Scrollbar.prototype.onPointerDown = function (e) {
        this.onPointerMove(e);
        window.addEventListener('pointermove', this.onPointerMove);
        window.addEventListener('selectstart', this.preventSelect);
    };
    Scrollbar.prototype.onPointerUp = function (e) {
        window.removeEventListener('pointermove', this.onPointerMove);
        window.removeEventListener('selectstart', this.preventSelect);
    };
    Scrollbar.prototype.onPointerMove = function (e) {
        e.stopPropagation();
        var _a = this.controller.scroll, deltaX = _a.deltaX, deltaY = _a.deltaY, limitX = _a.limitX, limitY = _a.limitY;
        var _b = this.options, axis = _b.axis, orientation = _b.orientation, useAnimation = _b.useAnimation;
        var limit = axis === 'y' ? limitY : limitX;
        if (limit === Infinity || limit <= 0)
            return;
        var isVertical = orientation === 'vertical';
        var trackLength = isVertical ? this.bounds.height : this.bounds.width;
        var trackStart = isVertical ? this.bounds.top : this.bounds.left;
        var pointerPos = isVertical ? e.pageY : e.pageX;
        var pos = (limit / trackLength) * (pointerPos - trackStart);
        if (axis === 'y') {
            this.controller.scrollTo({
                x: deltaX,
                y: pos,
                animate: useAnimation,
            });
            return;
        }
        this.controller.scrollTo({
            x: pos,
            y: deltaY,
            animate: useAnimation,
        });
    };
    Scrollbar.prototype.onWheel = function (e) {
        var _a = this.controller, _b = _a.scroll, deltaX = _b.deltaX, deltaY = _b.deltaY, _c = _a.options, firefoxMult = _c.firefoxMult, mouseMult = _c.mouseMult;
        var useAnimation = this.options.useAnimation;
        var dx = -e.deltaX;
        var dy = -e.deltaY;
        if (navigator.userAgent.indexOf('Firefox') > -1 && e.deltaMode === 1) {
            dx *= firefoxMult;
            dy *= firefoxMult;
        }
        dx *= mouseMult;
        dy *= mouseMult;
        this.controller.scrollTo({
            x: deltaX - dx,
            y: deltaY - dy,
            animate: useAnimation,
        });
    };
    return Scrollbar;
}());
exports.default = Scrollbar;
