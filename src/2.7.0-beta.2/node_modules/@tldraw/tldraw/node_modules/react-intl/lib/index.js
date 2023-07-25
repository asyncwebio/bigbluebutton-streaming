import { createFormattedComponent, createFormattedDateTimePartsComponent, } from './src/components/createFormattedComponent';
import injectIntl, { Provider as RawIntlProvider, Context as IntlContext, } from './src/components/injectIntl';
import useIntl from './src/components/useIntl';
import IntlProvider, { createIntl } from './src/components/provider';
import FormattedRelativeTime from './src/components/relative';
import FormattedPlural from './src/components/plural';
import FormattedMessage from './src/components/message';
import FormattedDateTimeRange from './src/components/dateTimeRange';
export { FormattedDateTimeRange, FormattedMessage, FormattedPlural, FormattedRelativeTime, IntlContext, IntlProvider, RawIntlProvider, createIntl, injectIntl, useIntl, };
export { createIntlCache, UnsupportedFormatterError, InvalidConfigError, MissingDataError, MessageFormatError, MissingTranslationError, IntlErrorCode as ReactIntlErrorCode, IntlError as ReactIntlError, } from '@formatjs/intl';
export function defineMessages(msgs) {
    return msgs;
}
export function defineMessage(msg) {
    return msg;
}
// IMPORTANT: Explicit here to prevent api-extractor from outputing `import('./src/types').CustomFormatConfig`
export var FormattedDate = createFormattedComponent('formatDate');
export var FormattedTime = createFormattedComponent('formatTime');
export var FormattedNumber = createFormattedComponent('formatNumber');
export var FormattedList = createFormattedComponent('formatList');
export var FormattedDisplayName = createFormattedComponent('formatDisplayName');
export var FormattedDateParts = createFormattedDateTimePartsComponent('formatDate');
export var FormattedTimeParts = createFormattedDateTimePartsComponent('formatTime');
export { FormattedNumberParts, FormattedListParts, } from './src/components/createFormattedComponent';
