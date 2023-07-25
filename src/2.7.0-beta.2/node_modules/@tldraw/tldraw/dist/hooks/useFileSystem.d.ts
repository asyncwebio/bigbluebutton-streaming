import type { TldrawApp } from '../state';
import { DialogState } from './useDialog';
export declare function useFileSystem(): {
    onNewProject: (app: TldrawApp, openDialog: (dialogState: DialogState, onYes: () => Promise<void>, onNo: () => Promise<void>, onCancel: () => Promise<void>) => void) => Promise<void>;
    onSaveProject: (app: TldrawApp) => void;
    onSaveProjectAs: (app: TldrawApp) => void;
    onOpenProject: (app: TldrawApp, openDialog: (dialogState: DialogState, onYes: () => Promise<void>, onNo: () => Promise<void>, onCancel: () => Promise<void>) => void) => Promise<void>;
    onOpenMedia: (app: TldrawApp) => Promise<void>;
};
//# sourceMappingURL=useFileSystem.d.ts.map