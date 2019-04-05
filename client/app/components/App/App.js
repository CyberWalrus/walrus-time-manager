import React, {Component} from "react";

import Menu from '../header/menu';
import Footer from '../footer/footer';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  Redirect
} from 'react-router-dom';
import NotFound from './not-found';

import Home from '../home/home';

import HelloWorld from '../HelloWorld/hello-world';
import Login from '../User/login';
import Day from "../day/day";
import SignUp from '../User/sign-up';
import MenuOptions from '../options/menu-options';
import UserRoleOptions from '../options/user-role-options';
import UserOptions from '../options/user-options';
import PrivateRoute from '../routes/private-route';
import MessageManager from '../message-manager/message-manager';
import TestPage from '../test/test';
import {
  getFromStorage,
  setInStorage,
} from '../../utils/storage';
import {IntlProvider, FormattedMessage} from 'react-intl';

export default class App extends React.Component {
  constructor(props) {

    super(props);
    this.state = {
      "usersession": {},
      "userroles": [],
      "isLoadingMenu": true,
      "isLoadingRole": true,
      "isLoadingLogin": true,
      "token": ``,
      "isActive": false,
      "menus": [],
      "isOffline": false,
    };
    this.userSessionValues = this.userSessionValues.bind(this);
    this.checkMenuRole = this.checkMenuRole.bind(this);
    this.handleActive = this.handleActive.bind(this);

  }
  componentDidMount() {

    if (!this.state.isOffline) {

      this.userSessionValues();
      fetch(`/api/app/userroles`)
        .then(res => res.json())
        .then(json => {

          if (json.success) {

            this.setState({
              "userroles": json.userroles,
              "isLoadingRole": false
            });

          }

        });
      fetch(`/api/app/menu`)
        .then(res => res.json())
        .then(json => {

          if (json.success) {

            this.setState({
              "menus": json.menus,
              "isLoadingMenu": false
            });

          }

        });

    } else {

      this.setState({
        "isLoadingMenu": false,
        "isLoadingRole": false,
        "isLoadingLogin": false
      });

    }

  }
  userSessionValues() {

    const obj = getFromStorage(`walrus_app`);
    if (obj && obj.token) {

      const {token} = obj;
      // Verify token
      fetch(`/api/app/logincheck?token=` + token)
        .then(res => res.json())
        .then(json => {

          this.setState({
            "usersession": json[0],
            "isLoadingLogin": false,
          });
          setInStorage(`walrus_session`, {
            "userRole": this.state.usersession.userRole,
            "userLogin": this.state.usersession.userLogin,
            "userId": this.state.usersession.userId,
            "isActive": this.state.usersession.isActive,
          });

        });

    } else {

      this.setState({"isLoadingLogin": false, });

    }

  }
  checkMenuRole(value) {

    let obj = {};
    let array = [];
    if (this.state.menus.length > 1) {

      obj = this.state.menus.find(x => x.url === value);

    }
    if (obj && this.state.usersession) {

      array = obj.userRole;
      if (!array) {

        return true;

      }
      for (let i = 0; i < array.length; i++) {

        if (this.state.usersession.userRole.find(x => x === array[i])) {

          return true;

        }

      }

    }
    return false;

  }
  handleActive(value) {

    this.setState({
      "isActive": value
    });

  }
  render() {

    console.log(this.state.isLoadingLogin, this.state.isLoadingMenu, this.state.isLoadingRole);
    if (this.state.isLoadingLogin || this.state.isLoadingMenu || this.state.isLoadingRole) {

      return (<div><p>Loading...</p></div>);

    } else {

      //console.log(getFromStorage('walrus_session'));
      this.state.usersession = getFromStorage(`walrus_session`);
      if (this.state.usersession) {

        this.state.isActive = this.state.usersession.isActive;

      }
      if (!this.state.isActive) {

        return (
          <div className="login-div">
            <Switch>
              <Route path="/login"><Login onChangeProp={this.handleActive.bind(this)} /></Route>
              <Route path="/signup" component={SignUp} />
              <Route render={() => (
                <Redirect to="/login" />
              )} />
            </Switch>
          </div>

        );

      }
      return (
        <div className="base-div">
          <div className="base-div-header">
            <Menu />
          </div>
          <main className="base-div-main">
            <Switch>
              <PrivateRoute exact path="/" component={Home} isAuthenticated={this.state.isActive} isRole={this.checkMenuRole(`/`)} />
              <PrivateRoute path="/helloworld" component={HelloWorld} isAuthenticated={this.state.isActive} isRole={this.checkMenuRole(`/helloworld`)} />
              <PrivateRoute path="/day" component={Day} isAuthenticated={this.state.isActive} isRole={this.checkMenuRole(`/day`)} />
              <PrivateRoute path="/options/menu" component={MenuOptions} isAuthenticated={this.state.isActive} isRole={this.checkMenuRole(`/options/menu`)} />
              <PrivateRoute path="/options/user" component={UserOptions} isAuthenticated={this.state.isActive} isRole={this.checkMenuRole(`/options/user`)} />
              <PrivateRoute path="/options/userrole" component={UserRoleOptions} isAuthenticated={this.state.isActive} isRole={this.checkMenuRole(`/options/userrole`)} />
              <PrivateRoute path="/message/:id" component={MessageManager} isAuthenticated={this.state.isActive} isRole={this.checkMenuRole(`/message`)} />
              <PrivateRoute path="/test" component={TestPage} isAuthenticated={this.state.isActive} isRole={this.checkMenuRole(`/test`)} />

              <Route path="/login"><Login onChangeProp={this.handleActive.bind(this)} /></Route>
              <Route path="/signup" component={SignUp} />
              <Route render={() => (
                !this.state.isActive ? (
                  <Redirect to="/login" />
                ) : (
                  <NotFound />
                )
              )} />
            </Switch>
          </main>
        </div>
      );

    }

  }
}
