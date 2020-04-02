/**
 * @author WMXPY
 * @namespace Extract
 * @description Value
 */

import { isExist, isSomething } from "./check";
import { Unsafe } from "./declare";

export class SafeValue<T> {

    public static from<T extends any>(value: Unsafe<T>, error: Error) {

        return new SafeValue(value, error);
    }

    private _value: Unsafe<T>;
    private _error: Error;

    public constructor(value: Unsafe<T>, error: Error) {

        this._value = value;
        this._error = error;
    }

    public get value(): Unsafe<T> {

        return this.unsafe();
    }

    public ensure(currentError?: Error): T {

        if (isSomething<T>(this._value)) {

            return this._value;
        }

        throw currentError || this._error;
    }

    public ensureVerify(verifyFunction: (value: T) => boolean, currentError?: Error): T {

        const ensure: T = this.ensure();
        if (!verifyFunction(ensure)) {
            throw currentError || this._error;
        }
        return ensure;
    }

    public safe(currentError?: Error): T {

        if (isExist<T>(this._value)) {

            return this._value;
        }

        throw currentError || this._error;
    }

    public safeVerify(verifyFunction: (value: T) => boolean, currentError?: Error): T {

        const safe: T = this.safe();
        if (!verifyFunction(safe)) {
            throw currentError || this._error;
        }
        return safe;
    }

    public unsafe(): Unsafe<T> {

        return this._value;
    }

    public verify(verifyFunction: (value: T | Unsafe<T>) => boolean, currentError?: Error): T | Unsafe<T> {

        const unsafe: Unsafe<T> = this.unsafe();
        if (!verifyFunction(unsafe)) {
            throw currentError || this._error;
        }
        return unsafe;
    }
}

