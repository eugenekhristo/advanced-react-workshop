import "./index.css";
import React, { Component } from "react";
import subscribeToMessages from "./messages";
import FadeIn from "./FadeIn";

class PinScrollToBottom extends Component {
  isScrolledup = false;

  constructor() {
    super();

    window.addEventListener('scroll', () => {
      const {scrollHeight, clientHeight} = document.documentElement;

      if (pageYOffset + clientHeight < scrollHeight) {
        this.isScrolledup = true;
      } else {
        this.isScrolledup = false;
      }
    });
  }

  scrollToBottom() {
    if (!this.isScrolledup) {
      window.scrollTo(0, document.documentElement.scrollHeight);
    }
  }

  render() {
    return this.props.children;
  }

  componentDidMount = () => {
    this.scrollToBottom();
  }
  
  componentDidUpdate() {
    this.scrollToBottom();
  }
}

class App extends Component {
  state = {
    messages: []
  };

  render() {
    const { messages } = this.state;
    return (
      <div className="app">
        <div className="link">
          <a href="https://www.youtube.com/watch?v=VKHFZBUTA4k&list=RDVKHFZBUTA4k">
            Sketch on YouTube
          </a>
        </div>
        <PinScrollToBottom>
          <ol className="messages">
            {messages.map((message, index) => (
              <FadeIn key={index}>
                <li className="message">
                  <div
                    className="avatar"
                    style={{ backgroundImage: `url(${message.avatar})` }}
                  />
                  <div className="text">{message.text}</div>
                </li>
              </FadeIn>
            ))}
          </ol>
        </PinScrollToBottom>
      </div>
    );
  }

  componentDidMount() {
    subscribeToMessages(message => {
      this.setState({
        messages: this.state.messages.concat([message])
      });
    });

  }
  
}

export default App;
