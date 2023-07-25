import type { TLPointerEventHandler } from '@tldraw/core';
import { BaseTool } from '../BaseTool';
import { TDShapeType } from '../../../types';
export declare class StickyTool extends BaseTool {
    type: TDShapeType.Sticky;
    shapeId?: string;
    onPointerDown: TLPointerEventHandler;
    onPointerUp: TLPointerEventHandler;
}
//# sourceMappingURL=StickyTool.d.ts.map