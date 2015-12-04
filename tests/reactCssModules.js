/* eslint-disable max-nested-callbacks, react/no-multi-comp */

import {
    expect
} from 'chai';

import React from 'react';
import TestUtils from 'react-addons-test-utils';
import reactCssModules from './../src/index';

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
    context('a ReactComponent renders an element with the styleName prop', () => {
        context('the component is a class that extends React.Component', () => {
            it('that element should contain the equivalent className', () => {
                let Foo,
                    component,
                    shallowRenderer;

                shallowRenderer = TestUtils.createRenderer();

                Foo = class extends React.Component {
                    render () {
                        return <div styleName='foo'>Hello</div>;
                    }
                };

                Foo = reactCssModules(Foo, {
                    foo: 'foo-1'
                });

                shallowRenderer.render(<Foo />);

                component = shallowRenderer.getRenderOutput();

                expect(component.props.className).to.equal('foo-1');
            });
        });
        context('the component is a stateless function component', () => {
            it('that element should contain the equivalent className', () => {
                let Foo,
                    component,
                    shallowRenderer;

                shallowRenderer = TestUtils.createRenderer();

                Foo = () => {
                    return <div styleName='foo'>Hello</div>;
                };

                Foo = reactCssModules(Foo, {
                    foo: 'foo-1'
                });

                shallowRenderer.render(<Foo />);

                component = shallowRenderer.getRenderOutput();

                expect(component.props.className).to.equal('foo-1');
            });
        });
    });

    context('a ReactComponent renders nothing', () => {
        context('the component is a class that extends React.Component', () => {
            it('linkClass must not intervene', () => {
                let Foo,
                    component,
                    shallowRenderer;

                shallowRenderer = TestUtils.createRenderer();

                Foo = class extends React.Component {
                    render () {
                        return null;
                    }
                };

                Foo = reactCssModules(Foo, {
                    foo: 'foo-1'
                });

                shallowRenderer.render(<Foo />);

                component = shallowRenderer.getRenderOutput();

                expect(typeof component).to.equal('object');
            });
        });
        context('the component is a stateless function component', () => {
            it('that element should contain the equivalent className', () => {
                let Foo,
                    component,
                    shallowRenderer;

                shallowRenderer = TestUtils.createRenderer();

                Foo = () => {
                    return null;
                };

                Foo = reactCssModules(Foo, {
                    foo: 'foo-1'
                });

                shallowRenderer.render(<Foo />);

                component = shallowRenderer.getRenderOutput();

                expect(typeof component).to.equal('object');
            });
        });
    });
});
