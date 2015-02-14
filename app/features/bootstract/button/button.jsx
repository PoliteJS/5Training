
var React = require('react');
var classMap = require('../utils/class-map');
var statusList = require('../status-list');

module.exports = React.createClass({
    propTypes: {
        role: React.PropTypes.oneOf(statusList.concat(['link'])),
        display: React.PropTypes.oneOf(['block']),
        size: React.PropTypes.oneOf(['lg','sm','xs']),
        status: React.PropTypes.oneOf(['active','disabled'])
    },
    getDefaultProps() {
        return {
            type: 'button',
            role: 'default',
            size: null,
            display: null,
            status: null
        };
    },
    render() {
        var {type, role, size, display, status, value, className, children, ...other} = this.props;
        var classes = new classMap(['btn']);

        if (role) {
            classes.addClass('btn-' + role);
        }

        if (size) {
            classes.addClass('btn-' + size);
        }

        if (display) {
            classes.addClass('btn-' + display);
        }

        if ('active' === status) {
            classes.addClass(status);   
        }

        if ('disabled' === status) {
            other.disabled = 'disabled';
        }

        if (className) {
            classes.add(className);
        }

        return (
            <button {...other} className={classes}>
                {value || children}
            </button>
        );
    }
});
