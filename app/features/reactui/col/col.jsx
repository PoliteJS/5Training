'use strict';

var React = require('react');
var ClassMap = require('../utils/class-map');

var defaultType = 'xs';
var defaultSize = 12;

module.exports = React.createClass({
    propTypes: {
        size: React.PropTypes.oneOfType([
            React.PropTypes.string,
            React.PropTypes.number,
            React.PropTypes.array
        ])
    },
    render() {
        
        var {
            className, 
            size, 
            children, 
            ...other
        } = this.props;
        
        var classes = new ClassMap(parseColumnSize(size).concat([className]));
        
        return (
            <div {...other} className={classes}>
                {children}
            </div>
        );
    }
});


/**
 * Col's "size" attribute can be defined as:
 * 
 *     size={2}                  -> col-xs-2
 *     size="2"                  -> col-xs-2
 *     size="md-4"               -> col-md-4
 *     size="lg-2 md-4"          -> col-lg-2 col-md-4
 *     size={['lg-2','md-4']}    -> col-lg-2 col-md-4
 */
function parseColumnSize(size) {
    if (!Array.isArray(size)) {
        size = (size || defaultSize).toString().split(' ');
    }
    return size.map(applyDefaultSize);
}

/**
 * fill the default size and the default media type attribute
 * to compose a valid column size descriptor
 */
function applyDefaultSize(size) {
    if (parseInt(size).toString() === size.toString()) {
        size = [defaultType, size].join('-');
    }
    return 'col-' + size;
}
