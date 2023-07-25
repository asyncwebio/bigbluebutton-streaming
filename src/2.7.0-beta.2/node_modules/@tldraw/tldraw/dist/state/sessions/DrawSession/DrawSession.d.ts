import type { TldrawApp } from '../../TldrawApp';
import { BaseSession } from '../BaseSession';
import { DrawShape, SessionType, TDStatus, TldrawCommand, TldrawPatch } from '../../../types';
export declare class DrawSession extends BaseSession {
    type: SessionType;
    performanceMode: undefined;
    status: TDStatus;
    topLeft: number[];
    points: number[][];
    initialShape: DrawShape;
    lastAdjustedPoint: number[];
    shiftedPoints: number[][];
    shapeId: string;
    isLocked?: boolean;
    isExtending: boolean;
    lockedDirection?: 'horizontal' | 'vertical';
    constructor(app: TldrawApp, id: string);
    start: () => {
        document: {
            pages: {
                [x: string]: {
                    shapes: {
                        [x: string]: {
                            point: number[];
                            points: number[][];
                        };
                    };
                };
            };
            pageStates: {
                [x: string]: {
                    selectedIds: string[];
                };
            };
        };
    };
    update: () => TldrawPatch | undefined;
    cancel: () => TldrawPatch | undefined;
    complete: () => TldrawPatch | TldrawCommand | undefined;
    addPoint: (currentPoint: number[]) => {
        point: number[];
        points: number[][];
    } | undefined;
}
//# sourceMappingURL=DrawSession.d.ts.map