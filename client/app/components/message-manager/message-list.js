import React, { Component } from 'react';
import 'whatwg-fetch';
import MessageManager from './message-manager';

export default class MessageList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoad: true,
      messageLists: [],
      value: '',
    };

    this.addMessageList = this.addMessageList.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleListChange = this.handleListChange.bind(this);
  }

  componentDidMount() {
    fetch('/api/messagelists/')
      .then(res => res.json())
      .then(json => {
        this.setState({
          messageLists: json
        });
      });
  }
  addMessage() {
    let value = this.state.value;
    this.state.value = '';
    fetch(`/api/messagelists/add`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        value: value
      })
    }).then(res => res.json())
      .then(json => {
        let data = this.state.messageLists;
        data.push(json);

        this.setState({
          messageLists: data
        });
      });
  }
  handleListChange(index, event, key) {
    let messageLists = this.state.messageLists.slice(); // Make a copy of the emails first.
    messageLists[index][key] = event.target.value; // Update it with the modified email.
    this.setState({ messageLists: messageLists }); // Update the state.
    this.changeNameCounter(index);
  }
  handleChange(key, event) {
    this.setState({ [key]: event.target.value }); // Update the state.
  }

  render() {
    return (
      <div>
        {this.state.messageLists.map((messageList, i) => (
          <div key={i}>
            <MessageManager id={messageList._id}/>
          </div>
        ))}
        <div>
          <span>
            <input type="text"
              value={this.state.value}
              onChange={this.handleChange.bind(this, 'value')}
              onBlur={this.addMessageList} />
          </span>
        </div>
      </div>
    );
  }
}
