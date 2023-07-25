import type { TldrawApp } from '../../TldrawApp';
import { BaseSession } from '../BaseSession';
import { ArrowShape, SessionType, TDBinding, TDStatus, TldrawCommand, TldrawPatch } from '../../../types';
export declare class ArrowSession extends BaseSession {
    type: SessionType;
    performanceMode: undefined;
    status: TDStatus;
    newStartBindingId: string;
    draggedBindingId: string;
    didBind: boolean;
    initialShape: ArrowShape;
    handleId: 'start' | 'end';
    bindableShapeIds: string[];
    initialBinding?: TDBinding;
    startBindingShapeId?: string;
    isCreate: boolean;
    constructor(app: TldrawApp, shapeId: string, handleId: 'start' | 'end', isCreate?: boolean);
    start: () => TldrawPatch | undefined;
    update: () => TldrawPatch | undefined;
    cancel: () => TldrawPatch | undefined;
    complete: () => TldrawPatch | TldrawCommand | undefined;
    private findBindingPoint;
}
//# sourceMappingURL=ArrowSession.d.ts.map