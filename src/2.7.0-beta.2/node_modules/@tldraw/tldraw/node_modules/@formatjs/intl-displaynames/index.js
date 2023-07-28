"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DisplayNames = void 0;
var tslib_1 = require("tslib");
var ecma402_abstract_1 = require("@formatjs/ecma402-abstract");
var CanonicalCodeForDisplayNames_1 = require("./abstract/CanonicalCodeForDisplayNames");
var IsValidDateTimeFieldCode_1 = require("./abstract/IsValidDateTimeFieldCode");
var intl_localematcher_1 = require("@formatjs/intl-localematcher");
var DisplayNames = /** @class */ (function () {
    function DisplayNames(locales, options) {
        var _newTarget = this.constructor;
        if (_newTarget === undefined) {
            throw TypeError("Constructor Intl.DisplayNames requires 'new'");
        }
        var requestedLocales = (0, ecma402_abstract_1.CanonicalizeLocaleList)(locales);
        options = (0, ecma402_abstract_1.GetOptionsObject)(options);
        var opt = Object.create(null);
        var localeData = DisplayNames.localeData;
        var matcher = (0, ecma402_abstract_1.GetOption)(options, 'localeMatcher', 'string', ['lookup', 'best fit'], 'best fit');
        opt.localeMatcher = matcher;
        var r = (0, intl_localematcher_1.ResolveLocale)(DisplayNames.availableLocales, requestedLocales, opt, [], // there is no relevantExtensionKeys
        DisplayNames.localeData, DisplayNames.getDefaultLocale);
        var style = (0, ecma402_abstract_1.GetOption)(options, 'style', 'string', ['narrow', 'short', 'long'], 'long');
        setSlot(this, 'style', style);
        var type = (0, ecma402_abstract_1.GetOption)(options, 'type', 'string', ['language', 'region', 'script', 'currency', 'calendar', 'dateTimeField'], undefined);
        if (type === undefined) {
            throw TypeError("Intl.DisplayNames constructor requires \"type\" option");
        }
        setSlot(this, 'type', type);
        var fallback = (0, ecma402_abstract_1.GetOption)(options, 'fallback', 'string', ['code', 'none'], 'code');
        setSlot(this, 'fallback', fallback);
        setSlot(this, 'locale', r.locale);
        var dataLocale = r.dataLocale;
        var dataLocaleData = localeData[dataLocale];
        (0, ecma402_abstract_1.invariant)(!!dataLocaleData, "Missing locale data for ".concat(dataLocale));
        setSlot(this, 'localeData', dataLocaleData);
        (0, ecma402_abstract_1.invariant)(dataLocaleData !== undefined, "locale data for ".concat(r.locale, " does not exist."));
        var types = dataLocaleData.types;
        (0, ecma402_abstract_1.invariant)(typeof types === 'object' && types != null, 'invalid types data');
        var typeFields = types[type];
        (0, ecma402_abstract_1.invariant)(typeof typeFields === 'object' && typeFields != null, 'invalid typeFields data');
        var languageDisplay = (0, ecma402_abstract_1.GetOption)(options, 'languageDisplay', 'string', ['dialect', 'standard'], 'dialect');
        if (type === 'language') {
            setSlot(this, 'languageDisplay', languageDisplay);
            // Using types[type] instead of typeFields because TypeScript cannot infer the correct type
            var typeFields_1 = types[type][languageDisplay];
            (0, ecma402_abstract_1.invariant)(typeof typeFields_1 === 'object' && typeFields_1 != null, 'invalid language typeFields data');
        }
        // Using types[type] instead of typeFields because TypeScript cannot infer the correct type
        var styleFields = type === 'language'
            ? types[type][languageDisplay][style]
            : types[type][style];
        (0, ecma402_abstract_1.invariant)(typeof styleFields === 'object' && styleFields != null, 'invalid styleFields data');
        setSlot(this, 'fields', styleFields);
    }
    DisplayNames.supportedLocalesOf = function (locales, options) {
        return (0, ecma402_abstract_1.SupportedLocales)(DisplayNames.availableLocales, (0, ecma402_abstract_1.CanonicalizeLocaleList)(locales), options);
    };
    DisplayNames.__addLocaleData = function () {
        var data = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            data[_i] = arguments[_i];
        }
        for (var _a = 0, data_1 = data; _a < data_1.length; _a++) {
            var _b = data_1[_a], d = _b.data, locale = _b.locale;
            var minimizedLocale = new Intl.Locale(locale)
                .minimize()
                .toString();
            DisplayNames.localeData[locale] = DisplayNames.localeData[minimizedLocale] = d;
            DisplayNames.availableLocales.add(minimizedLocale);
            DisplayNames.availableLocales.add(locale);
            if (!DisplayNames.__defaultLocale) {
                DisplayNames.__defaultLocale = minimizedLocale;
            }
        }
    };
    DisplayNames.prototype.of = function (code) {
        checkReceiver(this, 'of');
        var type = getSlot(this, 'type');
        var codeAsString = (0, ecma402_abstract_1.ToString)(code);
        if (!isValidCodeForDisplayNames(type, codeAsString)) {
            throw RangeError('invalid code for Intl.DisplayNames.prototype.of');
        }
        var _a = (0, ecma402_abstract_1.getMultiInternalSlots)(__INTERNAL_SLOT_MAP__, this, 'localeData', 'style', 'fallback'), localeData = _a.localeData, style = _a.style, fallback = _a.fallback;
        // Canonicalize the case.
        var canonicalCode = (0, CanonicalCodeForDisplayNames_1.CanonicalCodeForDisplayNames)(type, codeAsString);
        var name;
        if (type === 'language') {
            var languageDisplay = getSlot(this, 'languageDisplay');
            name = getNameForTypeLanguage(languageDisplay, localeData, style, canonicalCode, fallback);
        }
        else {
            // All the other types
            var typesData = localeData.types[type];
            name = typesData[style][canonicalCode] || typesData.long[canonicalCode];
        }
        if (name !== undefined) {
            return name;
        }
        if (fallback === 'code') {
            return codeAsString;
        }
    };
    DisplayNames.prototype.resolvedOptions = function () {
        checkReceiver(this, 'resolvedOptions');
        return tslib_1.__assign({}, (0, ecma402_abstract_1.getMultiInternalSlots)(__INTERNAL_SLOT_MAP__, this, 'locale', 'style', 'type', 'fallback', 'languageDisplay'));
    };
    DisplayNames.getDefaultLocale = function () {
        return DisplayNames.__defaultLocale;
    };
    DisplayNames.localeData = {};
    DisplayNames.availableLocales = new Set();
    DisplayNames.__defaultLocale = '';
    DisplayNames.polyfilled = true;
    return DisplayNames;
}());
exports.DisplayNames = DisplayNames;
// https://tc39.es/proposal-intl-displaynames/#sec-isvalidcodefordisplaynames
function isValidCodeForDisplayNames(type, code) {
    switch (type) {
        case 'language':
            // subset of unicode_language_id
            // languageCode ["-" scriptCode] ["-" regionCode] *("-" variant)
            // where:
            // - languageCode is either a two letters ISO 639-1 language code or a three letters ISO 639-2 language code.
            // - scriptCode is should be an ISO-15924 four letters script code
            // - regionCode is either an ISO-3166 two letters region code, or a three digits UN M49 Geographic Regions.
            return /^[a-z]{2,3}(-[a-z]{4})?(-([a-z]{2}|\d{3}))?(-([a-z\d]{5,8}|\d[a-z\d]{3}))*$/i.test(code);
        case 'region':
            // unicode_region_subtag
            return /^([a-z]{2}|\d{3})$/i.test(code);
        case 'script':
            // unicode_script_subtag
            return /^[a-z]{4}$/i.test(code);
        case 'currency':
            return (0, ecma402_abstract_1.IsWellFormedCurrencyCode)(code);
        case 'calendar':
            // unicode locale identifier type
            return /^[a-z0-9]{3,8}([-_][a-z0-9]{3,8})*$/i.test(code);
        case 'dateTimeField':
            return (0, IsValidDateTimeFieldCode_1.IsValidDateTimeFieldCode)(code);
    }
}
try {
    // IE11 does not have Symbol
    if (typeof Symbol !== 'undefined' && Symbol.toStringTag) {
        Object.defineProperty(DisplayNames.prototype, Symbol.toStringTag, {
            value: 'Intl.DisplayNames',
            configurable: true,
            enumerable: false,
            writable: false,
        });
    }
    Object.defineProperty(DisplayNames, 'length', {
        value: 2,
        writable: false,
        enumerable: false,
        configurable: true,
    });
}
catch (e) {
    // Make test 262 compliant
}
var __INTERNAL_SLOT_MAP__ = new WeakMap();
function getSlot(instance, key) {
    return (0, ecma402_abstract_1.getInternalSlot)(__INTERNAL_SLOT_MAP__, instance, key);
}
function setSlot(instance, key, value) {
    (0, ecma402_abstract_1.setInternalSlot)(__INTERNAL_SLOT_MAP__, instance, key, value);
}
function checkReceiver(receiver, methodName) {
    if (!(receiver instanceof DisplayNames)) {
        throw TypeError("Method Intl.DisplayNames.prototype.".concat(methodName, " called on incompatible receiver"));
    }
}
function getNameForTypeLanguage(languageDisplay, localeData, style, canonicalCode, fallback) {
    // First, try to get the name using the canonicalCode
    var typesData = localeData.types.language[languageDisplay];
    var name = typesData[style][canonicalCode] || typesData.long[canonicalCode];
    if (name === undefined) {
        // If no name has been found using the canonicalCode,
        // check if the latter contains a region sub tag
        var regionMatch = /-([a-z]{2}|\d{3})\b/i.exec(canonicalCode);
        if (regionMatch) {
            // Extract the language and region sub tags
            var languageSubTag = canonicalCode.substring(0, regionMatch.index) +
                canonicalCode.substring(regionMatch.index + regionMatch[0].length);
            var regionSubTag = regionMatch[1];
            // Let's try again using languageSubTag this time
            var name_1 = typesData[style][languageSubTag] || typesData.long[languageSubTag];
            // If a name has been found and a region sub tag exists,
            // compose them together or use the code fallback
            if (name_1 !== undefined && regionSubTag) {
                // Retrieve region display names
                var regionsData = localeData.types.region;
                var regionDisplayName = regionsData[style][regionSubTag] || regionsData.long[regionSubTag];
                if (regionDisplayName || fallback === 'code') {
                    // Interpolate into locale-specific pattern.
                    var pattern = localeData.patterns.locale;
                    return pattern
                        .replace('{0}', name_1)
                        .replace('{1}', regionDisplayName || regionSubTag);
                }
            }
            else {
                return name_1;
            }
        }
    }
    else {
        return name;
    }
}
