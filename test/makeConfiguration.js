/* eslint-disable max-nested-callbacks */

import {
    expect
} from 'chai';

import makeConfiguration from './../src/makeConfiguration';

describe('makeConfiguration', () => {
    describe('when using default configuration', () => {
        let configuration;

        beforeEach(() => {
            configuration = makeConfiguration();
        });
        describe('allowMultiple property', () => {
            it('defaults to false', () => {
                expect(configuration.allowMultiple).to.equal(false);
            });
        });
        describe('errorWhenNotFound property', () => {
            it('defaults to true', () => {
                expect(configuration.errorWhenNotFound).to.equal(true);
            });
        });
    });
    describe('when unknown property is provided', () => {
        it('throws an error', () => {
            expect(() => {
                makeConfiguration({
                    unknownProperty: true
                });
            }).to.throw(Error, 'Unknown configuration property "unknownProperty".');
        });
    });
    it('does not mutate user configuration', () => {
        let userConfiguration;

        userConfiguration = {};

        makeConfiguration(userConfiguration);

        expect(userConfiguration).to.deep.equal({});
    });
});
