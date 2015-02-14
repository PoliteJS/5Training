'use strict';

/**
 * <Label value="label content" />
 * <Label value="label content" type="info" />
 */

var React = require('react');
var ClassMap = require('../utils/class-map');
var statusList = require('../status-list');

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
        var {
            type, 
            value, 
            className, 
            children, 
            ...other
        } = this.props;

        var classes = new ClassMap(['label', 'label-'+type, className]);

        return (
            <span {...other} className={classes}>
                {value || children}
            </span>
        );
    }
});
