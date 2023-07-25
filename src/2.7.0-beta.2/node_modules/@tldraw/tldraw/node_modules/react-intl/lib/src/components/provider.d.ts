import * as React from 'react';
import type { IntlConfig, IntlShape, ResolvedIntlConfig } from '../types';
import { IntlCache, CreateIntlFn } from '@formatjs/intl';
interface State {
    /**
     * Explicit intl cache to prevent memory leaks
     */
    cache: IntlCache;
    /**
     * Intl object we created
     */
    intl?: IntlShape;
    /**
     * list of memoized config we care about.
     * This is important since creating intl is
     * very expensive
     */
    prevConfig: IntlConfig;
}
/**
 * Create intl object
 * @param config intl config
 * @param cache cache for formatter instances to prevent memory leak
 */
export declare const createIntl: CreateIntlFn<React.ReactNode, IntlConfig, IntlShape>;
export default class IntlProvider extends React.PureComponent<React.PropsWithChildren<IntlConfig>, State> {
    static displayName: string;
    static defaultProps: Pick<ResolvedIntlConfig, "onError" | "timeZone" | "fallbackOnEmptyString" | "formats" | "messages" | "defaultLocale" | "defaultFormats" | "textComponent">;
    private cache;
    state: State;
    static getDerivedStateFromProps(props: Readonly<IntlConfig>, { prevConfig, cache }: State): Partial<State> | null;
    render(): JSX.Element;
}
export {};
//# sourceMappingURL=provider.d.ts.map