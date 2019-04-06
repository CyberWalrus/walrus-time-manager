import React from "react";
import TaskForm from "./task-form";
import { msToString } from "../../utils/storage";
import PropTypes from "prop-types";
import "./time-form.scss";

export default class TimeForm extends React.Component {
  static propTypes = {
    dayId: PropTypes.string.isRequired,
    tasklist: PropTypes.array.isRequired,
    times: PropTypes.array.isRequired,
    timeUpdate: PropTypes.func.isRequired,
    index: PropTypes.number.isRequired
  };
  constructor(props) {
    super(props);
    this.state = {
      time: this.props.times[this.props.index],
      dayId: this.props.dayId,
      tasklist: this.props.tasklist
    };
    this.addTime = this.addTime.bind(this);
    this.removeTime = this.removeTime.bind(this);
    this.deleteTime = this.deleteTime.bind(this);
    this.newTime = this.newTime.bind(this);
  }
  componentDidMount() {}
  addTime() {
    const times = this.props.times.slice();
    times.map((item, index) => {
      if (this.props.index <= index) {
        item.timeStart += 600000;
      }
    });

    this.props.timeUpdate(times);
  }

  removeTime() {
    const times = this.props.times.slice();
    times.map((item, index) => {
      if (this.props.index <= index) {
        item.timeStart -= 600000;
      }
    });

    this.props.timeUpdate(times);
  }

  deleteTime() {
    const times = this.props.times.slice();
    times.splice(this.props.index, 1);

    this.props.timeUpdate(times);
  }

  newTime() {
    const addTime = 600000;
    const times = this.props.times.slice();
    times.splice(this.props.index, 0, {
      timeStart:
        this.props.times[this.props.index].timeStart +
        this.props.times[this.props.index].duration,
      duration: addTime
    });
    times.sort((a, b) => {
      return a.timeStart - b.timeStart;
    });
    console.log(times);
    this.props.timeUpdate(times);
  }
  render() {
    let nextDay = ``;
    if (this.props.times[this.props.index].timeStart >= 36000000) {
      nextDay = `next day `;
    }
    const timeText = `${nextDay}${msToString(
      this.props.times[this.props.index].timeStart
    )} - ${msToString(
      this.props.times[this.props.index].timeStart +
        this.props.times[this.props.index].duration
    )}`;
    return (
      <div className="time-form">
        <div className="time-form__time">
          {timeText}
          <button onClick={this.addTime}>+</button>
          <button onClick={this.removeTime}>-</button>
          <button onClick={this.deleteTime}>d</button>
          <button onClick={this.newTime}>n</button>
        </div>
        <div className="time-form_item">
          <TaskForm
            time={this.state.time}
            dayId={this.state.dayId}
            tasklist={this.state.tasklist}
          />
        </div>
      </div>
    );
  }
}
