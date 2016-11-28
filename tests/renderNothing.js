import {
    expect
} from 'chai';
import renderNothing from '../src/renderNothing';

describe('renderNothing', () => {
  context('renderNothing should return different node types for various React versions', () => {
    it('should return noscript tag for React v14 or lower', () => {
      expect(renderNothing('14.0.0').type).to.equal('noscript');
    });

    it('should return null for React v15 or higher', () => {
      expect(renderNothing('15.0.0')).to.equal(null);
    });
  });
});
