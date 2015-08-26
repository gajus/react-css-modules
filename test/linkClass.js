import {
    expect
} from 'chai';

import React from 'react';
import TestUtils from 'react-addons-test-utils';
import jsdom from 'jsdom';
import linkClass from './../dist/linkClass';

describe('linkClass', () => {
    describe('when elements do not define className', () => {
        it('does not affect the element declaration', () => {
            expect(linkClass(<div></div>)).to.deep.equal(<div></div>);
        });

        it('does not affect element with a single element child', () => {
            expect(linkClass(<div><p></p></div>)).to.deep.equal(<div><p></p></div>);
        });

        it('does not affect element with a single text child', () => {
            expect(linkClass(<div>test</div>)).to.deep.equal(<div>test</div>);
        });

        // Using array instead of object causes the following error:
        // Warning: Each child in an array or iterator should have a unique "key" prop.
        // Check the render method of _class. See https://fb.me/react-warning-keys for more information.
        xit('does not affect element with multiple children', () => {
            expect(linkClass(<div><p></p><p></p></div>)).to.deep.equal(<div><p></p><p></p></div>);
        });
    });

    describe('when element className does not match an existing CSS class', () => {
        it('does not affect element className', () => {
            let subject;

            subject = <div className='foo'></div>;

            subject = linkClass(subject, {});

            expect(subject.props.className).to.deep.equal('foo');
        });
    });

    describe('when element className matches an existing CSS class', () => {
        it('appends the generated class name to the className property', () => {
            let subject;

            subject = <div className='foo'></div>;

            subject = linkClass(subject, {
                foo: 'foo-1'
            });

            expect(subject.props.className).to.deep.equal('foo foo-1');
        });
    });

    describe('when element classNames refers to multiple CSS classes', () => {
        describe('when all referenced CSS classes exist', () => {
            it('appends a generated class name for every referenced CSS class', () => {
                let subject;

                subject = <div className='foo bar'></div>;

                subject = linkClass(subject, {
                    foo: 'foo-1',
                    bar: 'bar-1'
                });

                expect(subject.props.className).to.deep.equal('foo foo-1 bar bar-1');
            });
        });
        describe('when some referenced CSS classes exist', () => {
            it('appends a generated class name for the matched CSS classes', () => {
                let subject;

                subject = <div className='foo bar'></div>;

                subject = linkClass(subject, {
                    foo: 'foo-1'
                });

                expect(subject.props.className).to.deep.equal('foo foo-1 bar');
            });
        });
        describe('when none of the referenced CSS classes exist', () => {
            it('does not append anything', () => {
                let subject;

                subject = <div className='foo bar'></div>;

                subject = linkClass(subject, {});

                expect(subject.props.className).to.deep.equal('foo bar');
            });
        });
    });

    describe('when ReactElement includes ReactComponent', () => {
        let Foo,
            nodeList;

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

            Foo = class extends React.Component {
                render () {
                    return <div className='foo'>Hello</div>;
                }
            };

            nodeList = TestUtils.renderIntoDocument(linkClass(<div className='foo'><Foo /></div>, {foo: 'foo-1'}));
        });
        it('processes ReactElement nodes', () => {
            expect(nodeList.className).to.equal('foo foo-1');
        });
        it('does not process ReactComponent nodes', () => {
            expect(nodeList.firstChild.className).to.equal('foo');
        });
    });

    describe('when options.useModuleName is true', () => {
        it('does not lookup the className property', () => {
            let subject;

            subject = linkClass(<div className='foo'></div>, {foo: 'foo-1'}, {useModuleName: true});

            expect(subject.props.className).to.equal('foo');
        });
        it('appends CSS Modules using modulName', () => {
            let subject;

            subject = linkClass(<div moduleName='foo'></div>, {foo: 'foo-1'}, {useModuleName: true});

            expect(subject.props.className).to.equal('foo-1');
        });
    });

    describe('when options.allowMultiple is false', () => {
        describe('when it finds multiple CSS class names in a className', () => {
            it('throws an error', () => {
                expect(() => {
                    linkClass(<div className='foo bar'></div>, {}, {allowMultiple: false});
                }).to.throw(Error, 'ReactElement defines multiple class names ("foo bar") in className declaration.');
            });
        });
    });

    describe('when options.includeOriginal is false', () => {
        it('does not include the original class name', () => {
            let subject;

            subject = linkClass(<div className='foo bar'></div>, {foo: 'foo-1'}, {includeOriginal: false});

            expect(subject.props.className).to.equal('foo-1');
        });
    });

    describe('when options.errorNotFound is true', () => {
        it('throws an error when className defines a CSS class that does not exist in CSS modules styles', () => {
            expect(() => {
                linkClass(<div className='foo'></div>, {}, {errorNotFound: true})
            }).to.throw(Error, '"foo" CSS class name is not found in CSS modules styles.');
        });
    });
});
