import "./index.css";
import React, { Component } from "react";
import FaPlay from "react-icons/lib/fa/play";
import FaPause from "react-icons/lib/fa/pause";
import FaForward from "react-icons/lib/fa/forward";
import FaBackward from "react-icons/lib/fa/backward";

class RadioGroup extends Component {
  state = {
    activeValue: this.props.defaultValue
  };

  handleSelectButton = value => this.setState({activeValue: value})

  render() {
    const { legend, children } = this.props;
    const { activeValue } = this.state;

    const modifiedChildren = React.Children.map(children, child =>
      React.cloneElement(child, {
        activeValue,
        onSelectButton: this.handleSelectButton
      })
    );
    return (
      <fieldset className="radio-group">
        <legend>{legend}</legend>
        {modifiedChildren}
      </fieldset>
    );
    
  }
}

class RadioButton extends Component {
  render() {
    const { value, children, activeValue, onSelectButton } = this.props;

    const isActive = value === activeValue;
    const className = "radio-button" + (isActive ? " active" : "");

    return (
      <button className={className} onClick={() => onSelectButton(value)}>
        {children}
      </button>
    );
  }
}

class App extends Component {
  render() {
    return (
      <div>
        <RadioGroup defaultValue="pause" legend="Radio Group 📻">
          <RadioButton value="back">
            <FaBackward />
          </RadioButton>
          <RadioButton value="play">
            <FaPlay />
          </RadioButton>
          <RadioButton value="pause">
            <FaPause />
          </RadioButton>
          <RadioButton value="forward">
            <FaForward />
          </RadioButton>
        </RadioGroup>
      </div>
    );
  }
}

export default App;
