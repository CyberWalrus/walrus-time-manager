import React, { Component } from 'react';
import 'whatwg-fetch';

export default class MessageManager extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoad: true,
      messages: [],
      value: '',
      messageListId: this.props.id
    };

    this.addMessage = this.addMessage.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleListChange = this.handleListChange.bind(this);
  }

  componentDidMount() {
    fetch(`/api/messages/${this.state.messageListId}`)
      .then(res => res.json())
      .then(json => {
        this.setState({
          messages: json
        });
      });
  }
  addMessage() {
    let value = this.state.value;
    this.state.value = '';
    fetch(`/api/messages/${this.state.messageListId}/add`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        value: value
      })
    }).then(res => res.json())
      .then(json => {
        let data = this.state.messages;
        data.push(json);

        this.setState({
          messages: data
        });
      });
  }
  handleListChange(index, event, key) {
    let messages = this.state.messages.slice(); // Make a copy of the emails first.
    messages[index][key] = event.target.value; // Update it with the modified email.
    this.setState({ messages: messages }); // Update the state.
    this.changeNameCounter(index);
  }
  handleChange(key, event) {
    this.setState({ [key]: event.target.value }); // Update the state.
  }

  render() {
    return (
      <div>
        <ul>
          {this.state.messages.map((message, i) => (
            <li key={i}>
              <span>
                <input type="text"
                  value={message.value}
                  onChange={this.handleListChange.bind(this, i, 'value')} />
              </span>
              <button onClick={() => this.deletedMenu(i)}>Deleted</button>
            </li>
          ))}
        </ul>

        <div>
          <span>
            <input type="text"
              value={this.state.value}
              onChange={this.handleChange.bind(this, 'value')}
              onBlur={this.addMessage} />
          </span>
        </div>
      </div>
    );
  }
}