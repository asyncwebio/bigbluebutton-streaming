"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CanonicalCodeForDisplayNames = void 0;
var ecma402_abstract_1 = require("@formatjs/ecma402-abstract");
var IsValidDateTimeFieldCode_1 = require("./IsValidDateTimeFieldCode");
var UNICODE_REGION_SUBTAG_REGEX = /^([a-z]{2}|[0-9]{3})$/i;
var ALPHA_4 = /^[a-z]{4}$/i;
var UNICODE_TYPE_REGEX = /^[a-z0-9]{3,8}([-_][a-z0-9]{3,8})*$/i;
function isUnicodeRegionSubtag(region) {
    return UNICODE_REGION_SUBTAG_REGEX.test(region);
}
function isUnicodeScriptSubtag(script) {
    return ALPHA_4.test(script);
}
function isUnicodeLocaleIdentifierType(code) {
    return UNICODE_TYPE_REGEX.test(code);
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
    if (type === 'calendar') {
        if (!isUnicodeLocaleIdentifierType(code)) {
            throw RangeError('invalid calendar');
        }
        return code.toLowerCase();
    }
    if (type === 'dateTimeField') {
        if (!(0, IsValidDateTimeFieldCode_1.IsValidDateTimeFieldCode)(code)) {
            throw RangeError('invalid dateTimeField');
        }
        return code;
    }
    (0, ecma402_abstract_1.invariant)(type === 'currency', 'invalid type');
    if (!(0, ecma402_abstract_1.IsWellFormedCurrencyCode)(code)) {
        throw RangeError('invalid currency');
    }
    return code.toUpperCase();
}
exports.CanonicalCodeForDisplayNames = CanonicalCodeForDisplayNames;
