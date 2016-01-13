/* eslint-disable max-nested-callbacks */

import {
    expect
} from 'chai';

import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import jsdom from 'jsdom';
import extendReactClass from './../src/extendReactClass';

describe('extendReactClass', () => {
    beforeEach(() => {
        global.document = jsdom.jsdom('<!DOCTYPE html><html><head></head><body></body></html>');

        global.window = document.defaultView;
    });
    context('using default styles', () => {
        it('exposes styles through this.props.styles property', (done) => {
            let Component,
                styles;

            Component = class extends React.Component {
                render () {
                    expect(this.props.styles).to.equal(styles);
                    done();
                }
            };

            styles = {
                foo: 'foo-1'
            };

            Component = extendReactClass(Component, styles);

            TestUtils.renderIntoDocument(<Component />);
        });
        it('does not affect the other instance properties', (done) => {
            let Component,
                styles;

            Component = class extends React.Component {
                render () {
                    expect(this.props.bar).to.equal('baz');
                    done();
                }
            };

            styles = {
                foo: 'foo-1'
            };

            Component = extendReactClass(Component, styles);

            TestUtils.renderIntoDocument(<Component bar='baz' />);
        });
    });
    context('overwriting default styles using "styles" property of the extended component', () => {
        it('overwrites default styles', (done) => {
            let Component,
                styles;

            Component = class extends React.Component {
                render () {
                    expect(this.props.styles).to.equal(styles);
                    done();
                }
            };

            styles = {
                foo: 'foo-1'
            };

            Component = extendReactClass(Component, {
                bar: 'bar-0',
                foo: 'foo-0'
            });

            TestUtils.renderIntoDocument(<Component styles={styles} />);
        });
    });
    context('rendering Component that returns null', () => {
        it('generates <noscript> element', () => {
            let Component,
                component,
                shallowRenderer;

            shallowRenderer = TestUtils.createRenderer();

            Component = class extends React.Component {
                render () {
                    return null;
                }
            };

            Component = extendReactClass(Component);

            shallowRenderer.render(<Component />);

            component = shallowRenderer.getRenderOutput();

            expect(component.type).to.equal('noscript');
        });
    });
});
