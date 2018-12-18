/**
 * @author WMXPY
 * @namespace Extract
 * @description Index
 */

import { isBoolean, isNumber, isString } from "util";
import { Basics, Unsafe } from "./declare";
import { SafeObject } from "./object";
import { SafeValue } from "./value";

export type SafeExtract<T> =
    T extends Basics
    ? SafeValue<T>
    : SafeObject<T>;

export const SafeExtract = <T>(value: Unsafe<T>, error: Error = new Error('[Sudoo-Extract] Extract failed')): SafeExtract<T> => {

    if (isString(value) || isNumber(value) || isBoolean(value)) {

        return new SafeValue<T>(value, error) as SafeExtract<T>;
    } else {

        return new SafeObject<T>(value, error) as SafeExtract<T>;
    }
};

export { Unsafe, SafeObject, SafeValue };

