/**
 * @author WMXPY
 * @namespace Extract
 * @description Index
 */

import { isExist } from "./check";

export class SafeExtract<T = any> {

    public static create<T>(object: Partial<T>): SafeExtract<T> {

        return new SafeExtract<T>(object);
    }

    private readonly _object: Partial<T>;
    private readonly _error: Error;

    private constructor(object: Partial<T>, error: Error = new Error('[Sudoo-Extract] Extract failed')) {

        this._object = object;
        this._error = error;
    }

    public get value(): Partial<T> {

        return this._object;
    }

    public onError(error: Error): SafeExtract<T> {

        return new SafeExtract<T>(this._object, error);
    }

    public direct<K extends keyof T>(key: K): T[K] {

        const secured: SafeExtract<T[K]> = this.safe(key);
        return secured.value as T[K];
    }

    public safe<K extends keyof T>(key: K): SafeExtract<T[K]> {

        const extracted: T[K] | undefined = this._object[key];

        if (isExist<T[K]>(extracted)) {
            return new SafeExtract<T[K]>(extracted, this._error);
        }

        throw this._error;
    }

    public unsafe<K extends keyof T>(key: K): SafeExtract<T[K]> | null {

        const extracted: T[K] | undefined = this._object[key];

        if (isExist<T[K]>(extracted)) {
            return new SafeExtract<T[K]>(extracted, this._error);
        }

        return null;
    }
}
