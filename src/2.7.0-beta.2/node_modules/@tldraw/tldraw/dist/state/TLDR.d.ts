import { TLBounds, TLPageState, TLTransformInfo } from '@tldraw/core';
import { ArrowShape, ShapesWithProp, TDBinding, TDExportType, TDPage, TDShape, TDSnapshot, TldrawCommand } from '../types';
import type { TDShapeUtil } from './shapes/TDShapeUtil';
export declare class TLDR {
    static getShapeUtil<T extends TDShape>(type: T['type']): TDShapeUtil<T>;
    static getShapeUtil<T extends TDShape>(shape: T): TDShapeUtil<T>;
    static getSelectedShapes(data: TDSnapshot, pageId: string): TDShape[];
    static screenToWorld(data: TDSnapshot, point: number[]): number[];
    static getCameraZoom(zoom: number): number;
    static getPage(data: TDSnapshot, pageId: string): TDPage;
    static getPageState(data: TDSnapshot, pageId: string): TLPageState;
    static getSelectedIds(data: TDSnapshot, pageId: string): string[];
    static getShapes(data: TDSnapshot, pageId: string): TDShape[];
    static getCamera(data: TDSnapshot, pageId: string): TLPageState['camera'];
    static getShape<T extends TDShape = TDShape>(data: TDSnapshot, shapeId: string, pageId: string): T;
    static getCenter<T extends TDShape>(shape: T): number[];
    static getBounds<T extends TDShape>(shape: T): TLBounds;
    static getRotatedBounds<T extends TDShape>(shape: T): TLBounds;
    static getSelectedBounds(data: TDSnapshot): TLBounds;
    static getParentId(data: TDSnapshot, id: string, pageId: string): string;
    static getDocumentBranch(data: TDSnapshot, id: string, pageId: string): string[];
    static getSelectedBranchSnapshot<K>(data: TDSnapshot, pageId: string, fn: (shape: TDShape) => K): ({
        id: string;
    } & K)[];
    static getSelectedBranchSnapshot(data: TDSnapshot, pageId: string): TDShape[];
    static getSelectedShapeSnapshot(data: TDSnapshot, pageId: string): TDShape[];
    static getSelectedShapeSnapshot<K>(data: TDSnapshot, pageId: string, fn?: (shape: TDShape) => K): ({
        id: string;
    } & K)[];
    static getAllEffectedShapeIds(data: TDSnapshot, ids: string[], pageId: string): string[];
    static getLinkedShapeIds(data: TDSnapshot, pageId: string, direction: 'center' | 'left' | 'right', includeArrows?: boolean): string[];
    static getChildIndexAbove(data: TDSnapshot, id: string, pageId: string): number;
    static getBeforeShape<T extends TDShape>(shape: T, change: Partial<T>): Partial<T>;
    static mutateShapes<T extends TDShape>(data: TDSnapshot, ids: string[], fn: (shape: T, i: number) => Partial<T> | void, pageId: string, forceChildrenTraversal?: boolean): {
        before: Record<string, Partial<T>>;
        after: Record<string, Partial<T>>;
        data: TDSnapshot;
    };
    static createShapes(data: TDSnapshot, shapes: TDShape[], pageId: string): TldrawCommand;
    static deleteShapes(data: TDSnapshot, shapes: TDShape[] | string[], pageId?: string): TldrawCommand;
    static onSessionComplete<T extends TDShape>(shape: T): T;
    static onChildrenChange<T extends TDShape>(data: TDSnapshot, shape: T, pageId: string): T | undefined;
    static updateArrowBindings(page: TDPage, arrowShape: ArrowShape): void | Partial<ArrowShape> | undefined;
    static transform<T extends TDShape>(shape: T, bounds: TLBounds, info: TLTransformInfo<T>): T;
    static transformSingle<T extends TDShape>(shape: T, bounds: TLBounds, info: TLTransformInfo<T>): T;
    /**
     * Rotate a shape around an origin point.
     * @param shape a shape.
     * @param center the shape's center in page space.
     * @param origin the page point to rotate around.
     * @param rotation the amount to rotate the shape.
     */
    static getRotatedShapeMutation<T extends TDShape>(shape: T, // in page space
    center: number[], // in page space
    origin: number[], // in page space (probably the center of common bounds)
    delta: number): Partial<T> | void;
    static updateParents(data: TDSnapshot, pageId: string, changedShapeIds: string[]): void;
    static getBinding(data: TDSnapshot, id: string, pageId: string): TDBinding;
    static getBindings(data: TDSnapshot, pageId: string): TDBinding[];
    static getBindableShapeIds(data: TDSnapshot): string[];
    static getBindingsWithShapeIds(data: TDSnapshot, ids: string[], pageId: string): TDBinding[];
    static getRelatedBindings(data: TDSnapshot, ids: string[], pageId: string): TDBinding[];
    static copyStringToClipboard: (string: string) => void;
    static flattenShape: (data: TDSnapshot, shape: TDShape) => TDShape[];
    static flattenPage: (data: TDSnapshot, pageId: string) => TDShape[];
    static getTopChildIndex: (data: TDSnapshot, pageId: string) => number;
    static fixNewLines: RegExp;
    static normalizeText(text: string): string;
    static assertShapeHasProperty<P extends keyof TDShape>(shape: TDShape, prop: P): asserts shape is ShapesWithProp<P>;
    static warn(e: any): void;
    static error(e: any): void;
    static getSvgString(svg: SVGElement, scale?: number): string;
    static getSvgAsDataUrl(svg: SVGElement, scale?: number): string;
    static getImageForSvg(svg: SVGElement, type?: Exclude<TDExportType, TDExportType.JSON>, opts?: Partial<{
        scale: number;
        quality: number;
    }>): Promise<Blob | undefined>;
}
//# sourceMappingURL=TLDR.d.ts.map