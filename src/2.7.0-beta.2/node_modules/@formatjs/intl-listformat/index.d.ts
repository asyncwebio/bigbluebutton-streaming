import { ListPatternLocaleData, ListPatternFieldsData, LiteralPart } from '@formatjs/ecma402-abstract';
export interface IntlListFormatOptions {
    /**
     * The locale matching algorithm to use.
     * Possible values are "lookup" and "best fit"; the default is "best fit".
     * For information about this option, see
     * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl#Locale_negotiation.
     */
    localeMatcher?: 'best fit' | 'lookup';
    /**
     * The format of output message.
     * Possible values are :
     * - "conjunction" that stands for "and"-based lists (default, e.g., "A, B, and C")
     * - "disjunction" that stands for "or"-based lists (e.g., "A, B, or C").
     * - "unit" stands for lists of values with units (e.g., "5 pounds, 12 ounces").
     */
    type?: 'conjunction' | 'disjunction' | 'unit';
    /**
     * The length of the formatted message.
     * Possible values are:
     * - "long" (default, e.g., "A, B, and C");
     * - "short" (e.g., "A, B, C"), or
     * - "narrow" (e.g., "A B C").
     * When style is "short" or "narrow", "unit" is the only allowed value for the type option.
     */
    style?: 'long' | 'short' | 'narrow';
}
export interface ResolvedIntlListFormatOptions {
    /**
     * A string with a BCP 47 language tag, or an array of such strings.
     * For the general form and interpretation of the locales argument,
     * see the [Intl](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl#locale_identification_and_negotiation) page.
     */
    locale: string;
    /**
     * The format of output message.
     * Possible values are :
     * - "conjunction" that stands for "and"-based lists (default, e.g., "A, B, and C")
     * - "disjunction" that stands for "or"-based lists (e.g., "A, B, or C").
     * - "unit" stands for lists of values with units (e.g., "5 pounds, 12 ounces").
     */
    type: 'conjunction' | 'disjunction' | 'unit';
    /**
     * The length of the formatted message.
     * Possible values are:
     * - "long" (default, e.g., "A, B, and C");
     * - "short" (e.g., "A, B, C"), or
     * - "narrow" (e.g., "A B C").
     * When style is "short" or "narrow", "unit" is the only allowed value for the type option.
     */
    style: 'long' | 'short' | 'narrow';
}
export declare type Part<T = string> = LiteralPart | ElementPart | ElementPart<T>;
export interface ElementPart<T = string> {
    type: 'element';
    value: T;
}
export default class ListFormat {
    constructor(locales?: string | string[], options?: IntlListFormatOptions);
    format(elements: string[]): string;
    formatToParts(elements: string[]): Part[];
    resolvedOptions(): ResolvedIntlListFormatOptions;
    static supportedLocalesOf(locales: string | string[], options?: Pick<IntlListFormatOptions, 'localeMatcher'>): string[];
    static __addLocaleData(...data: ListPatternLocaleData[]): void;
    static localeData: Record<string, ListPatternFieldsData | undefined>;
    private static availableLocales;
    private static __defaultLocale;
    private static getDefaultLocale;
    private static relevantExtensionKeys;
    static polyfilled: boolean;
    private static readonly __INTERNAL_SLOT_MAP__;
}
//# sourceMappingURL=index.d.ts.map