import React from "react";
import TimeForm from "./time-form";
import "./day.scss";

export default class Day extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      days: [],
      tasklist: [],
      times: [],
      day: new Date().toISOString().substring(0, 10),
      timeInterval: 1
    };
    this.dayAdd = this.dayAdd.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.timeUpdate = this.timeUpdate.bind(this);
    this.newTime = this.newTime.bind(this);
  }
  componentDidMount() {
    let tasklist = [];

    fetch(`/api/tasklist`)
      .then(res => res.json())
      .then(json => {
        tasklist = json;
      })
      .then(() => {
        fetch(`/api/day`)
          .then(res => res.json())
          .then(json => {
            this.setState({
              days: json,
              times: json[0].times,
              tasklist: tasklist
            });
          });
      });
  }
  dayAdd(event) {
    let date = new Date(this.state.day).getTime();
    fetch(`/api/day`, {
      method: `POST`,
      headers: {
        "Content-Type": `application/json`
      },
      body: JSON.stringify({
        date: date
      })
    })
      .then(res => res.json())
      .then(json => {
        let data = this.state.days;
        data.push(json);

        this.setState({
          days: data
        });
      });
  }
  handleChange(key, event) {
    this.setState({ [key]: event.target.value });
  }
  timeUpdate(value = this.state.times) {
    fetch(`/api/day/${this.state.days[0]._id}/change-time`, {
      method: `POST`,
      headers: {
        "Content-Type": `application/json`
      },
      body: JSON.stringify({
        timesNew: value
      })
    })
      .then(res => res.json())
      .then(json => {
        const days = this.state.days.slice();
        days[0] = json;
        this.setState({
          days: days,
          times: json.times
        });
      });
  }
  newTime() {
    const timeStart = 3600000;
    const addTime = 600000;
    const times = this.state.times.slice();
    times.splice(0, 0, {
      timeStart: timeStart,
      duration: addTime
    });
    times.sort((a, b) => {
      return a.timeStart - b.timeStart;
    });
    this.timeUpdate(times);
  }
  render() {
    return (
      <div className="day-page">
        <div className="day-controle">
          <div className="day-controle_flex">
            <input type="date" value={this.state.day} />
          </div>
          <div className="day-controle_flex">
            <input
              type="number"
              value={this.state.timeInterval}
              onInput={this.handleChange.bind(this, `timeInterval`)}
              pattern="[1-9]*"
            />
          </div>
          <div className="day-controle_flex">
            <button onClick={this.dayAdd}>+</button>
            <button onClick={this.dayAdd}>+</button>
          </div>
        </div>
        <div className="day-form">
          <div className="day-form_grid">
            {this.state.times[0] ? (
              this.state.times.map((time, i) => (
                <TimeForm
                  time={time}
                  times={this.state.times}
                  index={i}
                  timeUpdate={this.timeUpdate}
                  dayId={this.state.days[0]._id}
                  tasklist={this.state.tasklist}
                  key={i}
                />
              ))
            ) : (
              <> Pusto </>
            )}
          </div>
        </div>
      </div>
    );
  }
}
