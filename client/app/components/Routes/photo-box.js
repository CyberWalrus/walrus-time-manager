import React from "react";
import RoleAwareComponent from "../../../shared/authorization/RoleAwareComponent.react";

class PhotoBox extends RoleAwareComponent {
  constructor(props) {
    super(props);

    // component will be visible for the roles below:
    this.authorize = [`employee`];
  }

  render() {
    const jsx = (
      <div className="pure-u-13-24 box photo-box">
        <div className="box-wrapper">
          <h1>Your photo</h1>
          <img src="http://some.url/img1.jpg" />
        </div>
      </div>
    );

    return this.shouldBeVisible() ? jsx : null;
  }
}

export default PhotoBox;
