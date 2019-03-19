import "./index.css";
import React, { Component } from "react";
import FaPlay from "react-icons/lib/fa/play";
import FaPause from "react-icons/lib/fa/pause";
import FaForward from "react-icons/lib/fa/forward";
import FaBackward from "react-icons/lib/fa/backward";

const radioGroupContext = React.createContext();

class RadioGroup extends Component {
  state = {
    activeValue: this.props.defaultValue
  };

  handleSelectButton = value => this.setState({ activeValue: value });

  render() {
    const { legend, children } = this.props;
    const { activeValue } = this.state;

    return (
      <radioGroupContext.Provider
        value={{
          activeValue,
          onSelectButton: this.handleSelectButton
        }}
      >
        <fieldset className="radio-group">
          <legend>{legend}</legend>
          {children}
        </fieldset>
      </radioGroupContext.Provider>
    );
  }
}

class RadioButton extends Component {
  render() {
    const { value, children} = this.props;

    return (
      <radioGroupContext.Consumer>
        {({activeValue, onSelectButton}) => {
          const isActive = value === activeValue;
          const className = "radio-button" + (isActive ? " active" : "");

          return (
            <button className={className} onClick={() => onSelectButton(value)}>
              {children}
            </button>
          );
        }}
      </radioGroupContext.Consumer>
    );
  }
}

class App extends Component {
  render() {
    return (
      <div>
        <RadioGroup defaultValue="pause" legend="Radio Group 📻">
          <div>
            <p>asdasd</p>
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
          </div>
        </RadioGroup>
      </div>
    );
  }
}

export default App;
