import React, {Component} from "react";
import "whatwg-fetch";
import DropDownUserRole from "../drop-down/drop-down-user-role";

class UserOptions extends Component {
  constructor(props) {

    super(props);

    this.state = {
      "users": [],
      "login": ``,
      "firstName": ``,
      "lastName": ``,
      "email": ``,
      "password": ``,
      "userRole": []
    };

    this.handleListChange = this.handleListChange.bind(this);
    this.handleUserRoleListChange = this.handleUserRoleListChange.bind(this);

    this.handleChange = this.handleChange.bind(this);
    this.handleUserRole = this.handleUserRole.bind(this);

    this.createUser = this.createUser.bind(this);
    this.deletedUser = this.deletedUser.bind(this);

    this.__modifyUser = this.__modifyUser.bind(this);

  }

  componentDidMount() {

    fetch(`/api/options/user`)
      .then(res => res.json())
      .then(json => {

        this.setState({
          "users": json
        });

      });

  }
  handleListChange(index, key, event) {

    let users = this.state.users.slice(); // Make a copy of the emails first.
    users[index][key] = event.target.value; // Update it with the modified email.
    this.setState({"users": users}); // Update the state.
    this.changeUser(index);

  }
  handleUserRoleListChange(index, value) {

    let users = this.state.users.slice(); // Make a copy of the emails first.
    users[index].userRole = value; // Update it with the modified email.
    this.setState({"users": users}); // Update the state.
    this.changeUser(index);

  }
  handleChange(key, event) {

    this.setState({[key]: event.target.value}); // Update the state.

  }
  handleUserRole(value) {

    this.setState({"userRole": value}); // Update the state.

  }

  changeUser(index) {

    const id = this.state.users[index]._id;
    const user = this.state.users[index];
    // Post request to backend
    fetch(`/api/options/user/${id}/change`, {
      "method": `POST`,
      "headers": {
        'Content-Type': `application/json`
      },
      "body": JSON.stringify({
        "user": user
      }),
    })
      .then(res => res.json())
      .then(json => {

        this.__modifyUser(index, json);

      });

  }

  createUser() {

    const label = this.state.label;
    const url = this.state.url;
    const idx = this.state.newindex;
    const userRoleId = this.state.userRoleId;
    this.setState({
      "label": ``,
      "url": ``,
      "newindex": ``
    });
    // Post request to backend
    fetch(`/api/options/user/create`, {
      "method": `POST`,
      "headers": {
        'Content-Type': `application/json`
      },
      "body": JSON.stringify({
        "label": label,
        "url": url,
        "idx": idx,
        "userRoleId": userRoleId
      }),
    }).then(res => res.json())
      .then(json => {

        let data = this.state.users;
        data.push(json);

        this.setState({
          "users": data
        });

      });

  }

  onIsDeleted(index) {

    const id = this.state.users[index]._id;

    fetch(`/api/options/user/${id}/isdeleted`, {"method": `PUT`})
      .then(res => res.json())
      .then(json => {

        this.__modifyUser(index, json);

      });

  }

  deletedUser(index) {

    const id = this.state.users[index]._id;

    fetch(`/api/options/user/${id}/deleted`, {"method": `DELETE`})
      .then(_ => {

        this.__modifyUser(index, null);

      });

  }

  __modifyUser(index, data) {

    let prevData = this.state.users;

    if (data) {

      prevData[index] = data;

    } else {

      prevData.splice(index, 1);

    }

    this.setState({
      "users": prevData
    });

  }

  render() {

    return (
      <>
        <p>User Options:</p>

        <ul>
          {this.state.users.map((user, i) => (
            <li key={i}>
              <span>
                <input type="text"
                  value={user.nickName}
                  onChange={this.handleListChange.bind(this, i, `nickName`)} />
              </span>
              <span>
                <input type="text"
                  value={user.login}
                  onChange={this.handleListChange.bind(this, i, `login`)} />
              </span>
              <span>
                <input type="text"
                  value={user.firstName}
                  onChange={this.handleListChange.bind(this, i, `firstName`)} />
              </span>
              <span>
                <input type="text"
                  value={user.lastName}
                  onChange={this.handleListChange.bind(this, i, `lastName`)} />
              </span>
              <span>
                <input type="text"
                  value={user.email}
                  onChange={this.handleListChange.bind(this, i, `email`)} />
              </span>
              <span>
                <DropDownUserRole value={user.userRole} onChangeProp={this.handleUserRoleListChange.bind(this, i)} />
              </span>
              <span>{user.isActive.toString()}</span>
              <button onClick={() => this.onIsDeleted(i)}>Active</button>
              <button onClick={() => this.deletedUser(i)}>Deleted</button>
            </li>
          ))}
        </ul>

        <div>
          <span>
            <input type="text"
              value={this.state.login}
              onChange={this.handleChange.bind(this, `login`)} />
          </span>
          <span>
            <input type="text"
              value={this.state.firstName}
              onChange={this.handleChange.bind(this, `firstName`)} />
          </span>
          <span>
            <input type="text"
              value={this.state.lastName}
              onChange={this.handleChange.bind(this, `lastName`)} />
          </span>
          <span>
            <input type="text"
              value={this.state.email}
              onChange={this.handleChange.bind(this, `email`)} />
          </span>
          <span>
            <input type="text"
              value={this.state.password}
              onChange={this.handleChange.bind(this, `password`)} />
          </span>
          <span>
            <DropDownUserRole value={this.state.userRoleId} onChangeProp={this.handleUserRole.bind(this)} />
          </span>
          <button onClick={this.createUser}>add</button>
        </div>
      </>
    );

  }
}

export default UserOptions;
