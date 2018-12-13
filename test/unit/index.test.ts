/**
 * @author WMXPY
 * @namespace Extract
 * @description Index
 * @package Unit Test
 */

import { expect } from 'chai';
import * as Chance from 'chance';
import { SafeExtract } from '../../src';

describe('Given {SafeExtract} Class', (): void => {

    const chance: Chance.Chance = new Chance('extract-safeExtract');

    it('should be able to create a instance', (): void => {

        const instance: SafeExtract<{
            a: string;
        }> = SafeExtract.create({});

        expect(instance).to.be.instanceOf(SafeExtract);
    });

    it('should be able to get value', (): void => {

        const value: string = chance.string();
        const instance: SafeExtract = SafeExtract.create(value);

        expect(instance.value).to.be.equal(value);
    });

    it('should be able to get safe instance', (): void => {

        const value: string = chance.string();
        const instance: SafeExtract<{
            a: string;
        }> = SafeExtract.create({
            a: value,
        });

        const actual: string = instance.safe('a').value;
        expect(actual).to.be.equal(value);
    });
});
