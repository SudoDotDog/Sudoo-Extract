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

    public static extract<T>(value: Unsafe<T>, error: Error = new Error('[Sudoo-Extract] Extract failed')): SafeExtract<T> {

        return createExtract(value, error);
    }
}

export { Unsafe, SafeObject, SafeValue };
