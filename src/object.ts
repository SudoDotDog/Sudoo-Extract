/**
 * @author WMXPY
 * @namespace Extract
 * @description Object
 */

import { isExist } from "./check";
import { Unsafe } from "./declare";
import { SafeExtract } from "./index";

export class SafeObject<T = any> {

    private readonly _object: Unsafe<T>;
    private readonly _error: Error;

    public constructor(object: Unsafe<T>, error: Error) {

        this._object = object;
        this._error = error;
    }

    public get value(): Unsafe<T> {

        return this._object;
    }

    public direct<K extends keyof T>(key: K): T[K] {

        const secured: SafeExtract<T[K]> = this.safe(key);
        return secured.value as T[K];
    }

    public safe<K extends keyof T>(key: K): SafeExtract<T[K]> {

        const extracted: Unsafe<T[K]> = this._object[key];

        if (isExist<T[K]>(extracted)) {
            return SafeExtract(extracted, this._error);
        }

        throw this._error;
    }

    public unsafe<K extends keyof T>(key: K): SafeExtract<T[K]> | null {

        const extracted: Unsafe<T[K]> | undefined = this._object[key];

        if (isExist<T[K]>(extracted)) {
            return SafeExtract(extracted, this._error);
        }

        return null;
    }
}
