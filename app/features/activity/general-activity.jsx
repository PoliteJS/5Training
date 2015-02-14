
var React = require('react');
var Timer = require('timer');

var GeneralActivity = React.createClass({
    getDefaultProps() {
        return {
            activity: null
        }
    },
    render() {
        return (
            <div>
                <h4>{this.props.activity}</h4>
                <Timer value={this.props.countdown} />
            </div>
        );
    }
});

module.exports = GeneralActivity;
