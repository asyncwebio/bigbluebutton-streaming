import { TLBounds, TLShape } from '@tldraw/core';
/**
 * Find the bounds of a rectangular shape.
 * @param shape
 * @param boundsCache
 */
export declare function getBoundsRectangle<T extends TLShape & {
    size: number[];
}>(shape: T, boundsCache: WeakMap<T, TLBounds>): TLBounds;
//# sourceMappingURL=getBoundsRectangle.d.ts.map