'use strict';

/**
 * <Title>foo</Title>
 * <Title subtitle="fii">foo</Title>
 * <Title text="foo" subtitle="fii" size="2" />
 */

var React = require('react');
var ClassMap = require('../utils/class-map');

var defaultSize = 1;

module.exports = React.createClass({
    propTypes: {
        size: React.PropTypes.oneOf([1,2,3,4,5,6,'1','2','3','4','5','6']),
        text: React.PropTypes.string,
        subtitle: React.PropTypes.string
    },
    render() {
        var args, tagName;
        var {
            text, 
            subtitle, 
            size, 
            className, 
            children, 
            ...props
        } = this.props;

        tagName = 'h' + (size || defaultSize);
        
        // optional class attribute - only if inherited from outside
        props.className = new ClassMap(className);
        
        args = [
            tagName,
            props,
            children
        ];

        if (text) {
            args.push(text);
        }

        if (subtitle) {
            args.push(React.DOM.small({}, subtitle));
        }
        
        return React.createElement.apply(React, args);
    }
});
