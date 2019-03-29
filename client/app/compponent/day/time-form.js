import React from 'react';
import CaseForm from './case-form';
import './time-form.scss';

export default class TimeForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      time: this.props.time,
      text: this.props.text
    }
  }
  render() {
    return (
      <div className="time-form">
        <div className="time-form__time">
          {this.state.time}
        </div>
        <div className="time-form_item">
          <CaseForm title="test"/>
        </div>
      </div>
    );
  }
}