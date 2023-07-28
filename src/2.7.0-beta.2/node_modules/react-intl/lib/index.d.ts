import * as React from 'react';
import { MessageDescriptor, CustomFormatConfig, FormatDateOptions } from '@formatjs/intl';
import { IntlListFormatOptions } from '@formatjs/intl-listformat';
import { DisplayNamesOptions } from '@formatjs/intl-displaynames';
import { NumberFormatOptions } from '@formatjs/ecma402-abstract';
import injectIntl, { Provider as RawIntlProvider, Context as IntlContext, WithIntlProps, WrappedComponentProps } from './src/components/injectIntl';
import useIntl from './src/components/useIntl';
import IntlProvider, { createIntl } from './src/components/provider';
import FormattedRelativeTime from './src/components/relative';
import FormattedPlural from './src/components/plural';
import FormattedMessage from './src/components/message';
import FormattedDateTimeRange from './src/components/dateTimeRange';
export { FormattedDateTimeRange, FormattedMessage, FormattedPlural, FormattedRelativeTime, IntlContext, IntlProvider, RawIntlProvider, WithIntlProps, WrappedComponentProps, createIntl, injectIntl, useIntl, };
export { IntlConfig, ResolvedIntlConfig, IntlShape } from './src/types';
export { createIntlCache, MessageDescriptor, IntlCache, Formatters, IntlFormatters, FormatDisplayNameOptions, FormatListOptions, FormatPluralOptions, FormatRelativeTimeOptions, FormatNumberOptions, FormatDateOptions, CustomFormatConfig, CustomFormats, UnsupportedFormatterError, InvalidConfigError, MissingDataError, MessageFormatError, MissingTranslationError, IntlErrorCode as ReactIntlErrorCode, IntlError as ReactIntlError, } from '@formatjs/intl';
export declare function defineMessages<K extends keyof any, T = MessageDescriptor, U extends Record<K, T> = Record<K, T>>(msgs: U): U;
export declare function defineMessage<T extends MessageDescriptor>(msg: T): T;
export declare const FormattedDate: React.FC<Intl.DateTimeFormatOptions & CustomFormatConfig & {
    value: string | number | Date | undefined;
}>;
export declare const FormattedTime: React.FC<Intl.DateTimeFormatOptions & CustomFormatConfig & {
    value: string | number | Date | undefined;
}>;
export declare const FormattedNumber: React.FC<NumberFormatOptions & CustomFormatConfig & {
    value: number | bigint;
}>;
export declare const FormattedList: React.FC<IntlListFormatOptions & {
    value: readonly React.ReactNode[];
}>;
export declare const FormattedDisplayName: React.FC<DisplayNamesOptions & {
    value: string | number | Record<string, unknown>;
}>;
export declare const FormattedDateParts: React.FC<FormatDateOptions & {
    value: Parameters<Intl.DateTimeFormat['format']>[0] | string;
    children(val: Intl.DateTimeFormatPart[]): React.ReactElement | null;
}>;
export declare const FormattedTimeParts: React.FC<FormatDateOptions & {
    value: Parameters<Intl.DateTimeFormat['format']>[0] | string;
    children(val: Intl.DateTimeFormatPart[]): React.ReactElement | null;
}>;
export { FormattedNumberParts, FormattedListParts, } from './src/components/createFormattedComponent';
export type { MessageFormatElement } from '@formatjs/icu-messageformat-parser';
//# sourceMappingURL=index.d.ts.map