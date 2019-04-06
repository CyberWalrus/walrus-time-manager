import React, { Component } from "react";
import "whatwg-fetch";

class UserRoleOptions extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userroles: [],
      name: ``
    };

    this.handleNameListChange = this.handleNameListChange.bind(this);

    this.handleName = this.handleName.bind(this);

    this.createUserRole = this.createUserRole.bind(this);
    this.deletedUserRole = this.deletedUserRole.bind(this);

    this.__modifyUserRole = this.__modifyUserRole.bind(this);
  }

  componentDidMount() {
    fetch(`/api/options/userrole`)
      .then(res => res.json())
      .then(json => {
        this.setState({
          userroles: json
        });
      });
  }
  handleNameListChange(index, event) {
    let userroles = this.state.userroles.slice();
    console.log(event.target); // Make a copy of the emails first.
    userroles[index].name = event.target.value; // Update it with the modified email.
    this.setState({ userroles: userroles }); // Update the state.
    this.changeUserRole(index);
  }
  handleName(event) {
    this.setState({ name: event.target.value }); // Update the state.
  }
  changeUserRole(index) {
    const id = this.state.userroles[index]._id;
    const name = this.state.userroles[index].name;
    // Post request to backend
    fetch(`/api/options/userrole/${id}/change`, {
      method: `POST`,
      headers: {
        "Content-Type": `application/json`
      },
      body: JSON.stringify({
        name: name
      })
    })
      .then(res => res.json())
      .then(json => {
        //this.__modifyUserRole(index, json);
      });
  }

  createUserRole() {
    const name = this.state.name;
    this.state.name = ``;
    // Post request to backend
    fetch(`/api/options/userrole/create`, {
      method: `POST`,
      headers: {
        "Content-Type": `application/json`
      },
      body: JSON.stringify({
        name: name
      })
    })
      .then(res => res.json())
      .then(json => {
        let data = this.state.userroles;
        data.push(json);

        this.setState({
          userroles: data
        });
      });
  }

  onIsDeleted(index) {
    const id = this.state.userroles[index]._id;

    fetch(`/api/options/userrole/${id}/isdeleted`, { method: `PUT` })
      .then(res => res.json())
      .then(json => {
        this.__modifyUserRole(index, json);
      });
  }

  deletedUserRole(index) {
    const id = this.state.userroles[index]._id;

    fetch(`/api/options/userrole/${id}/deleted`, { method: `DELETE` }).then(
      _ => {
        this.__modifyUserRole(index, null);
      }
    );
  }

  __modifyUserRole(index, data) {
    let prevData = this.state.userroles;

    if (data) {
      prevData[index] = data;
    } else {
      prevData.splice(index, 1);
    }

    this.setState({
      userroles: prevData
    });
  }

  render() {
    return (
      <>
        <p>UserRole Options:</p>

        <ul>
          {this.state.userroles.map((userrole, i) => (
            <li key={i}>
              <span>
                <input
                  type="text"
                  value={userrole.name}
                  onChange={this.handleNameListChange.bind(this, i)}
                />
              </span>
              <span>{userrole.isActive.toString()}</span>
              <button onClick={() => this.onIsDeleted(i)}>-</button>
              <button onClick={() => this.deletedUserRole(i)}>x</button>
            </li>
          ))}
        </ul>

        <div>
          <span>
            <input
              type="text"
              value={this.state.name}
              onChange={this.handleName}
            />
          </span>
          <button onClick={this.createUserRole}>add</button>
        </div>
      </>
    );
  }
}

export default UserRoleOptions;
