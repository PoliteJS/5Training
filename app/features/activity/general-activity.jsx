'use strict';

var playerActions = require('../session-player/actions');

var React = require('react');

var Well = require('reactui/well');

var Timer = require('timer');

var GeneralActivity = React.createClass({
    getDefaultProps() {
        return {
            activity: null
        }
    },
    componentWillUnmount() {
        playerActions.pushData({
            dataType: 'duration',
            activity: this.props.currentStep.activity,
            value: this.props.stepActivityTime
        });
    },
    render() {
        return (
            <Well>
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
            </Well>
        );
    }
});

module.exports = GeneralActivity;
