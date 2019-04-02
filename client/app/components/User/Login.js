import React, {Component} from 'react';
import 'whatwg-fetch';
import {
  getFromStorage,
  setInStorage,
} from '../../utils/storage';
import {Link, Redirect} from 'react-router-dom';

export default class Login extends Component {
  constructor(props) {

    super(props);
    this.state = {
      "usersession": {},
      "userroles": [],
      "isLoading": false,
      "email": ``,
      "password": ``,
      "token": ``,
      "isActive": false
    };
    this.handleChange = this.handleChange.bind(this);
    this.userSessionValues = this.userSessionValues.bind(this);
    this.onSignIn = this.onSignIn.bind(this);
    this.logout = this.logout.bind(this);
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
  onSignIn() {

    // Grab state
    const {
      email,
      password,
    } = this.state;

    this.setState({
      "isLoading": true,
    });

    // Post request to backend
    fetch(`/api/account/signin`, {
      "method": `POST`,
      "headers": {
        'Content-Type': `application/json`
      },
      "body": JSON.stringify({
        "email": email,
        "password": password,
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
          this.props.onChange(true);

        } else {

          this.setState({
            "signInError": json.message,
            "isLoading": false,
          });

        }

      });

  }
  logout() {

    this.setState({
      "isLoading": true,
    });
    const obj = getFromStorage(`walrus_app`);
    if (obj && obj.token) {

      const {token} = obj;
      // Verify token
      fetch(`/api/account/logout?token=` + token)
        .then(res => res.json())
        .then(json => {

          if (json.success) {

            this.setState({
              "token": ``,
              "isLoading": false
            });

            this.props.onChange(false);

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
    setInStorage(`walrus_app`, null);
    setInStorage(`walrus_session`, null);

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
  onSignUp() {

    return <Redirect to="/signup" />;

  }


  render() {

    if (this.state.isLoading) {

      return (<div><p>Loading...</p></div>);

    }

    if (!this.state.token) {

      return (
        <div className="login-panel">
          <div className='login-panel__div login-panel__div-col-all login-panel__div-head'>Sign In</div>
          <div className='login-panel__input login-panel__div-col-2'>
            <span>
              <label>Login/Email:</label>
              <input
                type="text"
                placeholder="Email"
                value={this.state.email}
                onChange={this.handleChange.bind(this, `email`)} />
            </span>
          </div>
          <div className='login-panel__div login-panel__div-col-2'><p>Password: </p></div>
          <div className='login-panel__div login-panel__div-col-2'>
            <input
              className="login-panel__input"
              type="password"
              placeholder="Password"
              value={this.state.password}
              onChange={this.handleChange.bind(this, `password`)} />
          </div>
          <div className='login-panel__div login-panel__div-col-2'>
            <button onClick={this.onSignIn}>Sign In</button>
          </div>
          <div className='login-panel__div login-panel__div-col-2-3'>
            <Link to="/signup" className='login-panel__signin'>Sign Up</Link>
          </div>
        </div>
      );

    }


    return (
      <div>
        <p>Account</p>
        <button onClick={this.logout}>Logout</button>
      </div>
    );

  }
}
