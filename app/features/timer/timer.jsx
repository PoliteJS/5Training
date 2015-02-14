
var React = require('react');

var Timer = React.createClass({
    getDefaultProps() {
        return {
            value: 0
        };
    },
    render() {
        
        var show, hours, minutes, seconds, decimals;
        
        decimals = Math.round(this.props.value / 10);
        
        seconds = Math.floor(decimals / 100);
        decimals -= seconds * 100;
        
        minutes = Math.floor(seconds / 60);
        seconds -= minutes * 60;
        
        hours = Math.floor(minutes / 60);
        minutes -= hours * 60;
        
        show = [hours, minutes, seconds, decimals];
        show = show.map(pad).join(':');
        
        return (
            <span>{show}</span>
        );
    }
});

module.exports = Timer;

function pad(val) {
    if (!val) {
        val = 0;
    }
    if (val < 10) {
        val = '0' + val;
    }
    return val;
}
