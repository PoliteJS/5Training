
var React = require('react');
var Button = require('reactui/button');
var Timer = require('timer');

var PlayerCloseup = React.createClass({
    render() {
        return (
            <div className="text-center">
                <p className="lead">
                    <Timer value={this.props.elapsedTime} />
                </p>
                <Button 
                    role="danger"
                    text="Discard Training" 
                    icon="remove" 
                    iconPos="left"
                    onClick={this.props.onReset}
                />
                <hr />
                <div>{this.props.tempResults}</div>
            </div>
        );
    }
});

module.exports = PlayerCloseup;
