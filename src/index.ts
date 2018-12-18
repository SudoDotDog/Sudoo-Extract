/**
 * @author WMXPY
 * @namespace Extract
 * @description Index
 */

import { isBoolean, isNumber, isString } from "util";
import { isExist } from "./check";
import { SafeValue } from "./value";

export class SafeObject<T = any> {

    public static create<T>(object: Partial<T>): SafeObject<T> {

        return new SafeObject<T>(object);
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

    public onError(error: Error): SafeObject<T> {

        return new SafeObject<T>(this._object, error);
    }

    public direct<K extends keyof T>(key: K): T[K] {

        const secured: SafeObject<T[K]> = this.safe(key);
        return secured.value as T[K];
    }

    public safe<K extends keyof T>(key: K): SafeObject<T[K]> {

        const extracted: T[K] | undefined = this._object[key];

        if (isExist<T[K]>(extracted)) {
            return new SafeObject<T[K]>(extracted, this._error);
        }

        throw this._error;
    }

    public unsafe<K extends keyof T>(key: K): SafeObject<T[K]> | null {

        const extracted: T[K] | undefined = this._object[key];

        if (isExist<T[K]>(extracted)) {
            return new SafeObject<T[K]>(extracted, this._error);
        }

        return null;
    }

    private _extract<V>(value: V):
        V extends string | number | boolean
        ? SafeValue<V> :
        SafeObject<V> {

        if (isString(value) || isNumber(value) || isBoolean(value)) {

            return new SafeValue<V>(value, this._error);
        } else {

            return new SafeObject<V>(value, this._error);
        }
    }
}
