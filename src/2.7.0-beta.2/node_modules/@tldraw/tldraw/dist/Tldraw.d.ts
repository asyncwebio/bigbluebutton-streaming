import '@fontsource/caveat-brush';
import '@fontsource/crimson-pro';
import '@fontsource/recursive';
import '@fontsource/source-code-pro';
import '@fontsource/source-sans-pro';
import { CursorComponent } from '@tldraw/core';
import { TDCallbacks } from './state';
import { TDDocument } from './types';
export interface TldrawProps extends TDCallbacks {
    /**
     * (optional) If provided, the component will load / persist state under this key.
     */
    id?: string;
    /**
     * (optional) The document to load or update from.
     */
    document?: TDDocument;
    /**
     * (optional) The current page id.
     */
    currentPageId?: string;
    /**
     * (optional) Whether the editor should immediately receive focus. Defaults to true.
     */
    autofocus?: boolean;
    /**
     * (optional) Whether to show the menu UI.
     */
    showMenu?: boolean;
    /**
     * (optional) Whether to show the multiplayer menu.
     */
    showMultiplayerMenu?: boolean;
    /**
     * (optional) Whether to show the pages UI.
     */
    showPages?: boolean;
    /**
     * (optional) Whether to show the styles UI.
     */
    showStyles?: boolean;
    /**
     * (optional) Whether to show the zoom UI.
     */
    showZoom?: boolean;
    /**
     * (optional) Whether to show the tools UI.
     */
    showTools?: boolean;
    /**
     * (optional) Whether to show the UI.
     */
    showUI?: boolean;
    /**
     * (optional) Whether to the document should be read only.
     */
    readOnly?: boolean;
    /**
     * (optional) Whether to to show the app's dark mode UI.
     */
    darkMode?: boolean;
    /**
     * (optional) If provided, image/video componnets will be disabled.
     *
     * Warning: Keeping this enabled for multiplayer applications without provifing a storage
     * bucket based solution will cause massive base64 string to be written to the liveblocks room.
     */
    disableAssets?: boolean;
    /**
     * (optional) Custom components to override parts of the default UI.
     */
    components?: {
        /**
         * The component to render for multiplayer cursors.
         */
        Cursor?: CursorComponent;
    };
    /**
     * (optional) To hide cursors
     */
    hideCursors?: boolean;
}
export declare function Tldraw({ id, document, currentPageId, autofocus, showMenu, showMultiplayerMenu, showPages, showTools, showZoom, showStyles, showUI, readOnly, disableAssets, darkMode, components, onMount, onChange, onChangePresence, onNewProject, onSaveProject, onSaveProjectAs, onOpenProject, onOpenMedia, onUndo, onRedo, onPersist, onPatch, onCommand, onChangePage, onAssetCreate, onAssetDelete, onAssetUpload, onSessionStart, onSessionEnd, onExport, hideCursors, }: TldrawProps): JSX.Element;
//# sourceMappingURL=Tldraw.d.ts.map