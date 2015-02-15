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
    componentWillUnmount() {
        this.props.pushEventData(this.props.activity, 'duration', this.props.activityTime);
    },
    render() {
        return (
            <div>
                <h4>{this.props.activity}</h4>
                <p>
                    Elapsed:
                    <Timer value={this.props.elapsedTime} />
                </p>
                <p>
                    Paused:
                    <Timer value={this.props.pausedTime} />
                </p>
                <p>
                    Activity:
                    <Timer value={this.props.activityTime} />
                </p>
                <p>
                    Coundown:
                    <Timer value={this.props.countdown} />
                </p>
            </div>
        );
    }
});

module.exports = GeneralActivity;
