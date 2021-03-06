/**
 * @author WMXPY
 * @namespace Extract
 * @description Extract
 */

import { Basics, Unsafe } from "./declare";
import { SafeObject } from "./object";
import { SafeValue } from "./value";

export type SafeExtract<T = any> =
    T extends Basics
    ? SafeValue<T>
    : SafeObject<T>;

export const createExtract = <T>(value: Unsafe<T>, error: Error = new Error('[Sudoo-Extract] Extract failed')): SafeExtract<T> => {

    if (typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean') {

        return new SafeValue<T>(value, error) as SafeExtract<T>;
    } else {

        return new SafeObject<T>(value, error) as SafeExtract<T>;
    }
};
