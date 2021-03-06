import React, { Component } from "react";
import "whatwg-fetch";
import PropTypes from "prop-types";

class DropDownUserRole extends Component {
  static propTypes = {
    onChangeProp: PropTypes.func.isRequired,
    value: PropTypes.string.isRequired
  };
  constructor(props) {
    super(props);

    this.state = {
      userroles: [],
      value: this.props.value
    };
    this.handleChange = this.handleChange.bind(this);
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
  handleChange(e) {
    // assuming you initialized the default state to hold selected values
    this.setState({
      value: [].slice.call(e.target.selectedOptions).map(o => {
        return o.value;
      })
    });
    this.props.onChangeProp(
      [].slice.call(e.target.selectedOptions).map(o => {
        return o.value;
      })
    );
  }
  render() {
    return (
      <select
        value={this.state.value}
        onChange={this.handleChange.bind(this)}
        multiple={true}
      >
        {this.state.userroles.map((userrole, idx) => (
          <option key={idx} value={userrole._id}>
            {userrole.name}
          </option>
        ))}
      </select>
    );
  }
}

export default DropDownUserRole;
