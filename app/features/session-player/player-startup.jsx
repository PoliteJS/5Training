
var React = require('react');
var Button = require('reactui/button');

var PlayerStartup = React.createClass({
    render() {
        return (
            <div className="text-center">
                <Button 
                    role="primary"
                    text="Start Training" 
                    icon="play" 
                    onClick={this.props.onStart}
                />
            </div>
        );
    }
});

module.exports = PlayerStartup;
