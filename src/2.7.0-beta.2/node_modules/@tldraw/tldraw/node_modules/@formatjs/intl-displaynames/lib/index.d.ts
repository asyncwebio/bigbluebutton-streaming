import { DisplayNamesLocaleData, DisplayNamesData } from '@formatjs/ecma402-abstract';
export interface DisplayNamesOptions {
    localeMatcher?: 'lookup' | 'best fit';
    style?: 'narrow' | 'short' | 'long';
    type: 'language' | 'region' | 'script' | 'currency' | 'calendar' | 'dateTimeField';
    fallback?: 'code' | 'none';
    languageDisplay?: 'dialect' | 'standard';
}
export interface DisplayNamesResolvedOptions {
    locale: string;
    style: NonNullable<DisplayNamesOptions['style']>;
    type: NonNullable<DisplayNamesOptions['type']>;
    fallback: NonNullable<DisplayNamesOptions['fallback']>;
    languageDisplay: NonNullable<DisplayNamesOptions['languageDisplay']>;
}
export declare class DisplayNames {
    constructor(locales: string | string[] | undefined, options: DisplayNamesOptions);
    static supportedLocalesOf(locales?: string | string[], options?: Pick<DisplayNamesOptions, 'localeMatcher'>): string[];
    static __addLocaleData(...data: DisplayNamesLocaleData[]): void;
    of(code: string | number | Record<string, unknown>): string | undefined;
    resolvedOptions(): DisplayNamesResolvedOptions;
    static localeData: Record<string, DisplayNamesData | undefined>;
    private static availableLocales;
    private static __defaultLocale;
    private static getDefaultLocale;
    static readonly polyfilled = true;
}
//# sourceMappingURL=index.d.ts.map