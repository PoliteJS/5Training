
var playerStore = require('./store');
var playerActions = require('./actions');

var React = require('react');

var PageHeader = require('reactui/page-header');
var Container = require('reactui/container');
var Row = require('reactui/row');
var Col = require('reactui/col');

var PlayerStartup = require('./player-startup.jsx');
var PlayerActivity = require('./player-activity.jsx');
var PlayerCloseup = require('./player-closeup.jsx');

var Player = React.createClass({
    getDefaultProps() {
        return {
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
    componentWillMount() {
        playerStore.init(this.props.session, {});
        playerStore.subscribe(function(newState) {
            this.setState(newState);
        }.bind(this));
    },
    componentWillUnmount() {
        playerStore.dispose();
    },
    componentDidMount() {
        if (this.props.isRunning) {
            playerActions.play();
        }
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
                stepCountdown: this.state.stepCountdown
            });
        // stats & save data screen
        } else if (this.state.hasRan) {
            activityComponent = React.createElement(PlayerCloseup, {
                elapsedTime: this.state.elapsedTime,
                tempResults: this.state.tempResults
            });
        // startup screen - before the training
        } else {
            activityComponent = React.createElement(PlayerStartup);
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

module.exports = Player;
