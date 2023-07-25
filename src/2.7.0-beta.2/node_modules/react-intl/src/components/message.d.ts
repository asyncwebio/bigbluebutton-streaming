import * as React from 'react';
import type { FormatXMLElementFn, Options as IntlMessageFormatOptions, PrimitiveType } from 'intl-messageformat';
import { MessageDescriptor } from '@formatjs/intl';
export interface Props<V extends Record<string, any> = Record<string, React.ReactNode | PrimitiveType | FormatXMLElementFn<React.ReactNode, React.ReactNode>>> extends MessageDescriptor {
    values?: V;
    tagName?: React.ElementType<any>;
    children?(nodes: React.ReactNode[]): React.ReactElement | null;
    ignoreTag?: IntlMessageFormatOptions['ignoreTag'];
}
declare const MemoizedFormattedMessage: React.NamedExoticComponent<Props<Record<string, string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactFragment | React.ReactPortal | Date | FormatXMLElementFn<React.ReactNode, React.ReactNode> | null | undefined>>>;
export default MemoizedFormattedMessage;
//# sourceMappingURL=message.d.ts.map