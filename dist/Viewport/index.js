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
var applyListeners_1 = __importDefault(require("../utils/applyListeners"));
var functions_1 = require("./functions");
var Viewport = /** @class */ (function () {
    function Viewport(controller, _a) {
        var _b = _a.element, element = _b === void 0 ? window : _b;
        this.controller = controller;
        this.element = element;
        this.touchStart = {
            x: 0,
            y: 0,
        };
        this.bounds = {
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
            width: 0,
            height: 0,
        };
        this.viewableBounds = {
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
            width: 0,
            height: 0,
        };
        this.onKeyDown = this.onKeyDown.bind(this);
        this.onPointerDown = this.onPointerDown.bind(this);
        this.onPointerUp = this.onPointerUp.bind(this);
        this.onPointerMove = this.onPointerMove.bind(this);
        this.onWheel = this.onWheel.bind(this);
        this.init();
    }
    Viewport.prototype.getBounds = function () {
        return __assign(__assign({}, this.bounds), { viewable: this.viewableBounds });
    };
    Viewport.prototype.kill = function () {
        var _a = this.controller, disableKeyNavigation = _a.options.disableKeyNavigation, _b = _a.browserSupport, hasWheel = _b.hasWheel, hasPointer = _b.hasPointer, hasTouch = _b.hasTouch, hasKeyDown = _b.hasKeyDown;
        this.controller.viewport = null;
        document.body.style.touchAction = 'pinch-zoom';
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
                condition: hasPointer && hasTouch,
            },
            {
                element: this.element,
                event: 'pointerup',
                fn: this.onPointerUp,
                condition: hasPointer && hasTouch,
            },
            {
                element: document,
                event: 'keydown',
                fn: this.onKeyDown,
                condition: !disableKeyNavigation && hasKeyDown,
            },
        ]);
    };
    Viewport.prototype.init = function () {
        var _a = this.controller, disableKeyNavigation = _a.options.disableKeyNavigation, _b = _a.browserSupport, hasWheel = _b.hasWheel, hasPointer = _b.hasPointer, hasTouch = _b.hasTouch, hasKeyDown = _b.hasKeyDown;
        this.construct();
        document.body.style.touchAction = 'pinch-zoom';
        (0, applyListeners_1.default)('add', [
            {
                element: this.element,
                event: 'wheel',
                fn: this.onWheel,
                condition: hasWheel,
                options: {
                    passive: false,
                },
            },
            {
                element: this.element,
                event: 'pointerdown',
                fn: this.onPointerDown,
                condition: hasPointer && hasTouch,
            },
            {
                element: this.element,
                event: 'pointerup',
                fn: this.onPointerUp,
                condition: hasPointer && hasTouch,
            },
            {
                element: document,
                event: 'keydown',
                fn: this.onKeyDown,
                condition: !disableKeyNavigation && hasKeyDown,
            },
        ]);
    };
    Viewport.prototype.construct = function () {
        this.bounds = (0, getBounds_1.default)(this.element);
        this.viewableBounds = (0, functions_1.getViewableBounds)(this.bounds, this.element);
    };
    Viewport.prototype.onWheel = function (e) {
        e.preventDefault();
        e.stopPropagation();
        var _a = this.controller.options, firefoxMult = _a.firefoxMult, mouseMult = _a.mouseMult;
        var x = -e.deltaX;
        var y = -e.deltaY;
        if (this.controller.browserSupport.isFirefox && e.deltaMode === 1) {
            x *= firefoxMult;
            y *= firefoxMult;
        }
        x *= mouseMult;
        y *= mouseMult;
        var _b = this.controller.scroll, deltaX = _b.deltaX, deltaY = _b.deltaY;
        deltaX -= x;
        deltaY -= y;
        this.controller.scrollTo({ y: deltaY, x: deltaX });
    };
    Viewport.prototype.onPointerUp = function (e) {
        if (e.pointerType === 'mouse')
            return;
        window.removeEventListener('pointermove', this.onPointerMove);
    };
    Viewport.prototype.onPointerDown = function (e) {
        if (e.pointerType === 'mouse')
            return;
        if (e.stopPropagation)
            e.stopPropagation();
        this.touchStart.x = e.pageX;
        this.touchStart.y = e.pageY;
        this.onPointerMove(e);
        window.addEventListener('pointermove', this.onPointerMove);
    };
    Viewport.prototype.onPointerMove = function (e) {
        var touchMult = this.controller.options.touchMult;
        var x = (e.pageX - this.touchStart.x) * touchMult;
        var y = (e.pageY - this.touchStart.y) * touchMult;
        this.touchStart.x = e.pageX;
        this.touchStart.y = e.pageY;
        var _a = this.controller.scroll, deltaX = _a.deltaX, deltaY = _a.deltaY;
        deltaX -= x;
        deltaY -= y;
        this.controller.scrollTo({ y: deltaY, x: deltaX });
    };
    Viewport.prototype.onKeyDown = function (e) {
        var limitY = this.controller.scroll.limitY;
        var keyStep = this.controller.options.keyStep;
        var _a = (0, functions_1.getDeltaFromKey)(e, limitY, keyStep), x = _a.x, y = _a.y;
        var _b = this.controller.scroll, deltaX = _b.deltaX, deltaY = _b.deltaY;
        deltaX -= x;
        deltaY -= y;
        this.controller.scrollTo({ y: deltaY, x: deltaX });
    };
    return Viewport;
}());
exports.default = Viewport;
