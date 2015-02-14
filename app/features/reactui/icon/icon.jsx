'use strict';

/**
 * <Icon glyph="start" />
 */

var React = require('react');
var ClassMap = require('../utils/class-map');

module.exports = React.createClass({
    getDefaultProps() {
        return {
            glyph: 'question-sign'
        };
    },
    render() {
        var {
            glyph, 
            className, 
            ...other
        } = this.props;

        var classes = new ClassMap(['glyphicon', 'glyphicon-' + glyph, className]);

        return (
            <span {...other} className={classes} />
        );
    }
});
