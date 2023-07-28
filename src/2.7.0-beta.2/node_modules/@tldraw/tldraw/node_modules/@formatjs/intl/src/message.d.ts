import { Formatters, MessageDescriptor, CustomFormats, OnErrorFn } from './types';
import { FormatXMLElementFn, PrimitiveType, Formatters as IntlMessageFormatFormatters, Options } from 'intl-messageformat';
import { MessageFormatElement } from '@formatjs/icu-messageformat-parser';
export type FormatMessageFn<T> = ({ locale, formats, messages, defaultLocale, defaultFormats, fallbackOnEmptyString, onError, timeZone, defaultRichTextElements, }: {
    locale: string;
    timeZone?: string;
    formats: CustomFormats;
    messages: Record<string, string> | Record<string, MessageFormatElement[]>;
    defaultLocale: string;
    defaultFormats: CustomFormats;
    defaultRichTextElements?: Record<string, FormatXMLElementFn<T>>;
    fallbackOnEmptyString?: boolean;
    onError: OnErrorFn;
}, state: IntlMessageFormatFormatters & Pick<Formatters, 'getMessageFormat'>, messageDescriptor: MessageDescriptor, values?: Record<string, PrimitiveType | T | FormatXMLElementFn<T>>, opts?: Options) => T extends string ? string : Array<T | string> | string | T;
export declare const formatMessage: FormatMessageFn<any>;
//# sourceMappingURL=message.d.ts.map