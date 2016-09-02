import {
    expect
} from 'chai';
import {SimpleMap} from './../src/simple-map';

const getTests = (map) => {
    return () => {
        const values = [
            [1, 'something'],
            ['1', 'somethingElse'],
            [{}, []],
            [null, null]
        ];

        it('should set', () => {
            values.forEach(([key, value]) => {
                map.set(key, value);
            });
            expect(map.size).to.equal(values.length);
        });

        it('should get', () => {
            values.forEach(([key, value]) => {
                expect(map.get(key)).to.equal(value);
            });
        });
    };
};

describe('SimpleMap', () => {
    context('simple map with primitive or object as keys', getTests(new SimpleMap()));
    if (typeof Map !== 'undefined') {
        context('sanity - running tests against native Map', getTests(new Map()));
    }
});
