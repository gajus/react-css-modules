import {
    expect
} from 'chai';

import React from 'react';
import TestUtils from 'react-addons-test-utils';
import reactCssModules from './../src/index';

describe('reactCssModules', () => {
    context('when a ReactComponent renders properly', () => {
        it('assigns a generated className', () => {
            let Foo,
                component,
                shallowRenderer;

            shallowRenderer = TestUtils.createRenderer();

            Foo = reactCssModules(class extends React.Component {
                render () {
                    return <div styleName='foo'>Hello</div>;
                }
            }, {
                foo: 'foo-1'
            });

            shallowRenderer.render(<Foo />);

            component = shallowRenderer.getRenderOutput();

            expect(component.props.className).to.equal('foo-1');
        });
    });

    context('when a ReactComponent renders nothing', () => {
        it('assigns a generated className', () => {
            let Foo,
                component,
                shallowRenderer;

            shallowRenderer = TestUtils.createRenderer();

            Foo = reactCssModules(class extends React.Component {
                render () {
                    return null;
                }
            }, {
                foo: 'foo-1'
            });

            shallowRenderer.render(<Foo />);

            component = shallowRenderer.getRenderOutput();

            expect(typeof component).to.equal('object');
        });
    });
});
