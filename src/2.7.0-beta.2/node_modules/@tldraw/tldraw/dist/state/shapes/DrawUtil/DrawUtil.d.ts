import { TLBounds } from '@tldraw/core';
import * as React from 'react';
import { TDShapeUtil } from '../TDShapeUtil';
import { DrawShape, TDMeta, TDShapeType, TransformInfo } from '../../../types';
declare type T = DrawShape;
declare type E = SVGSVGElement;
export declare class DrawUtil extends TDShapeUtil<T, E> {
    type: TDShapeType.Draw;
    pointsBoundsCache: WeakMap<number[][], TLBounds>;
    shapeBoundsCache: Map<string, TLBounds>;
    rotatedCache: WeakMap<DrawShape, number[][]>;
    pointCache: Record<string, number[]>;
    canClone: boolean;
    getShape: (props: Partial<T>) => T;
    Component: React.ForwardRefExoticComponent<Pick<import("@tldraw/core").TLComponentProps<DrawShape, SVGSVGElement, TDMeta>, "bounds" | "meta" | "isGhost" | "isEditing" | "shape" | "events" | "onShapeChange" | "onShapeBlur" | "asset" | "isBinding" | "isHovered" | "isSelected" | "isChildOfSelected"> & React.RefAttributes<SVGSVGElement>>;
    Indicator: (props: {
        shape: DrawShape;
        meta: any;
        isHovered: boolean;
        isSelected: boolean;
        bounds: TLBounds;
    }) => React.ReactElement<any, string | React.JSXElementConstructor<any>>;
    transform: (shape: T, bounds: TLBounds, { initialShape, scaleX, scaleY }: TransformInfo<T>) => Partial<T>;
    getBounds: (shape: T) => TLBounds;
    shouldRender: (prev: T, next: T) => boolean;
    hitTestPoint: (shape: T, point: number[]) => boolean;
    hitTestLineSegment: (shape: T, A: number[], B: number[]) => boolean;
    hitTestBounds: (shape: T, bounds: TLBounds) => boolean;
}
export {};
//# sourceMappingURL=DrawUtil.d.ts.map