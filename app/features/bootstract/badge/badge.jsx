
var React = require('react');
var classMixin = require('../utils/class-mixin');

var defaultSize = 1;

module.exports = React.createClass({
    render() {
        var {value, className, children, ...other} = this.props;
        var classes = classMixin('badge', className);
        return (
            <span {...other} className={classes}>
                {value || children}
            </span>
        );
    }
});
