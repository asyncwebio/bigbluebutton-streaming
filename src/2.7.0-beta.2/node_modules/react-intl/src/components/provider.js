"use strict";
/*
 * Copyright 2015, Yahoo Inc.
 * Copyrights licensed under the New BSD License.
 * See the accompanying LICENSE file for terms.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.createIntl = void 0;
var tslib_1 = require("tslib");
var React = tslib_1.__importStar(require("react"));
var injectIntl_1 = require("./injectIntl");
var utils_1 = require("../utils");
var intl_1 = require("@formatjs/intl");
var intl_messageformat_1 = require("intl-messageformat");
function processIntlConfig(config) {
    return {
        locale: config.locale,
        timeZone: config.timeZone,
        fallbackOnEmptyString: config.fallbackOnEmptyString,
        formats: config.formats,
        textComponent: config.textComponent,
        messages: config.messages,
        defaultLocale: config.defaultLocale,
        defaultFormats: config.defaultFormats,
        onError: config.onError,
        onWarn: config.onWarn,
        wrapRichTextChunksInFragment: config.wrapRichTextChunksInFragment,
        defaultRichTextElements: config.defaultRichTextElements,
    };
}
function assignUniqueKeysToFormatXMLElementFnArgument(values) {
    if (!values) {
        return values;
    }
    return Object.keys(values).reduce(function (acc, k) {
        var v = values[k];
        acc[k] = (0, intl_messageformat_1.isFormatXMLElementFn)(v)
            ? (0, utils_1.assignUniqueKeysToParts)(v)
            : v;
        return acc;
    }, {});
}
var formatMessage = function (config, formatters, descriptor, rawValues) {
    var rest = [];
    for (var _i = 4; _i < arguments.length; _i++) {
        rest[_i - 4] = arguments[_i];
    }
    var values = assignUniqueKeysToFormatXMLElementFnArgument(rawValues);
    var chunks = intl_1.formatMessage.apply(void 0, tslib_1.__spreadArray([config,
        formatters,
        descriptor,
        values], rest, false));
    if (Array.isArray(chunks)) {
        return React.Children.toArray(chunks);
    }
    return chunks;
};
/**
 * Create intl object
 * @param config intl config
 * @param cache cache for formatter instances to prevent memory leak
 */
var createIntl = function (_a, cache) {
    var rawDefaultRichTextElements = _a.defaultRichTextElements, config = tslib_1.__rest(_a, ["defaultRichTextElements"]);
    var defaultRichTextElements = assignUniqueKeysToFormatXMLElementFnArgument(rawDefaultRichTextElements);
    var coreIntl = (0, intl_1.createIntl)(tslib_1.__assign(tslib_1.__assign(tslib_1.__assign({}, utils_1.DEFAULT_INTL_CONFIG), config), { defaultRichTextElements: defaultRichTextElements }), cache);
    var resolvedConfig = {
        locale: coreIntl.locale,
        timeZone: coreIntl.timeZone,
        fallbackOnEmptyString: coreIntl.fallbackOnEmptyString,
        formats: coreIntl.formats,
        defaultLocale: coreIntl.defaultLocale,
        defaultFormats: coreIntl.defaultFormats,
        messages: coreIntl.messages,
        onError: coreIntl.onError,
        defaultRichTextElements: defaultRichTextElements,
    };
    return tslib_1.__assign(tslib_1.__assign({}, coreIntl), { 
        // @ts-expect-error fix this
        formatMessage: formatMessage.bind(null, resolvedConfig, coreIntl.formatters), 
        // @ts-expect-error fix this
        $t: formatMessage.bind(null, resolvedConfig, coreIntl.formatters) });
};
exports.createIntl = createIntl;
var IntlProvider = /** @class */ (function (_super) {
    tslib_1.__extends(IntlProvider, _super);
    function IntlProvider() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.cache = (0, intl_1.createIntlCache)();
        _this.state = {
            cache: _this.cache,
            intl: (0, exports.createIntl)(processIntlConfig(_this.props), _this.cache),
            prevConfig: processIntlConfig(_this.props),
        };
        return _this;
    }
    IntlProvider.getDerivedStateFromProps = function (props, _a) {
        var prevConfig = _a.prevConfig, cache = _a.cache;
        var config = processIntlConfig(props);
        if (!(0, utils_1.shallowEqual)(prevConfig, config)) {
            return {
                intl: (0, exports.createIntl)(config, cache),
                prevConfig: config,
            };
        }
        return null;
    };
    IntlProvider.prototype.render = function () {
        (0, utils_1.invariantIntlContext)(this.state.intl);
        return React.createElement(injectIntl_1.Provider, { value: this.state.intl }, this.props.children);
    };
    IntlProvider.displayName = 'IntlProvider';
    IntlProvider.defaultProps = utils_1.DEFAULT_INTL_CONFIG;
    return IntlProvider;
}(React.PureComponent));
exports.default = IntlProvider;
