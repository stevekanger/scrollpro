"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var getBounds_1 = __importDefault(require("../utils/getBounds"));
var Content = /** @class */ (function () {
    function Content(controller, _a) {
        var element = _a.element;
        this.controller = controller;
        this.element = element;
        this.init();
    }
    Content.prototype.construct = function () {
        var viewport = this.controller.viewport;
        if (!viewport)
            return;
        var bounds = (0, getBounds_1.default)(this.element);
        var viewportBounds = viewport.getBounds().viewable;
        var x = bounds.width - viewportBounds.width;
        var y = bounds.height - viewportBounds.height;
        this.controller.setLimit({ x: x, y: y });
    };
    Content.prototype.init = function () {
        this.construct();
    };
    Content.prototype.kill = function () {
        this.controller.content = null;
    };
    Content.prototype.refresh = function () {
        this.construct();
    };
    Content.prototype.update = function () {
        var _a = this.controller.scroll, scrollX = _a.scrollX, scrollY = _a.scrollY;
        this.element.style.transform = "translate(".concat(-scrollX, "px, ").concat(-scrollY, "px)");
    };
    return Content;
}());
exports.default = Content;
