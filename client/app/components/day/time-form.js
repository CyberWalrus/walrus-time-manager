import React from "react";
import TaskForm from "./task-form";
import {msToString} from "../../utils/storage";
import PropTypes from "prop-types";
import "./time-form.scss";

export default class TimeForm extends React.Component {
  static propTypes = {

    "dayId": PropTypes.string.isRequired,
    "tasklist": PropTypes.array.isRequired,
    "times": PropTypes.array.isRequired,
    "timeUpdate": PropTypes.func.isRequired,
    "index": PropTypes.number.isRequired

  }
  constructor(props) {

    super(props);
    this.state = {
      "time": this.props.times[this.props.index],
      "dayId": this.props.dayId,
      "tasklist": this.props.tasklist,
      "times": this.props.times,
      "index": this.props.index
    };
    this.addTime = this.addTime.bind(this);
    this.removeTime = this.removeTime.bind(this);
    this.deleteTime = this.deleteTime.bind(this);
    this.newTime = this.newTime.bind(this);

  }
  componentDidMount() {

    this.setState({
      "times": this.props.times,
    });

  }
  addTime() {

    const times = this.state.times.slice();
    times.map((item, index) => {

      if (this.state.index <= index) {

        item.timeStart += 600000;
        item.timeEnd += 600000;

      }

    });

    this.props.timeUpdate(times);

  }

  removeTime() {

    const times = this.state.times.slice();

    this.props.timeUpdate(times);

  }

  deleteTime() {

    const times = this.props.times.slice();
    times.splice(this.state.index, 1);

    this.props.timeUpdate(times);

  }

  newTime() {

    const times = this.state.times.slice();
    times.map((item, index) => {

      item.timeStart += 600000;
      item.timeEnd += 600000;

    });

    this.props.timeUpdate(times);

  }
  render() {

    const timeText = msToString(this.props.times[this.props.index].timeStart);
    return (
      <div className="time-form">
        <div className="time-form__time">
          {timeText}
          <button onClick={this.addTime}>+</button>
          <button>-</button>
          <button onClick={this.deleteTime}>d</button>
          <button>n</button>
        </div>
        <div className="time-form_item">
          <TaskForm time={this.state.time} dayId={this.state.dayId} tasklist={this.state.tasklist} />
        </div>
      </div>
    );

  }
}
