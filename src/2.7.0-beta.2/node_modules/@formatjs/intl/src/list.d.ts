import { Formatters, IntlFormatters, OnErrorFn } from './types';
import type { Part } from '@formatjs/intl-listformat';
export declare function formatList(opts: {
    locale: string;
    onError: OnErrorFn;
}, getListFormat: Formatters['getListFormat'], values: ReadonlyArray<string>, options: Parameters<IntlFormatters['formatList']>[1]): string;
export declare function formatListToParts<T>(opts: {
    locale: string;
    onError: OnErrorFn;
}, getListFormat: Formatters['getListFormat'], values: ReadonlyArray<string>, options: Parameters<IntlFormatters['formatList']>[1]): Part[];
//# sourceMappingURL=list.d.ts.map