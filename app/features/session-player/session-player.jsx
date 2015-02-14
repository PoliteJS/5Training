
var React = require('react');

var SessionModel = require('./session-model');
var activityComponents = require('activity');

var Container = require('bootstract/container');
var Row = require('bootstract/row');
var Col = require('bootstract/col');
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
    render() {
        
        var activityComponent;
        var currentStep = this.state.currentStep;
        var buttonLabel = this.state.isRunning ? 'Stop' : 'Start';
        
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
                <Row>
                    <Col size="6">
                        <button
                            onClick={this.startStop}
                            children={buttonLabel}
                            className="btn btn-primary"
                            />
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
