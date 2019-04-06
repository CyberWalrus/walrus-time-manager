import React, { Component } from "react";
import { Link } from "react-router-dom";
import "whatwg-fetch";

export default class MessageBoard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoad: true,
      messageBoards: [],
      value: ``
    };

    this.addMessageBoard = this.addMessageBoard.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleListChange = this.handleListChange.bind(this);
  }

  componentDidMount() {
    fetch(`/api/messagesboard/`)
      .then(res => res.json())
      .then(json => {
        this.setState({
          messageBoards: json
        });
      });
  }
  addMessage() {
    let value = this.state.value;
    this.state.value = ``;
    fetch(`/api/messagesboard/add`, {
      method: `POST`,
      headers: {
        "Content-Type": `application/json`
      },
      body: JSON.stringify({
        value: value
      })
    })
      .then(res => res.json())
      .then(json => {
        let data = this.state.messageBoards;
        data.push(json);

        this.setState({
          messageBoards: data
        });
      });
  }
  handleListChange(index, event, key) {
    let messageBoards = this.state.messageBoards.slice(); // Make a copy of the emails first.
    messageBoards[index][key] = event.target.value; // Update it with the modified email.
    this.setState({ messageBoards: messageBoards }); // Update the state.
    this.changeNameCounter(index);
  }
  handleChange(key, event) {
    this.setState({ [key]: event.target.value }); // Update the state.
  }

  render() {
    return (
      <div>
        <ul>
          {this.state.messages.map((messageBoard, i) => (
            <li key={i}>
              <span>
                <Link to={`/message/:id`} className="nav-bar-link">
                  {messageBoard.value}
                </Link>
              </span>
              <span>
                <input
                  type="text"
                  value={messageBoard.value}
                  onChange={this.handleListChange.bind(this, i, `value`)}
                />
              </span>
              <button onClick={() => this.deletedMenu(i)}>Deleted</button>
            </li>
          ))}
        </ul>

        <div>
          <span>
            <input
              type="text"
              value={this.state.value}
              onChange={this.handleChange.bind(this, `value`)}
              onBlur={this.addMessage}
            />
          </span>
        </div>
      </div>
    );
  }
}
