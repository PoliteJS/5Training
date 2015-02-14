'use strict';



var React = require('react');
var ClassMap = require('../utils/class-map');
var statusList = require('../status-list');

var Icon = require('../icon');

var Button = React.createClass({
    propTypes: {
        role: React.PropTypes.oneOf(statusList.concat(['link'])),
        display: React.PropTypes.oneOf(['block']),
        size: React.PropTypes.oneOf(['lg','sm','xs']),
        iconPos: React.PropTypes.oneOf(['left','right']),
    },
    getDefaultProps() {
        return {
            type: 'button',
            role: 'default',
            size: null,
            display: null,
            iconPos: 'right'
        };
    },
    render() {

        var compositeContent;
        
        var {
            type, 
            role, 
            size, 
            display, 
            text,
            icon,
            iconPos,
            className, 
            children, 
            ...other
        } = this.props;
        
        var classes = new ClassMap(['btn']);

        if (role) {
            classes.addClass('btn-' + role);
        }

        if (size) {
            classes.addClass('btn-' + size);
        }

        if (display) {
            classes.addClass('btn-' + display);
        }

        if (className) {
            classes.add(className);
        }

        if (icon) {
            icon = <Icon glyph={icon} />;
            switch (iconPos) {
                case 'left':
                    compositeContent = <span>{icon} {text || children}</span>;
                    break;
                case 'right':
                    compositeContent = <span>{text || children} {icon}</span>;
                    break;
            }
        }

        return (
            <button {...other} className={classes}>
                {compositeContent || text || children}
            </button>
        );
    }
});


Button.Group = require('./group.jsx');
module.exports = Button;
