import * as React from 'react';
import { TDShapeUtil } from '../TDShapeUtil';
import { transformRectangle, transformSingleRectangle } from '../shared';
import { ImageShape, TDMeta, TDShapeType } from '../../../types';
declare type T = ImageShape;
declare type E = HTMLDivElement;
export declare class ImageUtil extends TDShapeUtil<T, E> {
    type: TDShapeType.Image;
    canBind: boolean;
    canClone: boolean;
    isAspectRatioLocked: boolean;
    showCloneHandles: boolean;
    getShape: (props: Partial<T>) => T;
    Component: React.ForwardRefExoticComponent<Pick<import("@tldraw/core").TLComponentProps<ImageShape, HTMLDivElement, TDMeta>, "bounds" | "meta" | "isGhost" | "isEditing" | "shape" | "events" | "onShapeChange" | "onShapeBlur" | "asset" | "isBinding" | "isHovered" | "isSelected" | "isChildOfSelected"> & React.RefAttributes<HTMLDivElement>>;
    Indicator: (props: {
        shape: ImageShape;
        meta: any;
        isHovered: boolean;
        isSelected: boolean;
        bounds: import("@tldraw/core").TLBounds;
    }) => React.ReactElement<any, string | React.JSXElementConstructor<any>>;
    getBounds: (shape: T) => import("@tldraw/core").TLBounds;
    shouldRender: (prev: T, next: T) => boolean;
    transform: typeof transformRectangle;
    transformSingle: typeof transformSingleRectangle;
    getSvgElement: (shape: ImageShape) => SVGImageElement;
}
export {};
//# sourceMappingURL=ImageUtil.d.ts.map