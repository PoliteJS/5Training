
var React = require('react');

function noop() {}

var GeneralForm = React.createClass({
    getDefaultProps() {
        return {
            onValue: noop,
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
        this.props.onValue(this.props.activity, this.state.value);
    },
    clearValue() {
        this.refs['input'].getDOMNode().value = '';
        this.setState({
            value: 0
        });
    },
    updateValue() {
        this.setState({
            value: this.refs['input'].getDOMNode().value
        });
    },
    render() {
        return (
            <div>
                <h4>Gather data for: {this.props.activity}</h4>
                <input 
                    ref="input" 
                    type="text" 
                    placeholder={this.props.question}
                    onClick={this.clearValue}
                    onKeyUp={this.updateValue}
                    />
                {this.state.value}
            </div>
        );
    }
});

module.exports = GeneralForm;
