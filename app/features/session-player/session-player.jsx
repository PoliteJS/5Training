
var React = require('react');

var SessionModel = require('./session-model');
var activityComponents = require('activity');

var Container = require('reactui/container');
var Row = require('reactui/row');
var Col = require('reactui/col');
var PageHeader = require('reactui/page-header');
var Button = require('reactui/button');

var Timer = require('timer');

var SessionPlayer = React.createClass({
    getDefaultProps() {
        return {
            session: [],
            isRunning: false
        };
    },
    getInitialState() {
        return {
            isRunning: this.props.isRunning,
            isPaused: false,
            elapsedTime: 0,
            currentStep: null,
            stepCountdown: null
        };
    },
    componentDidMount() {
        this.model = new SessionModel(this.props.session);
        this.model.subscribe(this.updateStateFromModel);
        if (this.props.isRunning) {
            this.model.start();
        }
    },
    updateStateFromModel(model) {
        this.setState({
            isRunning: this.model.isRunning,
            isPaused: this.model.isPaused,
            elapsedTime: this.model.elapsedTime,
            currentStep: this.model.currentStep,
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
    render() {
        
        var activityComponent;
        var currentStep = this.state.currentStep;
        var startButtonLabel = this.state.isRunning ? 'Stop' : 'Start';
        var startButtonIcon = this.state.isRunning ? 'stop' : 'play';
        var pauseButtonLabel = this.state.isPaused ? 'Resume' : 'Pause';
        var pauseButtonIcon = this.state.isPaused ? 'play' : 'pause';
        var pauseButtonDisabled = this.state.isRunning ? false : true;
        
        if (currentStep) {
            // get activity component
            if (activityComponents[currentStep.activity]) {
                activityComponent = activityComponents[currentStep.activity]; 
            } else if (currentStep.gatherData) {
                activityComponent = activityComponents['general-form'];
            } else {
                activityComponent = activityComponents['general-activity'];
            }
            // create the activity element giving data into it
            activityComponent = React.createElement(activityComponent, {
                activity: currentStep.activity,
                countdown: this.state.stepCountdown
            });    
        }
        
        return (
            <Container>
                <PageHeader 
                    titleSize="4"
                    title="5Training" 
                    subtitle=" - Your Personal Trainer" 
                    />
                <Row>
                    <Col size="6">
                        <Button.Group>
                            <Button
                                text={startButtonLabel}
                                icon={startButtonIcon}
                                onClick={this.startStop}
                                />
                            <Button
                                text={pauseButtonLabel}
                                icon={pauseButtonIcon}
                                disabled={pauseButtonDisabled}
                                onClick={this.pauseResume}
                                />
                        </Button.Group>
                    </Col>
                    <Col size="6" className="text-right">
                        <Timer value={this.state.elapsedTime} />
                    </Col>
                </Row>
                <hr />
                <div className="well">
                    {activityComponent}
                </div>
            </Container>
        );
    }
});

module.exports = SessionPlayer;
