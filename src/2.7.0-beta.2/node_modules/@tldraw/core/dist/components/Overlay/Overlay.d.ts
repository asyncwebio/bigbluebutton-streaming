import * as React from 'react';
export declare type OverlayProps = {
    camera: {
        point: number[];
        zoom: number;
    };
    children: React.ReactNode;
};
declare function _Overlay({ camera: { zoom, point }, children }: OverlayProps): JSX.Element;
export declare const Overlay: React.MemoExoticComponent<typeof _Overlay>;
export {};
//# sourceMappingURL=Overlay.d.ts.map