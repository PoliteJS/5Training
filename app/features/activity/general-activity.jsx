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
        this.props.pushEventData(this.props.currentStep.activity, 'duration', this.props.stepActivityTime);
    },
    render() {
        return (
            <div>
                <h4>{this.props.currentStep.activity}</h4>
                <p>
                    Elapsed:
                    <Timer value={this.props.stepElapsedTime} />
                </p>
                <p>
                    Paused:
                    <Timer value={this.props.stepPausedTime} />
                </p>
                <p>
                    Activity:
                    <Timer value={this.props.stepActivityTime} />
                </p>
                <p>
                    Coundown:
                    <Timer value={this.props.stepCountdown} />
                </p>
            </div>
        );
    }
});

module.exports = GeneralActivity;
