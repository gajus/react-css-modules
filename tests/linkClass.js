/* eslint-disable max-nested-callbacks, react/prefer-stateless-function */

import {
    expect
} from 'chai';
import React from 'react';
import TestUtils from 'react-addons-test-utils';
import jsdom from 'jsdom';
import linkClass from './../src/linkClass';

const styleProperty = 'data-style';

global.document = jsdom.jsdom('<body></body>');
global.window = document.defaultView;

describe('linkClass', () => {
    context('ReactElement does not define style property', () => {
        it('does not affect element properties', () => {
            expect(linkClass(<div></div>)).to.deep.equal(<div></div>);
        });

        it('does not affect element properties with a single element child', () => {
            expect(linkClass(<div><p></p></div>)).to.deep.equal(<div><p></p></div>);
        });

        it('does not affect element properties with a single text child', () => {
            expect(linkClass(<div>test</div>)).to.deep.equal(<div>test</div>);
        });

        it('does not affect the className', () => {
            expect(linkClass(<div className='foo'></div>)).to.deep.equal(<div className='foo'></div>);
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

    context('style property matches an existing CSS module', () => {
        context('when a descendant element has style property', () => {
            it('assigns a generated className', () => {
                let subject;

                subject = <div>
                    <p {...{[styleProperty]: 'foo'}}></p>
                </div>;

                subject = linkClass(subject, {
                    foo: 'foo-1'
                });

                expect(subject.props.children.props.className).to.equal('foo-1');
            });
        });
        context('when multiple descendant elements have style property', () => {
            it('assigns a generated className', () => {
                let subject;

                subject = <div>
                    <p {...{[styleProperty]: 'foo'}}></p>
                    <p {...{[styleProperty]: 'bar'}}></p>
                </div>;

                subject = linkClass(subject, {
                    bar: 'bar-1',
                    foo: 'foo-1'
                });

                expect(subject.props.children[0].props.className).to.equal('foo-1');
                expect(subject.props.children[1].props.className).to.equal('bar-1');
            });
            it('style property is reset to null', () => {
                let subject;

                subject = <div>
                    <p {...{[styleProperty]: 'foo'}}></p>
                    <p {...{[styleProperty]: 'bar'}}></p>
                </div>;

                subject = linkClass(subject, {
                    bar: 'bar-1',
                    foo: 'foo-1'
                });

                expect(subject.props.children[0].props[styleProperty]).to.equal(null);
                expect(subject.props.children[1].props[styleProperty]).to.equal(null);
            });
        });
        context('when multiple descendants have style property and are iterable', () => {
            it('assigns a generated className', () => {
                let subject;

                const iterable = {
                    0: <p key='1' {...{[styleProperty]: 'foo'}}></p>,
                    1: <p key='2' {...{[styleProperty]: 'bar'}}></p>,
                    length: 2,
                    /* eslint-disable no-use-extend-native/no-use-extend-native */
                    [Symbol.iterator]: Array.prototype[Symbol.iterator]
                    /* eslint-enable no-use-extend-native/no-use-extend-native */
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
        context('when ReactElement does not have an existing className', () => {
            it('uses the generated class name to set the className property', () => {
                let subject;

                subject = <div {...{[styleProperty]: 'foo'}}></div>;

                subject = linkClass(subject, {
                    foo: 'foo-1'
                });

                expect(subject.props.className).to.deep.equal('foo-1');
            });
        });
        context('when ReactElement has an existing className', () => {
            it('appends the generated class name to the className property', () => {
                let subject;

                subject = <div className='foo' {...{[styleProperty]: 'bar'}}></div>;

                subject = linkClass(subject, {
                    bar: 'bar-1'
                });

                expect(subject.props.className).to.deep.equal('foo bar-1');
            });
        });
    });

    context('style property includes multiple whitespace characters', () => {
        it('resolves CSS modules', () => {
            let subject;

            subject = <div>
                <p {...{[styleProperty]: ' foo   bar '}}></p>
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
                        linkClass(<div {...{[styleProperty]: 'foo bar'}}></div>, {}, {allowMultiple: false});
                    }).to.throw(Error, 'ReactElement style property defines multiple module names ("foo bar").');
                });
            });
            context('when true', () => {
                it('appends a generated class name for every referenced CSS module', () => {
                    let subject;

                    subject = <div {...{[styleProperty]: 'foo bar'}}></div>;

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
        context('when style property does not match an existing CSS module', () => {
            context('when false', () => {
                it('ignores the missing CSS module', () => {
                    let subject;

                    subject = <div {...{[styleProperty]: 'foo'}}></div>;

                    subject = linkClass(subject, {}, {errorWhenNotFound: false});

                    expect(subject.props.className).to.be.an('undefined');
                });
            });
            context('when is true', () => {
                it('throws an error', () => {
                    expect(() => {
                        linkClass(<div {...{[styleProperty]: 'foo'}}></div>, {}, {errorWhenNotFound: true});
                    }).to.throw(Error, '"foo" CSS module is undefined.');
                });
            });
        });
    });

    it('does not warn for unknown style property', () => {
        const originalWrite = process.stderr.write;
        let warning;

        process.stderr.write = (function (write) {
            return function (string, ...args) {
                write.apply(process.stderr, [string, ...args]);
                if (string.indexOf('Unknown prop') > 0) {
                    warning = string;
                }
            };
        })(process.stderr.write);

        TestUtils.renderIntoDocument(linkClass(<div {...{[styleProperty]: 'foo'}}></div>, {foo: 'foo-1'}));

        process.stderr.write = originalWrite;

        expect(warning).to.be.an('undefined');
    });

    context('when ReactElement includes ReactComponent', () => {
        let Foo,
            nodeList;

        beforeEach(() => {
            Foo = class extends React.Component {
                render () {
                    return <div {...{[styleProperty]: 'foo'}}>Hello</div>;
                }
            };

            nodeList = TestUtils.renderIntoDocument(linkClass(<div {...{[styleProperty]: 'foo'}}><Foo /></div>, {foo: 'foo-1'}));
        });
        it('processes ReactElement nodes', () => {
            expect(nodeList.className).to.equal('foo-1');
        });
        it('does not process ReactComponent nodes', () => {
            expect(nodeList.firstChild.className).to.equal('');
        });
    });

    it('unsets style property of the target element', () => {
        let subject;

        subject = <div {...{[styleProperty]: 'foo'}}></div>;

        subject = linkClass(subject, {
            foo: 'foo-1'
        });

        expect(subject.props.className).to.deep.equal('foo-1');
        expect(subject.props[styleProperty]).to.deep.equal(null);
    });

    it('unsets style property of the target element (deep)', () => {
        let subject;

        subject = <div {...{[styleProperty]: 'foo'}}>
            <div {...{[styleProperty]: 'bar'}}></div>
            <div {...{[styleProperty]: 'bar'}}></div>
        </div>;

        subject = linkClass(subject, {
            bar: 'bar-1',
            foo: 'foo-1'
        });

        expect(subject.props.children[0].props.className).to.deep.equal('bar-1');
        expect(subject.props.children[0].props[styleProperty]).to.deep.equal(null);
    });
});
