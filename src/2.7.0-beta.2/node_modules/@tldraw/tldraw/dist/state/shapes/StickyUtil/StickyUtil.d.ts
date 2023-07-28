import { TLBounds } from '@tldraw/core';
import * as React from 'react';
import { TDShapeUtil } from '../TDShapeUtil';
import { StickyShape, TDMeta, TDShapeType, TransformInfo } from '../../../types';
declare type T = StickyShape;
declare type E = HTMLDivElement;
export declare class StickyUtil extends TDShapeUtil<T, E> {
    type: TDShapeType.Sticky;
    canBind: boolean;
    canEdit: boolean;
    canClone: boolean;
    hideResizeHandles: boolean;
    showCloneHandles: boolean;
    getShape: (props: Partial<T>) => T;
    Component: React.ForwardRefExoticComponent<Pick<import("@tldraw/core").TLComponentProps<StickyShape, HTMLDivElement, TDMeta>, "bounds" | "meta" | "isGhost" | "isEditing" | "shape" | "events" | "onShapeChange" | "onShapeBlur" | "asset" | "isBinding" | "isHovered" | "isSelected" | "isChildOfSelected"> & React.RefAttributes<HTMLDivElement>>;
    Indicator: (props: {
        shape: StickyShape;
        meta: any;
        isHovered: boolean;
        isSelected: boolean;
        bounds: TLBounds;
    }) => React.ReactElement<any, string | React.JSXElementConstructor<any>>;
    getBounds: (shape: T) => TLBounds;
    shouldRender: (prev: T, next: T) => boolean;
    transform: (shape: T, bounds: TLBounds, { scaleX, scaleY, transformOrigin }: TransformInfo<T>) => Partial<T>;
    transformSingle: (shape: T) => Partial<T>;
    getSvgElement: (shape: T, isDarkMode: boolean) => SVGElement | void;
}
export {};
//# sourceMappingURL=StickyUtil.d.ts.map