import {
    expect
} from 'chai';

import makeConfig from './../dist/makeConfig';

describe('makeConfig', () => {
    describe('when using default config', () => {
        let options;

        beforeEach(() => {
            options = makeConfig();
        });
        describe('allowMultiple property', () => {
            it('defaults to false', () => {
                expect(options.allowMultiple).to.equal(false);
            });
        });
        describe('errorWhenNotFound property', () => {
            it('defaults to true', () => {
                expect(options.errorWhenNotFound).to.equal(false);
            });
        });
    });
    describe('when unknown property is provided', () => {
        it('throws an error', () => {
            expect(() => {
                makeConfig({
                    unknownProperty: true
                });
            }).to.throw(Error, 'Unknown config property "unknownProperty".');
        });
    });
});
