'use strict';

/**
 * <PageHeader title="foo" />
 * <PageHeader title="foo" subtitle="faa" />
 * <PageHeader title="foo" titleSize="4" />
 */

var React = require('react');
var ClassMap = require('../utils/class-map');

var Title = require('../title');

module.exports = React.createClass({
    propTypes: {},
    render() {
        
        var {
            title, 
            subtitle, 
            titleSize,
            className,
            titleClassName,
            children, 
            ...other 
        } = this.props;

        var classes = new ClassMap(['page-header', className]);
        
        return (
            <div {...other} className={classes}>
                {createTitle(title, subtitle, titleSize, titleClassName)}
                {children}
            </div>
        );
    }
});

function createTitle(title, subtitle, titleSize, titleClassName) {
    var titleProps = {
        className: titleClassName
    };
        
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