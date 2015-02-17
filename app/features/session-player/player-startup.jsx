
var playerActions = require('./actions');

var React = require('react');

var Button = require('reactui/button');

var PlayerStartup = React.createClass({
    _play() {
        playerActions.play();
    },
    render() {
        return (
            <div className="text-center">
                <Button 
                    role="primary"
                    text="Start Training" 
                    icon="play" 
                    onClick={this._play}
                />
            </div>
        );
    }
});

module.exports = PlayerStartup;
