import * as React from 'react';
export declare function useFileSystemHandlers(): {
    onNewProject: (e?: React.MouseEvent | React.KeyboardEvent | KeyboardEvent) => Promise<void>;
    onSaveProject: (e?: React.MouseEvent | React.KeyboardEvent | KeyboardEvent) => void;
    onSaveProjectAs: (e?: React.MouseEvent | React.KeyboardEvent | KeyboardEvent) => void;
    onOpenProject: (e?: React.MouseEvent | React.KeyboardEvent | KeyboardEvent) => Promise<void>;
    onOpenMedia: (e?: React.MouseEvent | React.KeyboardEvent | KeyboardEvent) => Promise<void>;
};
//# sourceMappingURL=useFileSystemHandlers.d.ts.map