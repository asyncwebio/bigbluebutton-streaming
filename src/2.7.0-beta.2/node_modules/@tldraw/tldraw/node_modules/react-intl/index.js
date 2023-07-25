"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FormattedListParts = exports.FormattedNumberParts = exports.FormattedTimeParts = exports.FormattedDateParts = exports.FormattedDisplayName = exports.FormattedList = exports.FormattedNumber = exports.FormattedTime = exports.FormattedDate = exports.defineMessage = exports.defineMessages = exports.ReactIntlError = exports.ReactIntlErrorCode = exports.MissingTranslationError = exports.MessageFormatError = exports.MissingDataError = exports.InvalidConfigError = exports.UnsupportedFormatterError = exports.createIntlCache = exports.useIntl = exports.injectIntl = exports.createIntl = exports.RawIntlProvider = exports.IntlProvider = exports.IntlContext = exports.FormattedRelativeTime = exports.FormattedPlural = exports.FormattedMessage = exports.FormattedDateTimeRange = void 0;
var tslib_1 = require("tslib");
var createFormattedComponent_1 = require("./src/components/createFormattedComponent");
var injectIntl_1 = tslib_1.__importStar(require("./src/components/injectIntl"));
exports.injectIntl = injectIntl_1.default;
Object.defineProperty(exports, "RawIntlProvider", { enumerable: true, get: function () { return injectIntl_1.Provider; } });
Object.defineProperty(exports, "IntlContext", { enumerable: true, get: function () { return injectIntl_1.Context; } });
var useIntl_1 = tslib_1.__importDefault(require("./src/components/useIntl"));
exports.useIntl = useIntl_1.default;
var provider_1 = tslib_1.__importStar(require("./src/components/provider"));
exports.IntlProvider = provider_1.default;
Object.defineProperty(exports, "createIntl", { enumerable: true, get: function () { return provider_1.createIntl; } });
var relative_1 = tslib_1.__importDefault(require("./src/components/relative"));
exports.FormattedRelativeTime = relative_1.default;
var plural_1 = tslib_1.__importDefault(require("./src/components/plural"));
exports.FormattedPlural = plural_1.default;
var message_1 = tslib_1.__importDefault(require("./src/components/message"));
exports.FormattedMessage = message_1.default;
var dateTimeRange_1 = tslib_1.__importDefault(require("./src/components/dateTimeRange"));
exports.FormattedDateTimeRange = dateTimeRange_1.default;
var intl_1 = require("@formatjs/intl");
Object.defineProperty(exports, "createIntlCache", { enumerable: true, get: function () { return intl_1.createIntlCache; } });
Object.defineProperty(exports, "UnsupportedFormatterError", { enumerable: true, get: function () { return intl_1.UnsupportedFormatterError; } });
Object.defineProperty(exports, "InvalidConfigError", { enumerable: true, get: function () { return intl_1.InvalidConfigError; } });
Object.defineProperty(exports, "MissingDataError", { enumerable: true, get: function () { return intl_1.MissingDataError; } });
Object.defineProperty(exports, "MessageFormatError", { enumerable: true, get: function () { return intl_1.MessageFormatError; } });
Object.defineProperty(exports, "MissingTranslationError", { enumerable: true, get: function () { return intl_1.MissingTranslationError; } });
Object.defineProperty(exports, "ReactIntlErrorCode", { enumerable: true, get: function () { return intl_1.IntlErrorCode; } });
Object.defineProperty(exports, "ReactIntlError", { enumerable: true, get: function () { return intl_1.IntlError; } });
function defineMessages(msgs) {
    return msgs;
}
exports.defineMessages = defineMessages;
function defineMessage(msg) {
    return msg;
}
exports.defineMessage = defineMessage;
// IMPORTANT: Explicit here to prevent api-extractor from outputing `import('./src/types').CustomFormatConfig`
exports.FormattedDate = (0, createFormattedComponent_1.createFormattedComponent)('formatDate');
exports.FormattedTime = (0, createFormattedComponent_1.createFormattedComponent)('formatTime');
exports.FormattedNumber = (0, createFormattedComponent_1.createFormattedComponent)('formatNumber');
exports.FormattedList = (0, createFormattedComponent_1.createFormattedComponent)('formatList');
exports.FormattedDisplayName = (0, createFormattedComponent_1.createFormattedComponent)('formatDisplayName');
exports.FormattedDateParts = (0, createFormattedComponent_1.createFormattedDateTimePartsComponent)('formatDate');
exports.FormattedTimeParts = (0, createFormattedComponent_1.createFormattedDateTimePartsComponent)('formatTime');
var createFormattedComponent_2 = require("./src/components/createFormattedComponent");
Object.defineProperty(exports, "FormattedNumberParts", { enumerable: true, get: function () { return createFormattedComponent_2.FormattedNumberParts; } });
Object.defineProperty(exports, "FormattedListParts", { enumerable: true, get: function () { return createFormattedComponent_2.FormattedListParts; } });
