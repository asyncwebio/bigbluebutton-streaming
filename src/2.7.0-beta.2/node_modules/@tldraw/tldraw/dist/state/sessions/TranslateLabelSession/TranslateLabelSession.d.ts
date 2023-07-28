import type { TLBounds } from '@tldraw/core';
import type { TldrawApp } from '../../TldrawApp';
import { BaseSession } from '../BaseSession';
import { ArrowShape, EllipseShape, RectangleShape, SessionType, TDStatus, TldrawCommand, TldrawPatch, TriangleShape } from '../../../types';
export declare class TranslateLabelSession extends BaseSession {
    type: SessionType;
    performanceMode: undefined;
    status: TDStatus;
    initialShape: RectangleShape | TriangleShape | EllipseShape | ArrowShape;
    initialShapeBounds: TLBounds;
    constructor(app: TldrawApp, shapeId: string);
    start: () => TldrawPatch | undefined;
    update: () => TldrawPatch | undefined;
    cancel: () => TldrawPatch | undefined;
    complete: () => TldrawPatch | TldrawCommand | undefined;
}
//# sourceMappingURL=TranslateLabelSession.d.ts.map