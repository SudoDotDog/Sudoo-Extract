/**
 * @author WMXPY
 * @namespace Extract
 * @description Object
 */

import { isExist, isSomething } from "./check";
import { Unsafe } from "./declare";
import { createExtract, SafeExtract } from "./extract";

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

    public direct<K extends keyof T>(key: K, currentError?: Error): T[K] {

        const secured: SafeExtract<T[K]> = this.safe(key, currentError);
        return secured.value as T[K];
    }

    public directEnsure<K extends keyof T>(key: K, currentError?: Error): T[K] {

        const directed: T[K] = this.direct(key, currentError);

        if (!isSomething(directed)) {

            throw currentError || this._error;
        }
        return directed;
    }

    public ensure<K extends keyof T>(key: K, currentError?: Error): SafeExtract<T[K]> {

        const extracted: Unsafe<T[K]> = (this as any)._object[key];

        if (isSomething<T[K]>(extracted)) {
            return createExtract(extracted, this._error);
        }

        throw currentError || this._error;
    }

    public safe<K extends keyof T>(key: K, currentError?: Error): SafeExtract<T[K]> {

        const extracted: Unsafe<T[K]> = (this as any)._object[key];

        if (isExist<T[K]>(extracted)) {
            return createExtract(extracted, this._error);
        }

        throw currentError || this._error;
    }

    public unsafe<K extends keyof T>(key: K): SafeExtract<T[K]> | null {

        const extracted: Unsafe<T[K]> | undefined = (this as any)._object[key];

        if (isExist<T[K]>(extracted)) {
            return createExtract(extracted, this._error);
        }

        return null;
    }

    public unsafeValue<K extends keyof T>(key: K): T[K] | null {

        const extracted: Unsafe<T[K]> | undefined = (this as any)._object[key];

        if (extracted) {
            return extracted as T[K];
        }

        return null;
    }
}
