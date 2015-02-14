'use strict';

/**
 * <Well />
 */

var React = require('react');
var ClassMap = require('../utils/class-map');

module.exports = React.createClass({
    render() {
        var {
            className, 
            children, 
            ...other
        } = this.props;

        var classes = new ClassMap(['well', className]);

        return (
            <div {...other} className={classes}>
                {children}
            </div>
        );
    }
});
