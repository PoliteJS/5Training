'use strict';

var React = require('react');
var ClassMap = require('../utils/class-map');

var Group = React.createClass({
    render() {

        var {
            className,
            children,
            ...other
        } = this.props;

        var classes = new ClassMap(['btn-group']);

        return (
            <div {...other} className={classes}>
                {children}
            </div>
        );
    }
});

module.exports = Group;
