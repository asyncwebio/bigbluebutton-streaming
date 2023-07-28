import type { TLPointerEventHandler } from '@tldraw/core';
import { BaseTool } from '../BaseTool';
declare enum Status {
    Idle = "idle",
    Pointing = "pointing",
    Erasing = "erasing"
}
export declare class EraseTool extends BaseTool {
    type: "erase";
    status: Status;
    onPointerDown: TLPointerEventHandler;
    onPointerMove: TLPointerEventHandler;
    onPointerUp: TLPointerEventHandler;
    onCancel: () => void;
}
export {};
//# sourceMappingURL=EraseTool.d.ts.map