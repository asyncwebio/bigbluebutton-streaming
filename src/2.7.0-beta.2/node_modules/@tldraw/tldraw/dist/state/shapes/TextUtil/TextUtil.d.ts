import { TLBounds } from '@tldraw/core';
import * as React from 'react';
import { TDShapeUtil } from '../TDShapeUtil';
import { AlignStyle, TDMeta, TDShapeType, TextShape, TransformInfo } from '../../../types';
declare type T = TextShape;
declare type E = HTMLDivElement;
export declare class TextUtil extends TDShapeUtil<T, E> {
    type: TDShapeType.Text;
    isAspectRatioLocked: boolean;
    canEdit: boolean;
    canBind: boolean;
    canClone: boolean;
    bindingDistance: number;
    getShape: (props: Partial<T>) => T;
    texts: Map<string, string>;
    Component: React.ForwardRefExoticComponent<Pick<import("@tldraw/core").TLComponentProps<TextShape, HTMLDivElement, TDMeta>, "bounds" | "meta" | "isGhost" | "isEditing" | "shape" | "events" | "onShapeChange" | "onShapeBlur" | "asset" | "isBinding" | "isHovered" | "isSelected" | "isChildOfSelected"> & React.RefAttributes<HTMLDivElement>>;
    Indicator: (props: {
        shape: TextShape;
        meta: any;
        isHovered: boolean;
        isSelected: boolean;
        bounds: TLBounds;
    }) => React.ReactElement<any, string | React.JSXElementConstructor<any>>;
    getBounds: (shape: T) => TLBounds;
    shouldRender: (prev: T, next: T) => boolean;
    transform: (shape: T, bounds: TLBounds, { initialShape, scaleX, scaleY }: TransformInfo<T>) => Partial<T>;
    transformSingle: (shape: T, bounds: TLBounds, { initialShape, scaleX, scaleY }: TransformInfo<T>) => Partial<T> | void;
    onDoubleClickBoundsHandle: (shape: T) => {
        style: {
            scale: number;
            color: import("../../../types").ColorStyle;
            size: import("../../../types").SizeStyle;
            dash: import("../../../types").DashStyle;
            font?: import("../../../types").FontStyle | undefined;
            textAlign?: AlignStyle | undefined;
            isFilled?: boolean | undefined;
        };
        point: number[];
    };
    getSvgElement: (shape: T, isDarkMode: boolean) => SVGElement | void;
}
export {};
//# sourceMappingURL=TextUtil.d.ts.map