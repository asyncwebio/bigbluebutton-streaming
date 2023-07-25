import type { TldrawApp } from '../../TldrawApp';
import { BaseSession } from '../BaseSession';
import { SessionType, TDShape, TDStatus, TldrawCommand, TldrawPatch } from '../../../types';
export declare class EraseSession extends BaseSession {
    type: SessionType;
    performanceMode: undefined;
    status: TDStatus;
    isLocked?: boolean;
    lockedDirection?: 'horizontal' | 'vertical';
    erasedShapes: Set<TDShape>;
    erasedBindings: Set<import("../../../types").ArrowBinding>;
    initialSelectedShapes: TDShape[];
    erasableShapes: Set<TDShape>;
    prevPoint: number[];
    prevEraseShapesSize: number;
    constructor(app: TldrawApp);
    interval: any;
    timestamp1: number;
    timestamp2: number;
    prevErasePoint: number[];
    loop: () => void;
    start: () => TldrawPatch | undefined;
    update: () => TldrawPatch | undefined;
    cancel: () => TldrawPatch | undefined;
    complete: () => TldrawPatch | TldrawCommand | undefined;
}
//# sourceMappingURL=EraseSession.d.ts.map