import main from './main.json';
export declare const TRANSLATIONS: TDTranslations;
export declare type TDTranslation = {
    readonly locale: string;
    readonly label: string;
    readonly messages: Partial<typeof main>;
};
export declare type TDTranslations = TDTranslation[];
export declare type TDLanguage = TDTranslations[number]['locale'];
export declare function getTranslation(locale: TDLanguage): TDTranslation;
//# sourceMappingURL=translations.d.ts.map