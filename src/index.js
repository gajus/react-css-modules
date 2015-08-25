import React from 'react';
import ReactDOM from 'react-dom';

/**
 * @param {ReactClass} Target
 * @return {ReactClass}
 */
export default (Target) => {
    return class CSSModules extends React.Component {
        render() {
            return <div>
                <p>test</p>
                <Target {... this.props} />
            </div>;
        }
    }
};
