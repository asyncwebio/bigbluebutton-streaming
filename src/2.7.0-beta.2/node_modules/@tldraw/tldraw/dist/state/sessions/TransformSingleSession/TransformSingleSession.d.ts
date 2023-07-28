import { TLBounds, TLBoundsCorner, TLBoundsEdge, TLBoundsWithCenter } from '@tldraw/core';
import type { TldrawApp } from '../../TldrawApp';
import { BaseSession } from '../BaseSession';
import { SessionType, TDShape, TDStatus, TldrawCommand, TldrawPatch } from '../../../types';
declare type SnapInfo = {
    state: 'empty';
} | {
    state: 'ready';
    bounds: TLBoundsWithCenter[];
};
export declare class TransformSingleSession extends BaseSession {
    type: SessionType;
    status: TDStatus;
    performanceMode: undefined;
    transformType: TLBoundsEdge | TLBoundsCorner;
    scaleX: number;
    scaleY: number;
    isCreate: boolean;
    initialShape: TDShape;
    initialShapeBounds: TLBounds;
    initialCommonBounds: TLBounds;
    snapInfo: SnapInfo;
    prevPoint: number[];
    speed: number;
    constructor(app: TldrawApp, id: string, transformType: TLBoundsEdge | TLBoundsCorner, isCreate?: boolean);
    start: () => TldrawPatch | undefined;
    update: () => TldrawPatch | undefined;
    cancel: () => TldrawPatch | undefined;
    complete: () => TldrawPatch | TldrawCommand | undefined;
}
export {};
//# sourceMappingURL=TransformSingleSession.d.ts.map