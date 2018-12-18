/**
 * @author WMXPY
 * @namespace Extract
 * @description Check
 */

import { isNull, isUndefined } from "util";
import { Unsafe } from "./declare";

export const isExist = <T>(object: Unsafe<T>): object is T => {

    return !(isUndefined(object) || isNull(object));
};
