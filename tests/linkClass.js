/* eslint-disable max-nested-callbacks, react/prefer-stateless-function, class-methods-use-this */

import {
    expect
} from 'chai';
import React from 'react';
import TestUtils from 'react-addons-test-utils';
import jsdom from 'jsdom';
import linkClass from './../src/linkClass';

describe('linkClass', () => {
  context('ReactElement does not define styleName', () => {
    it('does not affect element properties', () => {
      expect(linkClass(<div />)).to.deep.equal(<div />);
    });

    it('does not affect element properties with a single element child', () => {
      expect(linkClass(<div><p /></div>)).to.deep.equal(<div><p /></div>);
    });

    it('does not affect element properties with a single element child in non-`children` prop', () => {
      expect(linkClass(<div el={<p />} />)).to.deep.equal(<div el={<p />} />);
    });

    it('does not affect element properties with a single text child', () => {
      expect(linkClass(<div>test</div>)).to.deep.equal(<div>test</div>);
    });

    it('does not affect the className', () => {
      expect(linkClass(<div className='foo' />)).to.deep.equal(<div className='foo' />);
    });

    xit('does not affect element with a single children when that children is contained in an array', () => {
      const subject = React.createElement('div', null, [
        React.createElement('p')
      ]);
      const outcome = React.createElement('div', null, [
        React.createElement('p')
      ]);

      expect(linkClass(subject)).to.deep.equal(outcome);
    });

    xit('does not affect element with multiple children', () => {
      // Using array instead of object causes the following error:
      // Warning: Each child in an array or iterator should have a unique "key" prop.
      // Check the render method of _class. See https://fb.me/react-warning-keys for more information.
      // @see https://github.com/facebook/react/issues/4723#issuecomment-135555277
      // expect(linkClass(<div><p></p><p></p></div>)).to.deep.equal(<div><p></p><p></p></div>);

      const subject = React.createElement('div', null, [
        React.createElement('p'),
        React.createElement('p')
      ]);
      const outcome = React.createElement('div', null, [
        React.createElement('p'),
        React.createElement('p')
      ]);

      expect(linkClass(subject)).to.deep.equal(outcome);
    });
  });

  context('called with null instead of ReactElement', () => {
    it('returns null', () => {
      const subject = linkClass(null);

      expect(subject).to.equal(null);
    });
  });

  context('styleName matches an existing CSS module', () => {
    context('when a descendant element has styleName', () => {
      it('assigns a generated className', () => {
        let subject;

        subject = <div>
          <p styleName='foo' />
        </div>;

        subject = linkClass(subject, {
          foo: 'foo-1'
        });

        expect(subject.props.children.props.className).to.equal('foo-1');
      });
    });
    context('when a descendant element in non-`children` prop has styleName', () => {
      it('assigns a generated className', () => {
        let subject;

        subject = <div
          el={<p styleName='foo' />}
          els={[<p key='bar' styleName='bar' />, [<p key='baz' styleName='baz' />]]}
        />;

        subject = linkClass(subject, {
          bar: 'bar-1',
          baz: 'baz-1',
          foo: 'foo-1'
        });

        expect(subject.props.el.props.className).to.equal('foo-1');
        expect(subject.props.els[0].props.className).to.equal('bar-1');
        expect(subject.props.els[1][0].props.className).to.equal('baz-1');
      });
    });
    context('when multiple descendant elements have styleName', () => {
      it('assigns a generated className', () => {
        let subject;

        subject = <div>
          <p styleName='foo' />
          <p styleName='bar' />
        </div>;

        subject = linkClass(subject, {
          bar: 'bar-1',
          foo: 'foo-1'
        });

        expect(subject.props.children[0].props.className).to.equal('foo-1');
        expect(subject.props.children[1].props.className).to.equal('bar-1');
      });
      it('styleName is deleted from props', () => {
        let subject;

        subject = <div>
          <p styleName='foo' />
          <p styleName='bar' />
        </div>;

        subject = linkClass(subject, {
          bar: 'bar-1',
          foo: 'foo-1'
        });

        expect(subject.props.children[0].props).not.to.have.property('styleName');
        expect(subject.props.children[1].props).not.to.have.property('styleName');
      });
    });
    context('when multiple descendants have styleName and are iterable', () => {
      it('assigns a generated className', () => {
        let subject;

        const iterable = {
          0: <p key='1' styleName='foo' />,
          1: <p key='2' styleName='bar' />,
          length: 2,

          // eslint-disable-next-line no-use-extend-native/no-use-extend-native
          [Symbol.iterator]: Array.prototype[Symbol.iterator]
        };

        subject = <div>{iterable}</div>;

        subject = linkClass(subject, {
          bar: 'bar-1',
          foo: 'foo-1'
        });

        expect(subject.props.children[0].props.className).to.equal('foo-1');
        expect(subject.props.children[1].props.className).to.equal('bar-1');
      });
    });
    context('when non-`children` prop is an iterable', () => {
      it('it is left untouched', () => {
        let subject;

        const iterable = {
          0: <p key='1' styleName='foo' />,
          1: <p key='2' styleName='bar' />,
          length: 2,

          // eslint-disable-next-line no-use-extend-native/no-use-extend-native
          [Symbol.iterator]: Array.prototype[Symbol.iterator]
        };

        subject = <div els={iterable} />;

        subject = linkClass(subject, {
          bar: 'bar-1',
          foo: 'foo-1'
        });

        expect(subject.props.els[0].props.styleName).to.equal('foo');
        expect(subject.props.els[1].props.styleName).to.equal('bar');
        expect(subject.props.els[0].props).not.to.have.property('className');
        expect(subject.props.els[1].props).not.to.have.property('className');
      });
    });
    context('when ReactElement does not have an existing className', () => {
      it('uses the generated class name to set the className property', () => {
        let subject;

        subject = <div styleName='foo' />;

        subject = linkClass(subject, {
          foo: 'foo-1'
        });

        expect(subject.props.className).to.deep.equal('foo-1');
      });
    });
    context('when ReactElement has an existing className', () => {
      it('appends the generated class name to the className property', () => {
        let subject;

        subject = <div className='foo' styleName='bar' />;

        subject = linkClass(subject, {
          bar: 'bar-1'
        });

        expect(subject.props.className).to.deep.equal('foo bar-1');
      });
    });
  });

  context('styleName includes multiple whitespace characters', () => {
    it('resolves CSS modules', () => {
      let subject;

      subject = <div>
        <p styleName=' foo   bar ' />
      </div>;

      subject = linkClass(subject, {
        bar: 'bar-1',
        foo: 'foo-1'
      }, {
        allowMultiple: true
      });

      expect(subject.props.children.props.className).to.equal('foo-1 bar-1');
    });
  });

  describe('options.allowMultiple', () => {
    context('when multiple module names are used', () => {
      context('when false', () => {
        it('throws an error', () => {
          expect(() => {
            linkClass(<div styleName='foo bar' />, {}, {allowMultiple: false});
          }).to.throw(Error, 'ReactElement styleName property defines multiple module names ("foo bar").');
        });
      });
      context('when true', () => {
        it('appends a generated class name for every referenced CSS module', () => {
          let subject;

          subject = <div styleName='foo bar' />;

          subject = linkClass(subject, {
            bar: 'bar-1',
            foo: 'foo-1'
          }, {
            allowMultiple: true
          });

          expect(subject.props.className).to.deep.equal('foo-1 bar-1');
        });
      });
    });
  });

  describe('options.errorWhenNotFound', () => {
    context('when styleName does not match an existing CSS module', () => {
      context('when false', () => {
        it('ignores the missing CSS module', () => {
          let subject;

          subject = <div styleName='foo' />;

          subject = linkClass(subject, {}, {errorWhenNotFound: false});

          expect(subject.props.className).to.be.an('undefined');
        });
      });
      context('when is true', () => {
        it('throws an error', () => {
          expect(() => {
            linkClass(<div styleName='foo' />, {}, {errorWhenNotFound: true});
          }).to.throw(Error, '"foo" CSS module is undefined.');
        });
      });
    });
  });

  context('when ReactElement includes ReactComponent', () => {
    let Foo;
    let nodeList;

    beforeEach(() => {
      global.document = jsdom.jsdom('<!DOCTYPE html><html><head></head><body></body></html>');
      global.window = document.defaultView;

      Foo = class extends React.Component {
        render () {
          return <div styleName='foo'>Hello</div>;
        }
      };

      nodeList = TestUtils.renderIntoDocument(linkClass(<div styleName='foo'><Foo /></div>, {foo: 'foo-1'}));
    });
    it('processes ReactElement nodes', () => {
      expect(nodeList.className).to.equal('foo-1');
    });
    it('does not process ReactComponent nodes', () => {
      expect(nodeList.firstChild.className).to.equal('');
    });
  });

  it('deletes styleName property from the target element', () => {
    let subject;

    subject = <div styleName='foo' />;

    subject = linkClass(subject, {
      foo: 'foo-1'
    });

    expect(subject.props.className).to.deep.equal('foo-1');
    expect(subject.props).not.to.have.property('styleName');
  });

  it('deletes styleName property from the target element (deep)', () => {
    let subject;

    subject = <div
      el={<span styleName='baz' />}
      els={[<span key='foo' styleName='foo' />, [<span key='bar' styleName='bar' />]]}
      styleName='foo'
    >
      <div styleName='bar' />
      <div styleName='bar' />
    </div>;

    subject = linkClass(subject, {
      bar: 'bar-1',
      baz: 'baz-1',
      foo: 'foo-1'
    });

    expect(subject.props.children[0].props.className).to.deep.equal('bar-1');
    expect(subject.props.children[0].props).not.to.have.property('styleName');
    expect(subject.props.el.props.className).to.deep.equal('baz-1');
    expect(subject.props.el.props).not.to.have.property('styleName');
    expect(subject.props.els[0].props.className).to.deep.equal('foo-1');
    expect(subject.props.els[0].props).not.to.have.property('styleName');
    expect(subject.props.els[1][0].props.className).to.deep.equal('bar-1');
    expect(subject.props.els[1][0].props).not.to.have.property('styleName');
  });
});
