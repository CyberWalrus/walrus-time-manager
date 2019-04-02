import React from 'react';
import PropTypes from 'prop-types';
import TaskForm from './task-form';
import {msToString} from '../../utils/storage';
import './time-form.scss';

export default class TimeForm extends React.Component {
  static propTypes = {
    "time": Object,
    "text": null
  }
  constructor(props) {

    super(props);
    this.state = {
      "time": this.props.time,
      "text": this.props.text,
    };

  }
  render() {

    const time = this.state.time;
    return (
      <div className="time-form">
        <div className="time-form__time">
          {msToString(time.timeStart)}
        </div>
        <div className="time-form_item">
          <TaskForm taskId={time.taskId} />
        </div>
      </div>
    );

  }
}
