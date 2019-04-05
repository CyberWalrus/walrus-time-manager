import React, {Component} from 'react';
import 'whatwg-fetch';
import {
  getFromStorage,
  setInStorage,
} from '../../utils/storage';
import {Link} from 'react-router-dom';
import PropTypes from "prop-types";

export default class SignUp extends Component {
  static propTypes = {

    "onChangeProp": PropTypes.func.isRequired

  }
  constructor(props) {

    super(props);
    this.state = {
      "usersession": {},
      "userroles": [],
      "isLoading": false,
      "email": ``,
      "password": ``,
      "confirmPassword": ``,
      "login": ``,
      "firstName": ``,
      "lastName": ``,
      "token": ``,
      "errormessage": ``,
      "isActive": false
    };
    this.handleChange = this.handleChange.bind(this);
    this.onSignUp = this.onSignUp.bind(this);
    this.userSessionValues = this.userSessionValues.bind(this);

  }
  handleChange(key, event) {

    this.setState({[key]: event.target.value}); // Update the state.

  }
  componentDidMount() {

    const obj = getFromStorage(`walrus_app`);
    if (obj && obj.token) {

      const {token} = obj;
      // Verify token
      fetch(`/api/account/verify?token=` + token)
        .then(res => res.json())
        .then(json => {

          if (json.success) {

            this.setState({
              token,
              "isLoading": false
            });

          } else {

            this.setState({
              "isLoading": false,
            });

          }

        });

    } else {

      this.setState({
        "isLoading": false,
      });

    }

  }
  onSignUp() {

    const {
      login,
      email,
      password,
      confirmPassword,
      firstName,
      lastName
    } = this.state;

    if (password !== confirmPassword) {

      return this.setState({
        "errormessage": `bad password`
      });

    }

    this.setState({
      "isLoading": true,
    });

    // Post request to backend
    fetch(`/api/account/signup`, {
      "method": `POST`,
      "headers": {
        'Content-Type': `application/json`
      },
      "body": JSON.stringify({
        "login": login,
        "email": email,
        "password": password,
        "firstName": firstName,
        "lastName": lastName
      }),
    }).then(res => res.json())
      .then(json => {

        if (json.success) {

          setInStorage(`walrus_app`, {"token": json.token});
          this.userSessionValues(json.token);
          this.setState({
            "signInError": json.message,
            "isLoading": false,
            "signInPassword": ``,
            "signInEmail": ``,
            "token": json.token,
          });
          this.props.onChangeProp(true);

        } else {

          this.setState({
            "signInError": json.message,
            "isLoading": false,
          });

        }

      });

  }
  userSessionValues(token) {      // Verify token

    fetch(`/api/app/logincheck?token=` + token)
      .then(res => res.json())
      .then(json => {

        this.setState({
          "usersession": json[0]
        });
        console.log(this.state.usersession.isActive);
        setInStorage(`walrus_session`, {
          "userRole": this.state.usersession.userRole,
          "userLogin": this.state.usersession.userLogin,
          "userId": this.state.usersession.userId,
          "isActive": this.state.usersession.isActive,
        });

      });

  }


  render() {

    if (this.state.isLoading) {

      return (<div><p>Loading...</p></div>);

    }
    return (
      <div className="login-div-main">
        <div className="login-div-content">
          <div className='col-2-3'>Sign Up</div>
          <div className='col-2-3'>{this.state.errormessage}</div>
          <div className='col-2'><p>Login: </p></div>
          <div className='col-3'>
            <input
              type="text"
              placeholder="Login"
              value={this.state.login}
              onChange={this.handleChange.bind(this, `login`)} />
          </div>
          <div className='col-2'><p>Password: </p></div>
          <div className='col-3'>
            <input
              type="password"
              placeholder="Password"
              value={this.state.password}
              onChange={this.handleChange.bind(this, `password`)} />
          </div>
          <div className='col-2'><p>Confirm Password: </p></div>
          <div className='col-3'>
            <input
              type="password"
              placeholder="Confirm Password"
              value={this.state.confirmPassword}
              onChange={this.handleChange.bind(this, `confirmPassword`)} />
          </div>
          <div className='col-2'><p>Email: </p></div>
          <div className='col-3'>
            <input
              type="email"
              placeholder="Email"
              value={this.state.email}
              onChange={this.handleChange.bind(this, `email`)} />
          </div>
          <div className='col-2'><p>First Name: </p></div>
          <div className='col-3'>
            <input
              type="text"
              placeholder="First Name"
              value={this.state.firstName}
              onChange={this.handleChange.bind(this, `firstName`)} />
          </div>
          <div className='col-2'><p>Last Name: </p></div>
          <div className='col-3'>
            <input
              type="text"
              placeholder="LastName"
              value={this.state.lastName}
              onChange={this.handleChange.bind(this, `lastName`)} />
          </div>
          <div className='col-2-3'>
            <button onClick={this.onSignUp}>Sign Up</button>
          </div>
          <div className='col-2-3'>
            <Link to="/login">Login</Link>
          </div>
        </div>
      </div>
    );

  }
}
