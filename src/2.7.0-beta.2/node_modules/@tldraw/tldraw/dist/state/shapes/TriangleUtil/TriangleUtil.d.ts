import { TLBounds } from '@tldraw/core';
import * as React from 'react';
import { TDShapeUtil } from '../TDShapeUtil';
import { transformRectangle, transformSingleRectangle } from '../shared';
import { TDMeta, TDShape, TDShapeType, TriangleShape } from '../../../types';
declare type T = TriangleShape;
declare type E = HTMLDivElement;
export declare class TriangleUtil extends TDShapeUtil<T, E> {
    type: TDShapeType.Triangle;
    canBind: boolean;
    canClone: boolean;
    canEdit: boolean;
    getShape: (props: Partial<T>) => T;
    Component: React.ForwardRefExoticComponent<Pick<import("@tldraw/core").TLComponentProps<TriangleShape, HTMLDivElement, TDMeta>, "bounds" | "meta" | "isGhost" | "isEditing" | "shape" | "events" | "onShapeChange" | "onShapeBlur" | "asset" | "isBinding" | "isHovered" | "isSelected" | "isChildOfSelected"> & React.RefAttributes<HTMLDivElement>>;
    Indicator: (props: {
        shape: TriangleShape;
        meta: any;
        isHovered: boolean;
        isSelected: boolean;
        bounds: TLBounds;
    }) => React.ReactElement<any, string | React.JSXElementConstructor<any>>;
    private getPoints;
    shouldRender: (prev: T, next: T) => boolean;
    getBounds: (shape: T) => TLBounds;
    getExpandedBounds: (shape: T) => TLBounds;
    hitTestLineSegment: (shape: T, A: number[], B: number[]) => boolean;
    hitTestBounds: (shape: T, bounds: TLBounds) => boolean;
    getBindingPoint: <K extends TDShape>(shape: T, fromShape: K, point: number[], origin: number[], direction: number[], bindAnywhere: boolean) => {
        point: number[];
        distance: number;
    } | undefined;
    transform: typeof transformRectangle;
    transformSingle: typeof transformSingleRectangle;
}
export {};
//# sourceMappingURL=TriangleUtil.d.ts.map