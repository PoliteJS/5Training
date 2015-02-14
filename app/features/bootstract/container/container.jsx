/**
 * attribute "colSize" is forwarded down to "Row::colSize"
 */

var React = require('react');
var classMixin = require('../utils/class-mixin');

var Row = require('../row');

module.exports = React.createClass({
    propTypes: {
        fluid: React.PropTypes.bool,
        colSize: React.PropTypes.oneOfType([
            React.PropTypes.string,
            React.PropTypes.number,
            React.PropTypes.array
        ])
    },
    getDefaultProps() {
        return {
            fluid: false
        };
    },
    render() {
        var {className, fluid, colSize, children, ...other} = this.props;
        var classes = classMixin('container container-fluid', className);
        classes.set('container-fluid', fluid);

        return (
            <div {...other} className={classes}>
                {applyColSize(children, colSize)}
            </div>
        );
    }
});

function applyColSize(children, colSize) {
    return React.Children.map(children, function(child) {
        if (!child) {
            return child;
        }
        var props = {};
        if (child.type !== Row.type) {
            return child;
        }
        if (colSize && !child.props.colSize) {
            props.colSize = colSize;
        }
        return React.addons.cloneWithProps(child, props);
    });
}