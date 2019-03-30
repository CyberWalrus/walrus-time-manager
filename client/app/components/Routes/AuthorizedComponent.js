import React from "react";
import {Route} from "react-router-dom";
import PropTypes from 'prop-types';

export default class AuthenticatedRoute extends React.Component {
  render() {
    if (!this.props.isLoggedIn) {
      this.props.redirectToLogin()
      return null
    }
    return <Route {...this.props} />
  }
}

AuthenticatedRoute.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  component: PropTypes.element,
  redirectToLogin: PropTypes.func.isRequired
}