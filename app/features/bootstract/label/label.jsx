
var React = require('react');
var classMixin = require('../utils/class-mixin');
var statusList = require('../status-list');

var defaultSize = 1;

module.exports = React.createClass({
    propTypes: {
        type: React.PropTypes.oneOf(statusList)
    },
    getDefaultProps() {
        return {
            type: 'default'
        };
    },
    render() {
        var {type, value, className, children, ...other} = this.props;
        var classes = classMixin(['label','label-'+type], className);
        return (
            <span {...other} className={classes}>
                {value || children}
            </span>
        );
    }
});
