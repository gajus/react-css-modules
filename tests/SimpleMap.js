import {
  expect
} from 'chai';
import SimpleMap from './../src/SimpleMap';

describe('SimpleMap', () => {
  context('simple map with primitive or object as keys', () => {
    const values = [
      [1, 'something'],
      ['1', 'somethingElse'],
      [{}, []],
      [null, null]
    ];

    let map;

    beforeEach(() => {
      map = new SimpleMap();
    });

    it('should set', () => {
      values.forEach(([key, value]) => {
        map.set(key, value);
      });
      expect(map.size).to.equal(values.length);
    });

    it('should get', () => {
      values.forEach(([key, value]) => {
        map.set(key, value);
      });

      values.forEach(([key, value]) => {
        expect(map.get(key)).to.equal(value);
      });
    });
  });
});
