/**
 * @author WMXPY
 * @namespace Extract
 * @description Declare
 */

import { isBoolean, isNumber, isString } from "util";
import { SafeObject } from "./object";
import { SafeValue } from "./value";

export type SafeExtract<T> =
    T extends string | number | boolean
    ? SafeValue<T> :
    SafeObject<T>;

export const SafeExtract = <T = any>(value: T, error: Error = new Error('[Sudoo-Extract] Extract failed')): SafeExtract<T> => {

    if (isString(value) || isNumber(value) || isBoolean(value)) {

        return new SafeValue<T>(value, error) as SafeExtract<T>;
    } else {

        return new SafeObject<T>(value, error) as SafeExtract<T>;
    }
};
