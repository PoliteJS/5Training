'use strict';

/**
 * <Badge value="22" />
 */

var React = require('react');
var ClassMap = require('../utils/class-map');

module.exports = React.createClass({
    render() {
        var {
            value, 
            className, 
            children, 
            ...other
        } = this.props;

        var classes = new ClassMap(['badge', className]);

        return (
            <span {...other} className={classes}>
                {value || children}
            </span>
        );
    }
});
