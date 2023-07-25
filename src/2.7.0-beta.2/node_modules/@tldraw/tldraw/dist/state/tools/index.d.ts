import { TDShapeType, TDToolType } from '../../types';
import { ArrowTool } from './ArrowTool';
import { DrawTool } from './DrawTool';
import { EllipseTool } from './EllipseTool';
import { EraseTool } from './EraseTool';
import { LineTool } from './LineTool';
import { RectangleTool } from './RectangleTool';
import { SelectTool } from './SelectTool';
import { StickyTool } from './StickyTool';
import { TextTool } from './TextTool';
import { TriangleTool } from './TriangleTool';
export interface ToolsMap {
    select: typeof SelectTool;
    erase: typeof EraseTool;
    [TDShapeType.Text]: typeof TextTool;
    [TDShapeType.Draw]: typeof DrawTool;
    [TDShapeType.Ellipse]: typeof EllipseTool;
    [TDShapeType.Rectangle]: typeof RectangleTool;
    [TDShapeType.Triangle]: typeof TriangleTool;
    [TDShapeType.Line]: typeof LineTool;
    [TDShapeType.Arrow]: typeof ArrowTool;
    [TDShapeType.Sticky]: typeof StickyTool;
}
export declare type ToolOfType<K extends TDToolType> = ToolsMap[K];
export declare type ArgsOfType<K extends TDToolType> = ConstructorParameters<ToolOfType<K>>;
export declare const tools: {
    [K in TDToolType]: ToolsMap[K];
};
//# sourceMappingURL=index.d.ts.map