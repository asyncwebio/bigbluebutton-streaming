import { StrokeOptions, StrokePoint } from 'perfect-freehand';
import type { DrawShape } from '../../../types';
export declare function getFreehandOptions(shape: DrawShape): StrokeOptions;
export declare function getFillPath(shape: DrawShape): string;
export declare function getDrawStrokePoints(shape: DrawShape, options: StrokeOptions): StrokePoint[];
/**
 * Get path data for a stroke with the DashStyle.Draw dash style.
 */
export declare function getDrawStrokePathTDSnapshot(shape: DrawShape): string;
/**
 * Get SVG path data for a shape that has a DashStyle other than DashStyles.Draw.
 */
export declare function getSolidStrokePathTDSnapshot(shape: DrawShape): string;
//# sourceMappingURL=drawHelpers.d.ts.map