/* eslint-disable max-nested-callbacks */

import {
    expect
} from 'chai';

import React from 'react';
import TestUtils from 'react-addons-test-utils';
import jsdom from 'jsdom';
import extendReactClass from './../src/extendReactClass';

describe('extendReactClass', () => {
    beforeEach(() => {
        global.document = jsdom.jsdom(`
            <!DOCTYPE html>
            <html>
            <head>
            </head>
            <body>
            </body>
            </html>
        `);

        global.window = document.defaultView;
    });

    context('using default styles', () => {
        it('exposes styles through styles property', (done) => {
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

    context('using explicit styles', () => {
        it('exposes styles through styles property', (done) => {
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

            Component = extendReactClass(Component);

            TestUtils.renderIntoDocument(<Component styles={styles} />);
        });
    });
});
