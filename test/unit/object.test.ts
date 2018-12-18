/**
 * @author WMXPY
 * @namespace Extract
 * @description Object
 * @package Unit Test
 */

import { expect } from 'chai';
import * as Chance from 'chance';
import { SafeExtract } from '../../src';
import { Unsafe } from '../../src/declare';
import { SafeObject } from '../../src/object';

describe('Given {SafeObject} Class', (): void => {

    const chance: Chance.Chance = new Chance('extract-object');

    it('should be able to create a instance', (): void => {

        const instance: SafeExtract<{
            a: string;
        }> = new SafeObject({
            a: chance.string(),
        }, new Error(chance.string()));

        expect(instance).to.be.instanceOf(SafeObject);
    });

    it('should be able to get safe instance', (): void => {

        const value: string = chance.string();
        const instance: SafeExtract<{
            a: string;
        }> = new SafeObject({
            a: value,
        }, new Error(chance.string()));

        const actual: Unsafe<string> = instance.safe('a').value;
        expect(actual).to.be.equal(value);
    });

    it('should be able to get direct safe value', (): void => {

        const value: string = chance.string();
        const instance: SafeExtract<{
            a: string;
        }> = new SafeObject({
            a: value,
        }, new Error(chance.string()));

        const actual: string = instance.direct('a');
        expect(actual).to.be.equal(value);
    });

    it('should handle empty value', (): void => {

        const instance: SafeExtract<{
            a: string;
        }> = new SafeObject({
            a: '',
        }, new Error(chance.string()));

        const actual: string = instance.safe('a').safe();
        expect(actual).to.be.equal('');
    });

    it('should be able to custom error', (): void => {

        const errorMessage: string = chance.string();
        const instance: SafeExtract<{
            a: string;
        }> = new SafeObject<{
            a: string;
        }>({}, new Error(errorMessage));

        const expr = () => instance.safe('a').safe();
        expect(expr).to.be.throw(errorMessage);
    });

    it('should be able to get unsafe value', (): void => {

        const value: string = chance.string();
        const instance: SafeExtract<{
            a: string;
        }> = new SafeObject({
            a: value,
        }, new Error(chance.string()));

        const actual: SafeExtract<string> = instance.unsafe('a') as SafeExtract<string>;
        expect(actual.value).to.be.equal(value);
    });

    it('should be able to get null when unsafe value not exist', (): void => {

        const instance: SafeExtract<{
            a: string;
        }> = new SafeObject<{
            a: string;
        }>({}, new Error(chance.string()));

        const actual: SafeExtract<string> | null = instance.unsafe('a');
        // tslint:disable-next-line
        expect(actual).to.be.null;
    });
});
