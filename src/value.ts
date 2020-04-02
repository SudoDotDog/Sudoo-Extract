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

    public safe(currentError?: Error): T {

        if (isExist<T>(this._value)) {

            return this._value;
        }

        throw currentError || this._error;
    }

    public unsafe(): Unsafe<T> {

        return this._value;
    }
}

