/* eslint-disable max-nested-callbacks */

import {
    expect
} from 'chai';

import wrapStatelessFunction from './../src/wrapStatelessFunction';

describe('wrapStatelessFunction', () => {
    it('hoists static own properties from the input component to the wrapped component', () => {
        let Component, WrappedComponent, styles;

        styles = {
            foo: 'foo-1'
        };

        Component = function InnerComponent () {
            return null;
        };

        Component.propTypes = {};
        Component.defaultProps = {};

        WrappedComponent = wrapStatelessFunction(Component, styles);

        expect(WrappedComponent.propTypes).to.equal(Component.propTypes);
        expect(WrappedComponent.defaultProps).to.equal(Component.defaultProps);
        expect(WrappedComponent.name).not.to.equal(Component.name);
    });
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
