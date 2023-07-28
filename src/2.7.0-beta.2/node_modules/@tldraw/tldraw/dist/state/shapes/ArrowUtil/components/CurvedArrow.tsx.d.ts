import * as React from 'react';
import type { Decoration, ShapeStyles } from '../../../../types';
interface ArrowSvgProps {
    id: string;
    style: ShapeStyles;
    start: number[];
    bend: number[];
    end: number[];
    arrowBend: number;
    decorationStart: Decoration | undefined;
    decorationEnd: Decoration | undefined;
    isDarkMode: boolean;
    isDraw: boolean;
}
export declare const CurvedArrow: React.NamedExoticComponent<ArrowSvgProps>;
export {};
//# sourceMappingURL=CurvedArrow.tsx.d.ts.map