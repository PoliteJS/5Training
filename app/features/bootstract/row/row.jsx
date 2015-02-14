/**
 * attribute "colSize" is forwarded down to "Col::size"
 */


var React = require('react');
var classMixin = require('../utils/class-mixin');

var Col = require('../col');

module.exports = React.createClass({
    propTypes: {
        colSize: React.PropTypes.oneOfType([
            React.PropTypes.string,
            React.PropTypes.number,
            React.PropTypes.array
        ])
    },
    render() {
        var {className, colSize, children, ...other} = this.props;
        var classes = classMixin('row', className);

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
        if (child.type !== Col.type) {
            return child;
        }
        if (colSize && !child.props.size) {
            props.size = colSize;
        }
        return React.addons.cloneWithProps(child, props);
    });
}