/**
 * @author WMXPY
 * @namespace Extract
 * @description Index
 * @package Unit Test
 */

import { expect } from 'chai';
import * as Chance from 'chance';
import { SafeExtract } from '../../src/extract';
import { Safe } from '../../src/index';
import { SafeObject } from '../../src/object';
import { SafeValue } from '../../src/value';

describe('Given {Safe} static class', (): void => {

    const chance: Chance.Chance = new Chance('extract-extract');

    it('should be able to create a safeObject', (): void => {

        const instance = Safe.extract<{
            a: string;
        }>({});

        expect(instance).to.be.instanceOf(SafeObject);
    });

    it('should be able to create a safeValue', (): void => {

        const value: string = chance.string();
        const instance: SafeExtract<string> = Safe.extract(value);

        expect(instance).to.be.instanceOf(SafeValue);
    });

    it('should be able to get a safeObject from a safeObject', (): void => {

        const instance: SafeExtract<{
            a: {
                b: string;
            };
        }> = Safe.extract({
            a: {
                b: chance.string(),
            },
        });

        expect(instance.safe('a')).to.be.instanceOf(SafeObject);
    });

    it('should be able to get a safeValue from a safeObject', (): void => {

        const instance: SafeExtract<{
            a: string;
        }> = Safe.extract({
            a: chance.string(),
        });

        expect(instance.safe('a')).to.be.instanceOf(SafeValue);
    });

    it('should be able to throw default error message', (): void => {

        const instance: SafeExtract<{
            a: string;
        }> = Safe.extract<{
            a: string;
        }>({});

        const expr = () => instance.safe('a');
        expect(expr).to.be.throw('[Sudoo-Extract] Extract failed');
    });

    it('should be able to throw target error message', (): void => {

        const message: string = chance.string();
        const instance: SafeExtract<{
            a: string;
        }> = Safe.extract<{
            a: string;
        }>({}, new Error(message));

        const expr = () => instance.safe('a');
        expect(expr).to.be.throw(message);
    });

    it('should be able to create safe object directly', (): void => {

        const message: string = chance.string();
        const object: SafeObject<string> = Safe.object(message);

        expect(object).to.be.instanceOf(SafeObject);
        expect(object.value).to.be.equal(message);
    });

    it('should be able to create safe value directly', (): void => {

        const message: string = chance.string(); 
        const value: SafeValue<string> = Safe.value(message);

        expect(value).to.be.instanceOf(SafeValue);
        expect(value.value).to.be.equal(message);
    });
});
