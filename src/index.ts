/**
 * @author WMXPY
 * @namespace Extract
 * @description Index
 */

import { Unsafe } from "./declare";
import { createExtract, SafeExtract } from "./extract";
import { SafeObject } from "./object";
import { SafeValue } from "./value";

export class Safe {

    public static extract<T>(value: Unsafe<T>, error: Error = this._defaultError()): SafeExtract<T> {

        return createExtract(value, error);
    }

    public static object<T>(value: Unsafe<T>, error: Error = this._defaultError()): SafeObject<T> {

        return new SafeObject<T>(value, error);
    }

    public static value<T>(value: Unsafe<T>, error: Error = this._defaultError()): SafeValue<T> {

        return new SafeValue<T>(value, error);
    }

    private static _defaultError(): Error {

        return new Error('[Sudoo-Extract] Extract failed');
    }
}

export { SafeExtract, SafeObject, SafeValue, Unsafe };

