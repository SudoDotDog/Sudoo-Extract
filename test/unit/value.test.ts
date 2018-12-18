/**
 * @author WMXPY
 * @namespace Extract
 * @description Value
 * @package Unit Test
 */

import { expect } from 'chai';
import * as Chance from 'chance';
import { SafeExtract } from '../../src';
import { SafeValue } from '../../src/value';

describe('Given {SafeValue} Class', (): void => {

    const chance: Chance.Chance = new Chance('extract-value');

    it('should be able to create a instance', (): void => {

        const instance: SafeExtract<string> = new SafeValue(chance.string(), new Error(chance.string()));

        expect(instance).to.be.instanceOf(SafeValue);
    });

    it('should be able to get safe instance', (): void => {

        const value: string = chance.string();
        const instance: SafeExtract<string> = new SafeValue(value, new Error(chance.string()));

        const actual: string = instance.safe();
        expect(actual).to.be.equal(value);
    });

    it('should handle empty value', (): void => {

        const instance: SafeExtract<string> = new SafeValue('', new Error(chance.string()));

        const actual: string = instance.safe();
        expect(actual).to.be.equal('');
    });

    it('should throw an error when value is not exist', (): void => {

        const message: string = chance.string();
        const instance: SafeExtract<string> = new SafeValue(null as any, new Error(message));

        const expr = () => instance.safe();
        expect(expr).to.be.throw(message);
    });

    it('should be able to get unsafe value', (): void => {

        const value: string = null as any;
        const instance: SafeExtract<string> = new SafeValue(null as any, new Error(chance.string()));

        const actual: string = instance.unsafe() as string;
        expect(actual).to.be.equal(value);
    });
});
