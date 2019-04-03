import React from 'react';
import TaskForm from './task-form';
import {msToString} from '../../utils/storage';
import './time-form.scss';

export default class TimeForm extends React.Component {
  constructor(props) {

    super(props);
    this.state = {
      "time": this.props.time,
      "dayId": this.props.dayId,
      "tasklist": this.props.tasklist
    };

  }
  componentDidMount() {

  }
  render() {
    return (
      <div className="time-form">
        <div className="time-form__time">
          {msToString(this.state.time.timeStart)}
        </div>
        <div className="time-form_item">
          <TaskForm time={this.state.time} dayId={this.state.dayId} tasklist={this.state.tasklist} />
        </div>
      </div>
    );

  }
}
