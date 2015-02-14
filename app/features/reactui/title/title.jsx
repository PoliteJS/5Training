
/**
 * <Title>foo</Title>
 * <Title subtitle="fii">foo</Title>
 * <Title text="foo" subtitle="fii" size="2" />
 */


var React = require('react');
var classMixin = require('../utils/class-mixin');

var defaultSize = 1;

module.exports = React.createClass({
    propTypes: {
        size: React.PropTypes.oneOf([1,2,3,4,5,6,'1','2','3','4','5','6']),
        text: React.PropTypes.string,
        subtitle: React.PropTypes.string
    },
    render() {
        var args, tagName, classes;
        var {text, subtitle, size, className, children, ...other} = this.props;

        tagName = 'h' + (size || defaultSize);
        
        // optional class attribute - only if inherited from outside
        classes = classMixin([], className).toString();
        if (classes.length) {
            other.className = classes;
        }
        
        args = [
            tagName,
            other,
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
