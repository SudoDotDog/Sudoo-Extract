/**
 * @author WMXPY
 * @namespace Extract
 * @description Check
 */

import { Unsafe } from "./declare";

export const isExist = <T>(object: Unsafe<T>): object is T => {

    return !(object === undefined || object === null);
};

export const isSomething = <T>(object: Unsafe<T>): object is T => {

    return Boolean(object);
};
