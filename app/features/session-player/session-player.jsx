
var React = require('react');

var PageHeader = require('reactui/page-header');
var Container = require('reactui/container');
var Row = require('reactui/row');
var Col = require('reactui/col');

var SessionModel = require('./session-model');
var PlayerActivity = require('./player-activity.jsx');
var PlayerStartup = require('./player-startup.jsx');
var PlayerCloseup = require('./player-closeup.jsx');

var SessionPlayer = React.createClass({
    getDefaultProps() {
        return {
            session: [],
            isRunning: false
        };
    },
    getInitialState() {
        return {
            hasRan: false,
            isRunning: this.props.isRunning,
            isPaused: false,
            elapsedTime: 0,
            currentStep: null,
            stepElapsedTime: 0,
            stepPausedTime: 0,
            stepActivityTime: 0,
            stepCountdown: 0
        };
    },
    componentDidMount() {
        this.model = new SessionModel(this.props.session);
        this.model.subscribe(this.updateStateFromModel);
        if (this.props.isRunning) {
            this.model.start();
        }
        // this.setState({
        //     // isRunning: true,
        //     // currentStep: this.props.session.activities[1],
        //     hasRan: true
        // });
    },
    updateStateFromModel(model) {
        this.setState({
            hasRan: this.model.hasRan,
            isRunning: this.model.isRunning,
            isPaused: this.model.isPaused,
            elapsedTime: this.model.elapsedTime,
            currentStep: this.model.currentStep,
            stepElapsedTime: this.model.stepElapsedTime,
            stepPausedTime: this.model.stepPausedTime,
            stepActivityTime: this.model.stepActivityTime,
            stepCountdown: this.model.stepCountdown
        });
    },
    startStop() {
        if (this.model.isRunning) {
            this.model.stop();
        } else {
            this.model.start();
        }
    },
    pauseResume() {
        if (this.model.isPaused) {
            this.model.resume();
        } else {
            this.model.pause();
        }  
    },
    reset() {
        this.model.reset();
    },
    pushEventData(activity, label, value) {
        this.model.push({
            activity: activity,
            label: label,
            value: value
        });
    },
    render() {
        var activityComponent;

        // current activity view
        if (this.state.isRunning) {
            activityComponent = React.createElement(PlayerActivity, {
                isRunning: this.state.isRunning,
                isPaused: this.state.isPaused,
                elapsedTime: this.state.elapsedTime,
                currentStep: this.state.currentStep,
                stepElapsedTime: this.state.stepElapsedTime,
                stepPausedTime: this.state.stepPausedTime,
                stepActivityTime: this.state.stepActivityTime,
                stepCountdown: this.state.stepCountdown,
                pushEventData: this.pushEventData,
                startStop: this.startStop,
                pauseResume: this.pauseResume
            });
        // stats & save data screen
        } else if (this.state.hasRan) {
            activityComponent = React.createElement(PlayerCloseup, {
                elapsedTime: this.state.elapsedTime,
                onReset: this.reset,
                tempResults: this.model.sessionEvents
            });
        // startup screen - before the training
        } else {
            activityComponent = React.createElement(PlayerStartup, {
                onStart: this.startStop
            });
        }
        
        return (
            <Container>
                <PageHeader 
                    titleSize="4"
                    title="5Training" 
                    subtitle=" - Your Personal Trainer" 
                    />
                {activityComponent}
            </Container>
        );
    }
});

module.exports = SessionPlayer;
