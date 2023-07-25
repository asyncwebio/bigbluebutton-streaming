import { UseBoundStore } from 'zustand';
import { StoreApi } from 'zustand/vanilla';
import type { Command, Patch } from '../../types';
export declare class StateManager<T extends Record<string, any>> {
    /**
     * An ID used to persist state in indexdb.
     */
    protected _idbId?: string;
    /**
     * The initial state.
     */
    private initialState;
    /**
     * A zustand store that also holds the state.
     */
    private store;
    /**
     * The index of the current command.
     */
    protected pointer: number;
    /**
     * The current state.
     */
    private _state;
    /**
     * The state manager's current status, with regard to restoring persisted state.
     */
    private _status;
    /**
     * A stack of commands used for history (undo and redo).
     */
    protected stack: Command<T>[];
    /**
     * A snapshot of the current state.
     */
    protected _snapshot: T;
    /**
     * A React hook for accessing the zustand store.
     */
    readonly useStore: UseBoundStore<StoreApi<T>>;
    /**
     * A promise that will resolve when the state manager has loaded any peristed state.
     */
    ready: Promise<'none' | 'restored' | 'migrated'>;
    isPaused: boolean;
    constructor(initialState: T, id?: string, version?: number, update?: (prev: T, next: T, prevVersion: number) => T);
    /**
     * Save the current state to indexdb.
     */
    protected persist: (patch: Patch<T>, id?: string) => void | Promise<void>;
    /**
     * Apply a patch to the current state.
     * This does not effect the undo/redo stack.
     * This does not persist the state.
     * @param patch The patch to apply.
     * @param id (optional) An id for the patch.
     */
    private applyPatch;
    protected migrate: (next: T) => T;
    /**
     * Perform any last changes to the state before updating.
     * Override this on your extending class.
     * @param nextState The next state.
     * @param prevState The previous state.
     * @param patch The patch that was just applied.
     * @param id (optional) An id for the just-applied patch.
     * @returns The final new state to apply.
     */
    protected cleanup: (nextState: T, _prevState: T, _patch: Patch<T>, _id?: string) => T;
    /**
     * A life-cycle method called when the state is about to change.
     * @param state The next state.
     * @param id An id for the change.
     */
    protected onStateWillChange?: (state: T, id?: string) => void;
    /**
     * A life-cycle method called when the state has changed.
     * @param state The next state.
     * @param id An id for the change.
     */
    protected onStateDidChange?: (state: T, id?: string) => void;
    /**
     * Apply a patch to the current state.
     * This does not effect the undo/redo stack.
     * This does not persist the state.
     * @param patch The patch to apply.
     * @param id (optional) An id for this patch.
     */
    patchState: (patch: Patch<T>, id?: string) => this;
    /**
     * Replace the current state.
     * This does not effect the undo/redo stack.
     * This does not persist the state.
     * @param state The new state.
     * @param id An id for this change.
     */
    protected replaceState: (state: T, id?: string) => this;
    /**
     * Update the state using a Command.
     * This effects the undo/redo stack.
     * This persists the state.
     * @param command The command to apply and add to the undo/redo stack.
     * @param id (optional) An id for this command.
     */
    protected setState: (command: Command<T>, id?: string | undefined) => this;
    pause(): void;
    resume(): void;
    /**
     * A callback fired when the constructor finishes loading any
     * persisted data.
     */
    protected onReady?: (message: 'none' | 'restored' | 'migrated') => void;
    /**
     * A callback fired when a patch is applied.
     */
    onPatch?: (state: T, patch: Patch<T>, id?: string) => void;
    /**
     * A callback fired when a patch is applied.
     */
    onCommand?: (state: T, command: Command<T>, id?: string) => void;
    /**
     * A callback fired when the state is persisted.
     */
    onPersist?: (state: T, patch: Patch<T>, id?: string) => void;
    /**
     * A callback fired when the state is replaced.
     */
    onReplace?: (state: T) => void;
    /**
     * A callback fired when the state is reset.
     */
    onReset?: (state: T) => void;
    /**
     * A callback fired when the history is reset.
     */
    onResetHistory?: (state: T) => void;
    /**
     * A callback fired when a command is undone.
     */
    onUndo?: (state: T) => void;
    /**
     * A callback fired when a command is redone.
     */
    onRedo?: (state: T) => void;
    /**
     * Reset the state to the initial state and reset history.
     */
    reset: () => this;
    /**
     * Force replace a new undo/redo history. It's your responsibility
     * to make sure that this is compatible with the current state!
     * @param history The new array of commands.
     * @param pointer (optional) The new pointer position.
     */
    replaceHistory: (history: Command<T>[], pointer?: number) => this;
    /**
     * Reset the history stack (without resetting the state).
     */
    resetHistory: () => this;
    /**
     * Move backward in the undo/redo stack.
     */
    undo: () => this;
    /**
     * Move forward in the undo/redo stack.
     */
    redo: () => this;
    /**
     * Save a snapshot of the current state, accessible at `this.snapshot`.
     */
    setSnapshot: () => this;
    /**
     * Force the zustand state to update.
     */
    forceUpdate: () => void;
    /**
     * Get whether the state manager can undo.
     */
    get canUndo(): boolean;
    /**
     * Get whether the state manager can redo.
     */
    get canRedo(): boolean;
    /**
     * The current state.
     */
    get state(): T;
    /**
     * The current status.
     */
    get status(): string;
    /**
     * The most-recent snapshot.
     */
    protected get snapshot(): T;
}
//# sourceMappingURL=StateManager.d.ts.map