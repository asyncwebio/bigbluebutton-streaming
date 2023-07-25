import { match } from '@formatjs/intl-localematcher';
import { supportedLocales } from './supported-locales.generated';
function supportedLocalesOf(locale) {
    if (!locale) {
        return true;
    }
    var locales = Array.isArray(locale) ? locale : [locale];
    return (Intl.ListFormat.supportedLocalesOf(locales).length ===
        locales.length);
}
export function shouldPolyfill(locale) {
    if (locale === void 0) { locale = 'en'; }
    if (!('ListFormat' in Intl) || !supportedLocalesOf(locale)) {
        return locale ? match([locale], supportedLocales, 'en') : undefined;
    }
}
