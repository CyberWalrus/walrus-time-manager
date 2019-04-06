import React from "react";
import {
  names,
  getAuthData
} from "../../../common/helpers/storage/authStorageHelper";
import _ from "lodash";

class RoleAwareComponent extends React.Component {
  constructor(props) {
    super(props);
    this.authorize = [];
  }

  shouldBeVisible() {
    const user = JSON.parse(localStorage.getItem(`user`));
    if (user) {
      return _.intersection(this.authorize, user.roles).length > 0;
    }

    return false;
  }
}

export default RoleAwareComponent;
