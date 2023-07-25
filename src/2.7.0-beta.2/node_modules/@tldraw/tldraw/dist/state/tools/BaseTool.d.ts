import { TLKeyboardEventHandler, TLPinchEventHandler, TLPointerEventHandler } from '@tldraw/core';
import type { TldrawApp } from '../TldrawApp';
import { TDEventHandler, TDToolType } from '../../types';
export declare enum Status {
    Idle = "idle",
    Creating = "creating",
    Pinching = "pinching"
}
export declare abstract class BaseTool<T extends string = any> extends TDEventHandler {
    app: TldrawApp;
    type: TDToolType;
    previous?: TDToolType;
    status: Status | T;
    constructor(app: TldrawApp);
    protected readonly setStatus: (status: Status | T) => void;
    onEnter: () => void;
    onExit: () => void;
    onCancel: () => void;
    getNextChildIndex: () => number;
    onPinchStart: TLPinchEventHandler;
    onPinchEnd: TLPinchEventHandler;
    onPinch: TLPinchEventHandler;
    onKeyDown: TLKeyboardEventHandler;
    onKeyUp: TLKeyboardEventHandler;
    onPointerMove: TLPointerEventHandler;
    onPointerUp: TLPointerEventHandler;
}
//# sourceMappingURL=BaseTool.d.ts.map