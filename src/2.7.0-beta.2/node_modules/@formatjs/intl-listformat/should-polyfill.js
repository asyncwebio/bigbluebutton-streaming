"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.shouldPolyfill = void 0;
var intl_localematcher_1 = require("@formatjs/intl-localematcher");
var supported_locales_generated_1 = require("./supported-locales.generated");
function supportedLocalesOf(locale) {
    if (!locale) {
        return true;
    }
    var locales = Array.isArray(locale) ? locale : [locale];
    return (Intl.ListFormat.supportedLocalesOf(locales).length ===
        locales.length);
}
function shouldPolyfill(locale) {
    if (locale === void 0) { locale = 'en'; }
    if (!('ListFormat' in Intl) || !supportedLocalesOf(locale)) {
        return locale ? (0, intl_localematcher_1.match)([locale], supported_locales_generated_1.supportedLocales, 'en') : undefined;
    }
}
exports.shouldPolyfill = shouldPolyfill;
