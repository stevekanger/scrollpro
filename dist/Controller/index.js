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
var Viewport_1 = __importDefault(require("../Viewport"));
var Content_1 = __importDefault(require("../Content"));
var Scrollbar_1 = __importDefault(require("../Scrollbar"));
var Sticky_1 = __importDefault(require("../Sticky"));
var Observer_1 = __importDefault(require("../Observer"));
var functions_1 = require("./functions");
var Controller = /** @class */ (function () {
    function Controller(options) {
        this.aF = null;
        this.viewport = null;
        this.content = null;
        this.items = {
            sticky: new Set(),
            scrollbar: new Set(),
            observer: new Set(),
        };
        this.options = __assign(__assign({}, options), { ease: 0.1, keyStep: 120, disableKeyNavigation: false, firefoxMult: 15, touchMult: 2, mouseMult: 1 });
        this.listeners = {
            init: new Set(),
            kill: new Set(),
            refresh: new Set(),
            update: new Set(),
        };
        this.scroll = {
            scrollX: 0,
            scrollY: 0,
            deltaX: 0,
            deltaY: 0,
            limitX: Infinity,
            limitY: Infinity,
            progressX: 0,
            progressY: 0,
        };
        this.browserSupport = {
            hasWheel: 'onwheel' in document,
            hasTouch: 'ontouchstart' in document,
            hasPointer: 'PointerEvent' in window,
            hasKeyDown: 'onkeydown' in document,
            isFirefox: navigator.userAgent.indexOf('Firefox') > -1,
        };
        this.refresh = this.refresh.bind(this);
        this.animateScroll = this.animateScroll.bind(this);
    }
    Controller.prototype.getScroll = function () {
        return this.scroll;
    };
    Controller.prototype.setOptions = function (options) {
        this.options = __assign(__assign({}, this.options), options);
    };
    Controller.prototype.on = function (e, fn) {
        var _a;
        (_a = this.listeners[e]) === null || _a === void 0 ? void 0 : _a.add(fn);
    };
    Controller.prototype.off = function (e, fn) {
        var _a;
        (_a = this.listeners[e]) === null || _a === void 0 ? void 0 : _a.delete(fn);
    };
    Controller.prototype.fire = function (e) {
        var _this = this;
        var events = ['init', 'kill', 'update', 'refresh'];
        if (!events.includes(e))
            return;
        var runOrder = ['scrollbar', 'sticky', 'observer'];
        if (this.content)
            this.content[e]();
        runOrder.forEach(function (key) {
            var _a;
            (_a = _this.items[key]) === null || _a === void 0 ? void 0 : _a.forEach(function (item) {
                item[e]();
            });
        });
        this.listeners[e].forEach(function (listener) { return listener(_this.scroll); });
    };
    Controller.prototype.kill = function () {
        var _a;
        (_a = this.viewport) === null || _a === void 0 ? void 0 : _a.kill();
        this.fire('kill');
        this.viewport = null;
        this.content = null;
        window.removeEventListener('resize', this.refresh);
    };
    Controller.prototype.refresh = function () {
        this.fire('refresh');
    };
    Controller.prototype.update = function () {
        this.fire('update');
    };
    Controller.prototype.createViewport = function (args) {
        if (this.viewport) {
            throw new Error('You already have viewport initialized for this controller. Please kill the previous viewport before initializing another content instance.');
        }
        this.viewport = new Viewport_1.default(this, __assign({}, args));
        this.fire('init');
        window.addEventListener('resize', this.refresh);
        return this.viewport;
    };
    Controller.prototype.createContent = function (args) {
        if (this.content) {
            throw new Error('You already have content initialized for this controller. Please kill the previous content before initializing another content instance.');
        }
        var content = new Content_1.default(this, args);
        this.content = content;
        return content;
    };
    Controller.prototype.createScrollbar = function (args) {
        var scrollbar = new Scrollbar_1.default(this, args);
        this.items.scrollbar.add(scrollbar);
        return scrollbar;
    };
    Controller.prototype.createObserver = function (args) {
        var observer = new Observer_1.default(this, args);
        this.items.observer.add(observer);
        return observer;
    };
    Controller.prototype.createSticky = function (args) {
        var sticky = new Sticky_1.default(this, args);
        this.items.sticky.add(sticky);
        return sticky;
    };
    Controller.prototype.setLimit = function (_a) {
        var _b = _a.x, x = _b === void 0 ? this.scroll.limitX : _b, _c = _a.y, y = _c === void 0 ? this.scroll.limitY : _c;
        this.scroll.limitX = Math.max(0, x);
        this.scroll.limitY = Math.max(0, y);
        this.scroll.scrollX = Math.min(this.scroll.scrollX, this.scroll.limitX);
        this.scroll.scrollY = Math.min(this.scroll.scrollY, this.scroll.limitY);
        this.fire('update');
    };
    Controller.prototype.scrollTo = function (_a) {
        var x = _a.x, y = _a.y, _b = _a.animate, animate = _b === void 0 ? true : _b;
        this.scroll = (0, functions_1.setScrollDeltas)(x, y, this.scroll);
        if ((this.scroll.deltaX === this.scroll.scrollX &&
            this.scroll.deltaY === this.scroll.scrollY) ||
            this.aF) {
            return;
        }
        if (animate) {
            this.aF = requestAnimationFrame(this.animateScroll);
            return;
        }
        this.scroll = (0, functions_1.setScrollToDeltas)(this.scroll);
        this.fire('update');
    };
    Controller.prototype.animateScroll = function () {
        var _a = (0, functions_1.getScrollDiff)(this.scroll), diffX = _a.diffX, diffY = _a.diffY;
        if (Math.abs(diffX) > 0.2 || Math.abs(diffY) > 0.2) {
            this.scroll = (0, functions_1.getLerpScroll)(this.scroll, this.options);
            this.aF = requestAnimationFrame(this.animateScroll);
        }
        else {
            if (this.aF)
                cancelAnimationFrame(this.aF);
            this.aF = null;
            this.scroll = (0, functions_1.setScrollToDeltas)(this.scroll);
        }
        this.fire('update');
    };
    return Controller;
}());
exports.default = Controller;
