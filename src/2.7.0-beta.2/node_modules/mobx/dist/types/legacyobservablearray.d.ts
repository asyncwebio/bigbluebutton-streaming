import { IEnhancer, IObservableArray } from "../internal";
export declare function reserveArrayBuffer(max: number): void;
export declare function createLegacyArray<T>(initialValues: T[] | undefined, enhancer: IEnhancer<T>, name?: string): IObservableArray<T>;
