
var React = require('react');
var classMixin = require('../utils/class-mixin');

var Title = require('../title');

module.exports = React.createClass({
    propTypes: {},
    render() {
        var {className, title, subtitle, titleSize, children, ...other} = this.props;
        var classes = classMixin('page-header', className);
        
        
        return (
            <div {...other} className={classes}>
                {createTitle(title, subtitle, titleSize)}
                {children}
            </div>
        );
    }
});

function createTitle(title, subtitle, titleSize) {
    var titleProps = {};
        
    if (title) {
        titleProps.text = title;
    }

    if (subtitle) {
        titleProps.subtitle = subtitle;
    }

    if (titleSize) {
        titleProps.size = titleSize;
    }

    if (Object.keys(titleProps).length) {
        return <Title {...titleProps} />;
    } else {
        return null;
    }
}