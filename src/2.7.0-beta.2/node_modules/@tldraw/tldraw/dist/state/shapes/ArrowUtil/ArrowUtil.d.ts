import { TLBounds } from '@tldraw/core';
import * as React from 'react';
import { TDShapeUtil } from '../TDShapeUtil';
import { ArrowShape, TDMeta, TDShapeType, TransformInfo } from '../../../types';
declare type T = ArrowShape;
declare type E = HTMLDivElement;
export declare class ArrowUtil extends TDShapeUtil<T, E> {
    type: TDShapeType.Arrow;
    hideBounds: boolean;
    canEdit: boolean;
    pathCache: WeakMap<ArrowShape, string>;
    getShape: (props: Partial<T>) => T;
    Component: React.ForwardRefExoticComponent<Pick<import("@tldraw/core").TLComponentProps<ArrowShape, HTMLDivElement, TDMeta>, "bounds" | "meta" | "isGhost" | "isEditing" | "shape" | "events" | "onShapeChange" | "onShapeBlur" | "asset" | "isBinding" | "isHovered" | "isSelected" | "isChildOfSelected"> & React.RefAttributes<HTMLDivElement>>;
    Indicator: (props: {
        shape: ArrowShape;
        meta: any;
        isHovered: boolean;
        isSelected: boolean;
        bounds: TLBounds;
    }) => React.ReactElement<any, string | React.JSXElementConstructor<any>>;
    getBounds: (shape: T) => TLBounds;
    getRotatedBounds: (shape: T) => TLBounds;
    getCenter: (shape: T) => number[];
    shouldRender: (prev: T, next: T) => boolean;
    hitTestPoint: (shape: T, point: number[]) => boolean;
    hitTestLineSegment: (shape: T, A: number[], B: number[]) => boolean;
    hitTestBounds: (shape: T, bounds: TLBounds) => boolean;
    transform: (shape: T, bounds: TLBounds, { initialShape, scaleX, scaleY }: TransformInfo<T>) => Partial<T>;
    onDoubleClickHandle: (shape: T, handle: Partial<T['handles']>) => Partial<T> | void;
    onHandleChange: (shape: T, handles: Partial<T['handles']>) => Partial<T> | void;
    getSvgElement: (shape: ArrowShape, isDarkMode: boolean) => SVGElement | void;
}
export {};
//# sourceMappingURL=ArrowUtil.d.ts.map