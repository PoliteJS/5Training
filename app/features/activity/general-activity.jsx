'use strict';

/**
 * this module contains a FAKE implementaiton of the step duration.
 * that information should be pushed from the model!
 */

var React = require('react');
var Timer = require('timer');

function noop() {}

var GeneralActivity = React.createClass({
    getDefaultProps() {
        return {
            activity: null,
            pushEventData: noop,
        }
    },
    componentDidMount() {
        this.startTime = (new Date()).getTime();
    },
    componentWillUnmount() {
        // this is the FAKE way to get the activity duration. must REMOVE PAUSED TIME!!!
        var elapsedTime = (new Date()).getTime() - this.startTime;
        this.props.pushEventData(this.props.activity, 'duration', elapsedTime);
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
