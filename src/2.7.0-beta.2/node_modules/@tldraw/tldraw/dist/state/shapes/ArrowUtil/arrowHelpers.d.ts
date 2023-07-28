import type { ArrowShape, Decoration, ShapeStyles } from '../../../types';
export declare function getArrowArcPath(start: number[], end: number[], circle: number[], bend: number): string;
export declare function getBendPoint(handles: ArrowShape['handles'], bend: number): number[];
export declare function renderFreehandArrowShaft(id: string, style: ShapeStyles, start: number[], end: number[], decorationStart: Decoration | undefined, decorationEnd: Decoration | undefined): string;
export declare function renderCurvedFreehandArrowShaft(id: string, style: ShapeStyles, start: number[], end: number[], decorationStart: Decoration | undefined, decorationEnd: Decoration | undefined, center: number[], radius: number, length: number, easing: (t: number) => number): string;
export declare function getCtp(start: number[], bend: number[], end: number[]): number[];
export declare function getCurvedArrowHeadPoints(A: number[], r1: number, C: number[], r2: number, sweep: boolean): {
    left: number[];
    right: number[];
};
export declare function getStraightArrowHeadPoints(A: number[], B: number[], r: number): {
    left: number[];
    right: number[];
};
export declare function getCurvedArrowHeadPath(A: number[], r1: number, C: number[], r2: number, sweep: boolean): string;
export declare function getStraightArrowHeadPath(A: number[], B: number[], r: number): string;
export declare function getArrowPath(style: ShapeStyles, start: number[], bend: number[], end: number[], decorationStart: Decoration | undefined, decorationEnd: Decoration | undefined): string;
export declare function getArcPoints(start: number[], bend: number[], end: number[]): number[][];
export declare function isAngleBetween(a: number, b: number, c: number): boolean;
export declare function getArcLength(C: number[], r: number, A: number[], B: number[]): number;
//# sourceMappingURL=arrowHelpers.d.ts.map