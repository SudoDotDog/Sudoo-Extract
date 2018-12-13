/**
 * @author WMXPY
 * @namespace Extract
 * @description Check
 */

import { isNull, isUndefined } from "util";

export const isExist = <T>(object: T | undefined | null): object is T => {

    return !(isUndefined(object) || isNull(object));
};
