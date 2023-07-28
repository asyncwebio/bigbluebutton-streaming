"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CanonicalCodeForDisplayNames = void 0;
var ecma402_abstract_1 = require("@formatjs/ecma402-abstract");
var UNICODE_REGION_SUBTAG_REGEX = /^([a-z]{2}|[0-9]{3})$/i;
var ALPHA_4 = /^[a-z]{4}$/i;
function isUnicodeRegionSubtag(region) {
    return UNICODE_REGION_SUBTAG_REGEX.test(region);
}
function isUnicodeScriptSubtag(script) {
    return ALPHA_4.test(script);
}
function CanonicalCodeForDisplayNames(type, code) {
    if (type === 'language') {
        return (0, ecma402_abstract_1.CanonicalizeLocaleList)([code])[0];
    }
    if (type === 'region') {
        if (!isUnicodeRegionSubtag(code)) {
            throw RangeError('invalid region');
        }
        return code.toUpperCase();
    }
    if (type === 'script') {
        if (!isUnicodeScriptSubtag(code)) {
            throw RangeError('invalid script');
        }
        return "".concat(code[0].toUpperCase()).concat(code.slice(1).toLowerCase());
    }
    (0, ecma402_abstract_1.invariant)(type === 'currency', 'invalid type');
    if (!(0, ecma402_abstract_1.IsWellFormedCurrencyCode)(code)) {
        throw RangeError('invalid currency');
    }
    return code.toUpperCase();
}
exports.CanonicalCodeForDisplayNames = CanonicalCodeForDisplayNames;
