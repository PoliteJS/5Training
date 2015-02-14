'use strict';

/**
 * You can populate the Input.Group with one Input and some other
 * controls before or after it.
 *
 * This component will apply the correct wrappers
 */

var React = require('react');
var ClassMap = require('../utils/class-map');

var Input = require('./input.jsx');
var Button = require('../button');

var InputGroup = React.createClass({
    propTypes: {
        
    },
    getDefaultProps() {
        return {
            
        };
    },
    render() {

        var input;
        var before = [];
        var after = [];

        var {
            className,
            children,
            ...other
        } = this.props;

        var classes = new ClassMap('input-group');

        React.Children.forEach(children, function(child) {
            if (child.type === Input.type) {
                input = child;
            } else {
                if (!input) {
                    before.push(child);
                } else {
                    after.push(child);
                }
            }
        });

        if (before.length && before[0].type === Button.type ) {
            before = <span className="input-group-btn" children={before} />;
        } else {
            before = <span className="input-group-addon" children={before} />;
        }

        if (after.length && after[0].type === Button.type ) {
            after = <span className="input-group-btn" children={after} />;
        } else {
            after = <span className="input-group-addon" children={after} />;
        }

        return (
            <div {...other} className={classes}>
                {before}
                {input}
                {after}
            </div>
        );
    }
});


module.exports = InputGroup;