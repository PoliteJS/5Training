
var React = require('react');

var Button = require('reactui/button');
var Timer = require('timer');

var PlayerToolbar = React.createClass({
    render() {

        var startButtonLabel = this.props.isRunning ? 'Stop' : 'Start';
        var startButtonIcon = this.props.isRunning ? 'stop' : 'play';
        var pauseButtonLabel = this.props.isPaused ? 'Resume' : 'Pause';
        var pauseButtonIcon = this.props.isPaused ? 'play' : 'pause';
        var pauseButtonDisabled = this.props.isRunning ? false : true;

        return (
            <div>
                <div className="pull-right">
                    <Timer value={this.props.elapsedTime} />
                </div>
                <Button.Group>
                    <Button
                        text={startButtonLabel}
                        icon={startButtonIcon}
                        onClick={this.props.startStop}
                        />
                    <Button
                        text={pauseButtonLabel}
                        icon={pauseButtonIcon}
                        disabled={pauseButtonDisabled}
                        onClick={this.props.pauseResume}
                        />
                </Button.Group>
            </div>
        );
    }
});

module.exports = PlayerToolbar;
