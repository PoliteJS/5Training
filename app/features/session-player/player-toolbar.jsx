
var playerActions = require('./actions');

var React = require('react');

var Button = require('reactui/button');

var Timer = require('timer');

var PlayerToolbar = React.createClass({
    _stop() {
        playerActions.stop();
    },
    _pauseResume() {
        if (this.props.isPaused) {
            playerActions.resume();
        } else {
            playerActions.pause();
        }
    },
    render() {
        
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
                        text="stop"
                        icon="stop"
                        onClick={this._stop}
                        />
                    <Button
                        text={pauseButtonLabel}
                        icon={pauseButtonIcon}
                        disabled={pauseButtonDisabled}
                        onClick={this._pauseResume}
                        />
                </Button.Group>
            </div>
        );
    }
});

module.exports = PlayerToolbar;
