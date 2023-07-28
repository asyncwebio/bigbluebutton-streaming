"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.shouldPolyfill = exports._shouldPolyfillWithoutLocale = void 0;
var intl_localematcher_1 = require("@formatjs/intl-localematcher");
var supported_locales_generated_1 = require("./supported-locales.generated");
/**
 * https://bugs.chromium.org/p/chromium/issues/detail?id=1097432
 */
function hasMissingICUBug() {
    var DisplayNames = Intl.DisplayNames;
    if (DisplayNames && !DisplayNames.polyfilled) {
        return (new DisplayNames(['en'], {
            type: 'region',
        }).of('CA') === 'CA');
    }
    return false;
}
/**
 * https://bugs.chromium.org/p/chromium/issues/detail?id=1176979
 */
function hasScriptBug() {
    var DisplayNames = Intl.DisplayNames;
    if (DisplayNames && !DisplayNames.polyfilled) {
        return (new DisplayNames(['en'], {
            type: 'script',
        }).of('arab') !== 'Arabic');
    }
    return false;
}
function supportedLocalesOf(locale) {
    if (!locale) {
        return true;
    }
    var locales = Array.isArray(locale) ? locale : [locale];
    return (Intl.DisplayNames.supportedLocalesOf(locales).length ===
        locales.length);
}
function _shouldPolyfillWithoutLocale() {
    return !Intl.DisplayNames || hasMissingICUBug() || hasScriptBug();
}
exports._shouldPolyfillWithoutLocale = _shouldPolyfillWithoutLocale;
function shouldPolyfill(locale) {
    if (locale === void 0) { locale = 'en'; }
    try {
        if (_shouldPolyfillWithoutLocale() || !supportedLocalesOf(locale)) {
            return (0, intl_localematcher_1.match)([locale], supported_locales_generated_1.supportedLocales, 'en');
        }
    }
    catch (e) {
        return true;
    }
}
exports.shouldPolyfill = shouldPolyfill;
