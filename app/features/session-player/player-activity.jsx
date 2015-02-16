
var React = require('react');
var activityComponents = require('activity');

var PlayerActivity = React.createClass({
    render() {

        var customActivity, element;
        var currentStep = this.props.currentStep;

        if (!currentStep) {
            return null;
        }

        // get activity component
        if (activityComponents[currentStep.activity]) {
            element = activityComponents[currentStep.activity]; 
        } else if (currentStep.gatherData) {
            element = activityComponents['general-form'];
        } else {
            element = activityComponents['general-activity'];
        }
        // create the activity element giving data into it
        element = React.createElement(element, this.props);

        return element;
    }
});

module.exports = PlayerActivity;
