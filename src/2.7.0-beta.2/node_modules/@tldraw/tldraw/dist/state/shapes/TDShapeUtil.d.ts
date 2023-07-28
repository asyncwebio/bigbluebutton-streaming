import { TLShapeUtil } from '@tldraw/core';
import type { TLBounds, TLPointerInfo } from '@tldraw/core';
import { TDMeta, TDShape, TransformInfo } from '../../types';
export declare abstract class TDShapeUtil<T extends TDShape, E extends Element = any> extends TLShapeUtil<T, E, TDMeta> {
    abstract type: T['type'];
    canBind: boolean;
    canEdit: boolean;
    canClone: boolean;
    isAspectRatioLocked: boolean;
    hideResizeHandles: boolean;
    bindingDistance: number;
    abstract getShape: (props: Partial<T>) => T;
    hitTestPoint: (shape: T, point: number[]) => boolean;
    hitTestLineSegment: (shape: T, A: number[], B: number[]) => boolean;
    create: (props: {
        id: string;
    } & Partial<T>) => T;
    getCenter: (shape: T) => number[];
    getExpandedBounds: (shape: T) => TLBounds;
    getBindingPoint: <K extends TDShape>(shape: T, fromShape: K, point: number[], origin: number[], direction: number[], bindAnywhere: boolean) => {
        point: number[];
        distance: number;
    } | undefined;
    mutate: (shape: T, props: Partial<T>) => Partial<T>;
    transform: (shape: T, bounds: TLBounds, info: TransformInfo<T>) => Partial<T>;
    transformSingle: (shape: T, bounds: TLBounds, info: TransformInfo<T>) => Partial<T> | void;
    updateChildren?: <K extends TDShape>(shape: T, children: K[]) => Partial<K>[] | void;
    onChildrenChange?: (shape: T, children: TDShape[]) => Partial<T> | void;
    onHandleChange?: (shape: T, handles: Partial<T['handles']>) => Partial<T> | void;
    onRightPointHandle?: (shape: T, handles: Partial<T['handles']>, info: Partial<TLPointerInfo>) => Partial<T> | void;
    onDoubleClickHandle?: (shape: T, handles: Partial<T['handles']>, info: Partial<TLPointerInfo>) => Partial<T> | void;
    onDoubleClickBoundsHandle?: (shape: T) => Partial<T> | void;
    onSessionComplete?: (shape: T) => Partial<T> | void;
    getSvgElement: (shape: T, isDarkMode: boolean) => SVGElement | void;
}
//# sourceMappingURL=TDShapeUtil.d.ts.map