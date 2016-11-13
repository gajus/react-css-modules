/* eslint-disable max-nested-callbacks */

import {
    expect
} from 'chai';
import React from 'react';
import TestUtils from 'react-addons-test-utils';
import wrapStatelessFunction from './../src/wrapStatelessFunction';

describe('wrapStatelessFunction', () => {
  it('hoists static own properties from the input component to the wrapped component', () => {
    const styles = {
      foo: 'foo-1'
    };

    const InnerComponent = () => {
      return null;
    };

    InnerComponent.propTypes = {};
    InnerComponent.defaultProps = {};

    const WrappedComponent = wrapStatelessFunction(InnerComponent, styles);

    expect(WrappedComponent.propTypes).to.equal(InnerComponent.propTypes);
    expect(WrappedComponent.defaultProps).to.equal(InnerComponent.defaultProps);
    expect(WrappedComponent.name).not.to.equal(InnerComponent.name);
  });
  context('using default styles', () => {
    it('exposes styles through styles property', (done) => {
      const styles = {
        foo: 'foo-1'
      };

      wrapStatelessFunction((props) => {
        expect(props.styles).to.equal(styles);
        done();
      }, styles)();
    });
    it('exposes non-enumerable styles property', (done) => {
      const styles = {
        foo: 'foo-1'
      };

      wrapStatelessFunction((props) => {
        expect(props.propertyIsEnumerable('styles')).to.equal(false);
        done();
      }, styles)();
    });
    it('does not affect the other instance properties', (done) => {
      const styles = {
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
      const styles = {
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
  context('rendering Component that returns null', () => {
    it('generates <noscript> element', () => {
      const shallowRenderer = TestUtils.createRenderer();

      const Component = wrapStatelessFunction(() => {
        return null;
      });

      shallowRenderer.render(<Component />);

      const component = shallowRenderer.getRenderOutput();

      expect(component.type).to.equal('noscript');
    });
  });
});
