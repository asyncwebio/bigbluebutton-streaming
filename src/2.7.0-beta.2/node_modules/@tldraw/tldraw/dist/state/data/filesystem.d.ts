import type { TDDocument } from '../../types';
export declare function loadFileHandle(): Promise<any>;
export declare function saveFileHandle(fileHandle: FileSystemFileHandle | null): Promise<void>;
export declare function saveToFileSystem(document: TDDocument, fileHandle: FileSystemFileHandle | null, name?: string): Promise<FileSystemFileHandle | null>;
export declare function openFromFileSystem(): Promise<null | {
    fileHandle: FileSystemFileHandle | null;
    document: TDDocument;
}>;
export declare function openAssetsFromFileSystem(): Promise<import("browser-fs-access").FileWithHandle[]>;
export declare function fileToBase64(file: Blob): Promise<string | ArrayBuffer | null>;
export declare function fileToText(file: Blob): Promise<string | ArrayBuffer | null>;
export declare function getImageSizeFromSrc(src: string): Promise<number[]>;
export declare function getVideoSizeFromSrc(src: string): Promise<number[]>;
//# sourceMappingURL=filesystem.d.ts.map