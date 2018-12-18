/**
 * @author WMXPY
 * @namespace Extract
 * @description Value
 */

import { isExist } from "./check";

export class SafeValue<T> {

    private _value: T | null | undefined;
    private _error: Error;

    public constructor(value: T | null | undefined, error: Error) {

        this._value = value;
        this._error = error;
    }

    public safe(): T {

        if (isExist<T>(this._value)) {

            return this._value;
        }

        throw this._error;
    }

    public unsafe(): T | null | undefined {

        return this._value;
    }
}

