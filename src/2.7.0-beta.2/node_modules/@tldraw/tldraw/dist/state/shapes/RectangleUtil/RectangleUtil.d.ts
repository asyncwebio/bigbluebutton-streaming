import * as React from 'react';
import { TDShapeUtil } from '../TDShapeUtil';
import { transformRectangle, transformSingleRectangle } from '../shared';
import { RectangleShape, TDMeta, TDShapeType } from '../../../types';
declare type T = RectangleShape;
declare type E = HTMLDivElement;
export declare class RectangleUtil extends TDShapeUtil<T, E> {
    type: TDShapeType.Rectangle;
    canBind: boolean;
    canClone: boolean;
    canEdit: boolean;
    getShape: (props: Partial<T>) => T;
    Component: React.ForwardRefExoticComponent<Pick<import("@tldraw/core").TLComponentProps<RectangleShape, HTMLDivElement, TDMeta>, "bounds" | "meta" | "isGhost" | "isEditing" | "shape" | "events" | "onShapeChange" | "onShapeBlur" | "asset" | "isBinding" | "isHovered" | "isSelected" | "isChildOfSelected"> & React.RefAttributes<HTMLDivElement>>;
    Indicator: (props: {
        shape: RectangleShape;
        meta: any;
        isHovered: boolean;
        isSelected: boolean;
        bounds: import("@tldraw/core").TLBounds;
    }) => React.ReactElement<any, string | React.JSXElementConstructor<any>>;
    getBounds: (shape: T) => import("@tldraw/core").TLBounds;
    shouldRender: (prev: T, next: T) => boolean;
    transform: typeof transformRectangle;
    transformSingle: typeof transformSingleRectangle;
}
export {};
//# sourceMappingURL=RectangleUtil.d.ts.map