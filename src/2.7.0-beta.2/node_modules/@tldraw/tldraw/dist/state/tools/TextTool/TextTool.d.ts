import type { TLKeyboardEventHandler, TLPointerEventHandler } from '@tldraw/core';
import { BaseTool } from '../BaseTool';
import { TDShapeType } from '../../../types';
export declare class TextTool extends BaseTool {
    type: TDShapeType.Text;
    stopEditingShape: () => void;
    onKeyUp: TLKeyboardEventHandler;
    onKeyDown: TLKeyboardEventHandler;
    onPointerDown: TLPointerEventHandler;
    onPointerUp: TLPointerEventHandler;
    onPointShape: TLPointerEventHandler;
    onShapeBlur: () => void;
}
//# sourceMappingURL=TextTool.d.ts.map