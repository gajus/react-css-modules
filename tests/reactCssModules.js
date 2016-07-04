/* eslint-disable max-nested-callbacks, react/no-multi-comp, react/prop-types, react/prefer-stateless-function */

import {
    expect
} from 'chai';

import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import jsdom from 'jsdom';
import reactCssModules from './../src/index';

const styleProperty = 'data-style';

describe('reactCssModules', () => {
    context('a ReactComponent is decorated using react-css-modules', () => {
        it('inherits displayName', () => {
            let Foo;

            Foo = class extends React.Component {};

            // @todo https://phabricator.babeljs.io/T2779
            Foo.displayName = 'Bar';

            Foo = reactCssModules(Foo);

            expect(Foo.displayName).to.equal('Bar');
        });
        context('target component does not name displayName', () => {
            it('uses name for displayName', () => {
                let Foo;

                Foo = class Bar extends React.Component {};

                Foo = reactCssModules(Foo);

                expect(Foo.displayName).to.equal('Bar');
            });
        });
    });
    context('a ReactComponent renders an element with the style property', () => {
        context('the component is a class that extends React.Component', () => {
            it('that element should contain the equivalent className', () => {
                let Foo;

                const shallowRenderer = TestUtils.createRenderer();

                Foo = class extends React.Component {
                    render () {
                        return <div {...{[styleProperty]: 'foo'}}>Hello</div>;
                    }
                };

                Foo = reactCssModules(Foo, {
                    foo: 'foo-1'
                });

                shallowRenderer.render(<Foo />);

                const component = shallowRenderer.getRenderOutput();

                expect(component.props.className).to.equal('foo-1');
            });
        });
        context('the component is a stateless function component', () => {
            it('that element should contain the equivalent className', () => {
                let Foo;

                const shallowRenderer = TestUtils.createRenderer();

                Foo = () => {
                    return <div {...{[styleProperty]: 'foo'}}>Hello</div>;
                };

                Foo = reactCssModules(Foo, {
                    foo: 'foo-1'
                });

                shallowRenderer.render(<Foo />);

                const component = shallowRenderer.getRenderOutput();

                expect(component.props.className).to.equal('foo-1');
            });
        });
    });
    context('a ReactComponent renders nothing', () => {
        context('the component is a class that extends React.Component', () => {
            it('linkClass must not intervene', () => {
                let Foo;

                const shallowRenderer = TestUtils.createRenderer();

                Foo = class extends React.Component {
                    render () {
                        return null;
                    }
                };

                Foo = reactCssModules(Foo, {
                    foo: 'foo-1'
                });

                shallowRenderer.render(<Foo />);

                const component = shallowRenderer.getRenderOutput();

                expect(typeof component).to.equal('object');
            });
        });
        context('the component is a stateless function component', () => {
            it('that element should contain the equivalent className', () => {
                let Foo;

                const shallowRenderer = TestUtils.createRenderer();

                Foo = () => {
                    return null;
                };

                Foo = reactCssModules(Foo, {
                    foo: 'foo-1'
                });

                shallowRenderer.render(<Foo />);

                const component = shallowRenderer.getRenderOutput();

                expect(typeof component).to.equal('object');
            });
        });
    });
    context('rendering element', () => {
        beforeEach(() => {
            global.document = jsdom.jsdom('<!DOCTYPE html><html><head></head><body></body></html>');

            global.window = document.defaultView;
        });
        context('parent component is using react-css-modules and interpolates props.children', () => {
            // @see https://github.com/gajus/react-css-modules/issues/76
            it('unsets the style property', () => {
                let Bar,
                    Foo,
                    subject;

                Foo = class extends React.Component {
                    render () {
                        return <Bar>
                            <div {...{[styleProperty]: 'test'}}>foo</div>
                        </Bar>;
                    }
                };

                Foo = reactCssModules(Foo, {
                    test: 'foo-0'
                });

                Bar = class extends React.Component {
                    render () {
                        return <div>{this.props.children}</div>;
                    }
                };

                Bar = reactCssModules(Bar, {
                    test: 'bar-0'
                });

                subject = TestUtils.renderIntoDocument(<Foo />);

                subject = ReactDOM.findDOMNode(subject);

                expect(subject.firstChild.className).to.equal('foo-0');
            });
        });
    });
});
