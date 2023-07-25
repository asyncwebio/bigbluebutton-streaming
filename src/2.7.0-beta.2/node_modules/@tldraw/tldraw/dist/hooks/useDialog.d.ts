import * as React from 'react';
export declare type DialogState = 'saveFirstTime' | 'saveAgain';
interface AlertDialogProps {
    dialogState: DialogState | null;
    setDialogState: (dialogState: DialogState | null) => void;
    onYes: (() => void) | null;
    onNo: (() => void) | null;
    onCancel: (() => void) | null;
    openDialog: (dialogState: DialogState, onYes: () => void, onNo: () => void, onCancel: () => void) => void;
}
export declare const AlertDialogContext: React.Context<AlertDialogProps>;
export declare const useDialog: () => AlertDialogProps;
export {};
//# sourceMappingURL=useDialog.d.ts.map