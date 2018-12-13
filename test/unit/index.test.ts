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

    it('should handle empty value', (): void => {

        const instance: SafeExtract<{
            a: string;
        }> = SafeExtract.create({
            a: '',
        });

        const actual: string = instance.safe('a').value;
        expect(actual).to.be.equal('');
    });

    it('should throw an error when property is not exist', (): void => {

        const instance: SafeExtract<{
            a: string;
        }> = SafeExtract.create({});

        const expr = () => instance.safe('a').value;
        expect(expr).to.be.throw('[Sudoo-Extract] Extract failed');
    });

    it('should be able to custom error', (): void => {

        const errorMessage: string = chance.string();
        const instance: SafeExtract<{
            a: string;
        }> = SafeExtract.create<{
            a: string;
        }>({}).onError(new Error(errorMessage));

        const expr = () => instance.safe('a').value;
        expect(expr).to.be.throw(errorMessage);
    });

    it('should be able to get unsafe value', (): void => {

        const value: string = chance.string();
        const instance: SafeExtract<{
            a: string;
        }> = SafeExtract.create({
            a: value,
        });

        const actual: SafeExtract<string> = instance.unsafe('a') as SafeExtract<string>;
        expect(actual.value).to.be.equal(value);
    });

    it('should be able to get null when unsafe value not exist', (): void => {

        const instance: SafeExtract<{
            a: string;
        }> = SafeExtract.create({});

        const actual: SafeExtract<string> | null = instance.unsafe('a');
        // tslint:disable-next-line
        expect(actual).to.be.null;
    });
});
