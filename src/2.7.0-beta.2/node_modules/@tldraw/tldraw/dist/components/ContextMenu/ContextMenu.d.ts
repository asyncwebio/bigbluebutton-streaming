import * as React from 'react';
import { RowButtonProps } from '../Primitives/RowButton';
interface ContextMenuProps {
    onBlur?: React.FocusEventHandler;
    children: React.ReactNode;
}
export declare const _ContextMenu: ({ onBlur, children }: ContextMenuProps) => JSX.Element;
export interface ContextMenuSubMenuProps {
    label: string;
    size?: 'small';
    children: React.ReactNode;
    id?: string;
}
export declare function ContextMenuSubMenu({ children, label, size, id }: ContextMenuSubMenuProps): JSX.Element;
export declare const CMSubTriggerButton: ({ id, ...rest }: RowButtonProps) => JSX.Element;
export declare const ContextMenu: React.MemoExoticComponent<({ onBlur, children }: ContextMenuProps) => JSX.Element>;
export {};
//# sourceMappingURL=ContextMenu.d.ts.map