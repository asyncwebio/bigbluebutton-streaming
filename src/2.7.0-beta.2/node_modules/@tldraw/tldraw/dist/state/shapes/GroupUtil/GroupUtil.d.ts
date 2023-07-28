import * as React from 'react';
import { TDShapeUtil } from '../TDShapeUtil';
import { GroupShape, TDMeta, TDShapeType } from '../../../types';
declare type T = GroupShape;
declare type E = SVGSVGElement;
export declare class GroupUtil extends TDShapeUtil<T, E> {
    type: TDShapeType.Group;
    canBind: boolean;
    getShape: (props: Partial<T>) => T;
    Component: React.ForwardRefExoticComponent<Pick<import("@tldraw/core").TLComponentProps<GroupShape, SVGSVGElement, TDMeta>, "bounds" | "meta" | "isGhost" | "isEditing" | "shape" | "events" | "onShapeChange" | "onShapeBlur" | "asset" | "isBinding" | "isHovered" | "isSelected" | "isChildOfSelected"> & React.RefAttributes<SVGSVGElement>>;
    Indicator: (props: {
        shape: GroupShape;
        meta: any;
        isHovered: boolean;
        isSelected: boolean;
        bounds: import("@tldraw/core").TLBounds;
    }) => React.ReactElement<any, string | React.JSXElementConstructor<any>>;
    getBounds: (shape: T) => import("@tldraw/core").TLBounds;
    shouldRender: (prev: T, next: T) => boolean;
}
export {};
//# sourceMappingURL=GroupUtil.d.ts.map