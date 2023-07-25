import type { TLBounds } from '@tldraw/core';
interface WithLabelMaskProps {
    id: string;
    bounds: TLBounds;
    labelSize: number[];
    offset?: number[];
    scale?: number;
}
export declare function LabelMask({ id, bounds, labelSize, offset, scale }: WithLabelMaskProps): JSX.Element;
export {};
//# sourceMappingURL=LabelMask.d.ts.map