import type { TLBounds, TLShape, TLTransformInfo } from '@tldraw/core';
/**
 * Transform a rectangular shape.
 * @param shape
 * @param bounds
 * @param param2
 */
export declare function transformRectangle<T extends TLShape & {
    size: number[];
}>(shape: T, bounds: TLBounds, { initialShape, transformOrigin, scaleX, scaleY }: TLTransformInfo<T>): {
    size: number[];
    point: number[];
    rotation: number | undefined;
} | {
    point: number[];
    size: number[];
    rotation?: undefined;
};
//# sourceMappingURL=transformRectangle.d.ts.map