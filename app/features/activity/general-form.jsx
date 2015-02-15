'use strict';

/**
 * Gather a generic numeric value for a given
 * activity.
 *
 * When the component unmount the value is sent back
 * via 'pushEventData()' callback.
 */

var React = require('react');

var Timer = require('timer');
var Input = require('reactui/input');
var Button = require('reactui/button');

function noop() {}

var GeneralForm = React.createClass({
    getDefaultProps() {
        return {
            pushEventData: noop,
            activity: null,
            question: 'how many repetitions?'
        };
    },
    getInitialState() {
        return {
            value: 0
        };
    },
    componentDidMount() {
        this.clearValue();
    },
    componentWillUnmount() {
        if (!this.state.value) {
            return;
        }
        this.props.pushEventData(this.props.activity, 'repetitions', this.state.value);
    },
    clearValue() {
        this.refs['input'].setValue('');
        this.setState({
            value: 0
        });
    },
    updateValue() {
        this.setState({
            value: this.refs['input'].getValue()
        });
    },
    increase() {
        var newValue = this.state.value + 1;
        this.refs['input'].setValue(newValue);
        this.setState({
            value: newValue
        });
    },
    decrease() {
        var newValue = this.state.value - 1;
        if (newValue < 0) {
            newValue = 0;
        }
        this.refs['input'].setValue(newValue);
        this.setState({
            value: newValue
        });
    },
    render() {
        return (
            <div>
                <h4>Gather data for: {this.props.activity}</h4>
                <Timer value={this.props.countdown} />

                <hr />

                <Input.Group>
                    <Button 
                        icon="minus"
                        onClick={this.decrease}
                        />
                    <Input 
                        ref="input" 
                        type="text"
                        placeholder={this.props.question}
                        onClick={this.clearValue}
                        onKeyUp={this.updateValue}
                    />
                    <Button 
                        icon="plus"
                        onClick={this.increase}
                        />
                </Input.Group>
            </div>
        );
    }
});

module.exports = GeneralForm;
