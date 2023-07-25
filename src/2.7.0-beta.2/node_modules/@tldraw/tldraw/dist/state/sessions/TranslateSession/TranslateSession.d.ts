import { TLBounds, TLBoundsWithCenter, TLSnapLine } from '@tldraw/core';
import type { TldrawApp } from '../../TldrawApp';
import { BaseSession } from '../BaseSession';
import { ArrowBinding, SessionType, TDShape, TDStatus, TldrawCommand, TldrawPatch } from '../../../types';
declare type CloneInfo = {
    state: 'empty';
} | {
    state: 'ready';
    cloneMap: Record<string, string>;
    clones: TDShape[];
    clonedBindings: ArrowBinding[];
};
declare type SnapInfo = {
    state: 'empty';
} | {
    state: 'ready';
    others: TLBoundsWithCenter[];
    bounds: TLBoundsWithCenter[];
};
export declare class TranslateSession extends BaseSession {
    performanceMode: undefined;
    type: SessionType;
    status: TDStatus;
    delta: number[];
    prev: number[];
    prevPoint: number[];
    speed: number;
    cloneInfo: CloneInfo;
    snapInfo: SnapInfo;
    snapLines: TLSnapLine[];
    isCloning: boolean;
    isCreate: boolean;
    link: 'left' | 'right' | 'center' | false;
    initialIds: Set<string>;
    hasUnlockedShapes: boolean;
    initialSelectedIds: string[];
    initialCommonBounds: TLBounds;
    initialShapes: TDShape[];
    initialParentChildren: Record<string, string[]>;
    bindingsToDelete: ArrowBinding[];
    constructor(app: TldrawApp, isCreate?: boolean, link?: 'left' | 'right' | 'center' | false);
    start: () => TldrawPatch | undefined;
    update: () => TldrawPatch | undefined;
    cancel: () => TldrawPatch | undefined;
    complete: () => TldrawPatch | TldrawCommand | undefined;
    private createCloneInfo;
}
export {};
//# sourceMappingURL=TranslateSession.d.ts.map