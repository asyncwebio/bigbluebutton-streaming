declare type Vert = number[];
declare type Edge = Vert[];
declare type Polygon = Vert[];
export declare class PolygonUtils {
    static inwardEdgeNormal(edge: Edge): number[];
    static outwardEdgeNormal(edge: Edge): number[];
    static leftSide: (p1: number[], pc: number[], p2: number[]) => number;
    static isReflexVertex(polygon: Polygon, index: number): boolean;
    static getEdges(vertices: Vert[]): Vert[][];
    static edgesIntersection([A1, A2]: number[][], [B1, B2]: number[][]): number[] | null;
    static appendArc(polygon: number[][], center: number[], radius: number, startVertex: number[], endVertex: number[], isPaddingBoundary?: boolean): number[][];
    static createOffsetEdge(edge: Edge, offset: number[]): number[][];
    static getOffsetPolygon(polygon: Polygon, offset?: number): number[][];
    static createPaddingPolygon(polygon: number[][][], shapePadding?: number): number[][];
}
export declare function getOffsetPolygon(points: number[][], offset: number): number[][];
export {};
//# sourceMappingURL=PolygonUtils.d.ts.map