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
            it('defaults to true', () => {
                expect(options.allowMultiple).to.equal(true);
            });
        });
        describe('includeOriginal property', () => {
            it('defaults to true', () => {
                expect(options.includeOriginal).to.equal(true);
            });
        });

        describe('errorNotFound property', () => {
            it('defaults to true', () => {
                expect(options.errorNotFound).to.equal(false);
            });
        });

        describe('useModuleName property', () => {
            it('defaults to true', () => {
                expect(options.useModuleName).to.equal(false);
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
    describe('when property value is not boolean', () => {
        it('throws an error', () => {
            expect(() => {
                makeConfig({
                    useModuleName: 1
                });
            }).to.throw(Error, '"useModuleName" property value must be a boolean.');
        });
    });
});
