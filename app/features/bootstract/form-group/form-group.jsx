
var React = require('react');
var classMap = require('../utils/class-map');

module.exports = React.createClass({
    propTypes: {
        status: React.PropTypes.oneOf(['success','warning','error'])
    },
    getDefaultProps() {
        return {
            type: 'text',
            size: null,
            status: null
        };
    },
    render() {
        var {status, className, children, ...other} = this.props;
        var classes = new classMap(['form-group']);

        if (status) {
            classes.add('has-' + status);
        }

        if (className) {
            classes.add(className);
        }

        return (
            <div {...other} className={classes}>
                {children}
            </div>
        );
    }
});
