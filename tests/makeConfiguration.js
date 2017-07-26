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
    describe('handleNotFoundStyleName property', () => {
      it('defaults to "throw"', () => {
        expect(configuration.handleNotFoundStyleName).to.equal('throw');
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
    const userConfiguration = {};

    makeConfiguration(userConfiguration);

    expect(userConfiguration).to.deep.equal({});
  });
});
