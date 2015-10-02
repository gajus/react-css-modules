/* eslint-disable max-nested-callbacks */

import {
    expect
} from 'chai';

import wrapStatelessFunction from './../src/wrapStatelessFunction';

describe('wrapStatelessFunction', () => {
    context('using default styles', () => {
        it('exposes styles through styles property', (done) => {
            let styles;

            styles = {
                foo: 'foo-1'
            };

            wrapStatelessFunction((props) => {
                expect(props.styles).to.equal(styles);
                done();
            }, styles)();
        });
        it('does not affect the other instance properties', (done) => {
            let styles;

            styles = {
                foo: 'foo-1'
            };

            wrapStatelessFunction((props) => {
                expect(props.bar).to.equal('baz');
                done();
            }, styles)({
                bar: 'baz'
            });
        });
    });
    context('using explicit styles', () => {
        it('exposes styles through styles property', (done) => {
            let styles;

            styles = {
                foo: 'foo-1'
            };

            wrapStatelessFunction((props) => {
                expect(props.styles).to.equal(styles);
                done();
            })({
                styles
            });
        });
    });
});
