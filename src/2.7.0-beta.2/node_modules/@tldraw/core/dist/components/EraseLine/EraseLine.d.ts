import * as React from 'react';
export interface UiEraseLineProps {
    points: number[][];
    zoom: number;
}
export declare type UiEraseLineComponent = (props: UiEraseLineProps) => any | null;
declare function _EraseLine({ points, zoom }: UiEraseLineProps): JSX.Element | null;
export declare const EraseLine: React.MemoExoticComponent<typeof _EraseLine>;
export {};
//# sourceMappingURL=EraseLine.d.ts.map