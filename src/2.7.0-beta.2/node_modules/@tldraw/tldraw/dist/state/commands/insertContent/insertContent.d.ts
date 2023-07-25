import type { TldrawApp } from '../../TldrawApp';
import type { TDAsset, TDBinding, TDShape, TldrawCommand } from '../../../types';
export declare function insertContent(app: TldrawApp, content: {
    shapes: TDShape[];
    bindings?: TDBinding[];
    assets?: TDAsset[];
}, opts?: {
    point?: number[] | undefined;
    select?: boolean | undefined;
    overwrite?: boolean | undefined;
}): TldrawCommand;
//# sourceMappingURL=insertContent.d.ts.map