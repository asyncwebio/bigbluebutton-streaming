"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _1 = require("./");
var should_polyfill_1 = require("./should-polyfill");
if ((0, should_polyfill_1.shouldPolyfill)()) {
    Object.defineProperty(Intl, 'DisplayNames', {
        value: _1.DisplayNames,
        enumerable: false,
        writable: true,
        configurable: true,
    });
}
