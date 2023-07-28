import type { TLBounds, TLShape } from '@tldraw/core';
/**
 * Transform a single rectangular shape.
 * @param shape
 * @param bounds
 */
export declare function transformSingleRectangle<T extends TLShape & {
    size: number[];
}>(shape: T, bounds: TLBounds): {
    size: number[];
    point: number[];
};
//# sourceMappingURL=transformSingleRectangle.d.ts.map