import { ColorStyle, FontStyle, ShapeStyles, SizeStyle, Theme } from '../../../types';
export declare const stickyFills: Record<Theme, Record<ColorStyle, string>>;
export declare const strokes: Record<Theme, Record<ColorStyle, string>>;
export declare const fills: Record<Theme, Record<ColorStyle, string>>;
export declare function getStrokeWidth(size: SizeStyle): number;
export declare function getFontSize(size: SizeStyle, fontStyle?: FontStyle): number;
export declare function getFontFace(font?: FontStyle): string;
export declare function getStickyFontSize(size: SizeStyle): number;
export declare function getFontStyle(style: ShapeStyles): string;
export declare function getStickyFontStyle(style: ShapeStyles): string;
export declare function getStickyShapeStyle(style: ShapeStyles, isDarkMode?: boolean): {
    fill: string;
    stroke: string;
    color: string;
};
export declare function getShapeStyle(style: ShapeStyles, isDarkMode?: boolean): {
    stroke: string;
    fill: string;
    strokeWidth: number;
};
export declare const defaultStyle: ShapeStyles;
export declare const defaultTextStyle: ShapeStyles;
//# sourceMappingURL=shape-styles.d.ts.map