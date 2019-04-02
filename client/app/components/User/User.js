import React from 'react';
import 'whatwg-fetch';

class User extends React.Component {
  constructor(props) {

    super(props);
    this.state = {
      "users": [],
      "signUpLogin": ``,
      "signUpEmail": ``,
      "signUpPassword": ``,
      "signUpPasswordre": ``,
      "signUpFirstName": ``,
      "signUpLastName": ``
    };
    this.componentDidMount = this.componentDidMount.bind(this);
    this.newUser = this.newUser.bind(this);

  }
  componentDidMount() {

    fetch(`/api/users`)
      .then(res => res.json())
      .then(json => {

        this.setState({
          "users": json
        });

      });

  }
  newUser() {

    const {
      signUpLogin,
      signUpEmail,
      signUpPassword,
      signUpPasswordre,
      signUpFirstName,
      signUpLastName} = this.state;
    this.state.signUpLogin = ``;
    this.state.signUpEmail = ``;
    this.state.signUpPassword = ``;
    this.state.signUpPasswordre = ``;
    this.state.signUpFirstName = ``;
    this.state.signUpLastName = ``;
    fetch(`/api/useradd`, {
      "method": `POST`,
      "headers": {
        'Content-Type': `application/json`
      },
      "body": JSON.stringify({
        "login": signUpLogin,
        "password": signUpPassword,
        "passwordre": signUpPasswordre,
        "email": signUpEmail,
        "firstName": signUpFirstName,
        "lastName": signUpLastName
      })
    }).then(res => res.json())
      .then(json => {

        let data = this.state.users;
        data.push(json);

        this.setState({
          "users": data
        });

      });

  }

  render() {

    return (
      <div>
        <div>
          <input type="text"
            placeholder="Login"
            value={this.state.signUpLogin}
            onChange={(e) => this.setState({"signUpLogin": e.target.value})} />
        </div>
        <div>
          <input
            placeholder="Password"
            type="password"
            value={this.state.signUpPassword}
            onChange={(e) => this.setState({"signUpPassword": e.target.value})} />
        </div>
        <div>
          <input
            placeholder="Password"
            type="password"
            value={this.state.signUpPasswordre}
            onChange={(e) => this.setState({"signUpPasswordre": e.target.value})} />
        </div>
        <div>
          <input type="text"
            placeholder="Email"
            value={this.state.signUpEmail}
            onChange={(e) => this.setState({"signUpEmail": e.target.value})} />
        </div>
        <div>
          <input type="text"
            placeholder="First Name"
            value={this.state.signUpFirstName}
            onChange={(e) => this.setState({"signUpFirstName": e.target.value})} />
        </div>
        <div>
          <input type="text"
            placeholder="Last Name"
            value={this.state.signUpLastName}
            onChange={(e) => this.setState({"signUpLastName": e.target.value})} />
        </div>
        <div>
          <button onClick={this.newUser}>New User</button>
        </div>
        <p>Users:</p>

        <ul>
          {this.state.users.map((user, i) => (
            <li key={i}>
              <span>{user.login} </span>
              <span>{user.email} </span>
              <span>{user.password} </span>
            </li>
          ))}
        </ul>
      </div>
    );

  }
}

export default User;
