import * as React from 'react';
import { ResolvedIntlConfig as CoreResolvedIntlConfig, IntlFormatters, Formatters } from '@formatjs/intl';
import { DEFAULT_INTL_CONFIG } from './utils';
export declare type IntlConfig = Omit<ResolvedIntlConfig, keyof typeof DEFAULT_INTL_CONFIG> & Partial<typeof DEFAULT_INTL_CONFIG>;
export interface ResolvedIntlConfig extends CoreResolvedIntlConfig<React.ReactNode> {
    textComponent?: React.ComponentType | keyof React.ReactHTML;
    wrapRichTextChunksInFragment?: boolean;
}
export interface IntlShape extends ResolvedIntlConfig, IntlFormatters<React.ReactNode> {
    formatters: Formatters;
}
//# sourceMappingURL=types.d.ts.map