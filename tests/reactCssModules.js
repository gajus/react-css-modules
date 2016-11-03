/* eslint-disable max-nested-callbacks, react/no-multi-comp, react/prop-types, react/prefer-stateless-function, class-methods-use-this */

import {
    expect
} from 'chai';
import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import jsdom from 'jsdom';
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
      let Foo,
        component;

      beforeEach(() => {
        const shallowRenderer = TestUtils.createRenderer();

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
      });
      it('that element should contain the equivalent className', () => {
        expect(component.props.className).to.equal('foo-1');
      });
      it('the styleName prop should be "consumed" in the process', () => {
        expect(component.props).not.to.have.property('styleName');
      });
    });
    context('the component is a stateless function component', () => {
      let Foo,
        component;

      beforeEach(() => {
        const shallowRenderer = TestUtils.createRenderer();

        Foo = () => {
          return <div styleName='foo'>Hello</div>;
        };

        Foo = reactCssModules(Foo, {
          foo: 'foo-1'
        });

        shallowRenderer.render(<Foo />);

        component = shallowRenderer.getRenderOutput();
      });
      it('that element should contain the equivalent className', () => {
        expect(component.props.className).to.equal('foo-1');
      });
      it('the styleName prop should be "consumed" in the process', () => {
        expect(component.props).not.to.have.property('styleName');
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
    beforeEach(() => { // eslint-disable-line mocha/no-hooks-for-single-case
      global.document = jsdom.jsdom('<!DOCTYPE html><html><head></head><body></body></html>');

      global.window = document.defaultView;
    });
    context('parent component is using react-css-modules and interpolates props.children', () => {
      // @see https://github.com/gajus/react-css-modules/issues/76
      it('unsets the styleName property', () => {
        let Bar,
          Foo,
          subject;

        Foo = class extends React.Component {
          render () {
            return <Bar>
              <div styleName='test'>foo</div>
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

        // eslint-disable-next-line react/no-find-dom-node
        subject = ReactDOM.findDOMNode(subject);

        expect(subject.firstChild.className).to.equal('foo-0');
      });
    });
  });
});
