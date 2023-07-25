import type { TldrawApp } from '../../TldrawApp';
import { BaseSession } from '../BaseSession';
import { SessionType, TDShape, TDStatus, TldrawCommand, TldrawPatch } from '../../../types';
export declare class RotateSession extends BaseSession {
    type: SessionType;
    status: TDStatus;
    performanceMode: undefined;
    delta: number[];
    commonBoundsCenter: number[];
    initialAngle: number;
    initialShapes: {
        shape: TDShape;
        center: number[];
    }[];
    changes: Record<string, Partial<TDShape>>;
    constructor(app: TldrawApp);
    start: () => TldrawPatch | undefined;
    update: () => TldrawPatch | undefined;
    cancel: () => TldrawPatch | undefined;
    complete: () => TldrawPatch | TldrawCommand | undefined;
}
//# sourceMappingURL=RotateSession.d.ts.map