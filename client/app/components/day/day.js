import React from "react";
import TimeForm from "./time-form";
import "./day.scss";

export default class Day extends React.Component {
  constructor(props) {

    super(props);
    this.state = {
      "days": [],
      "day": new Date().toISOString().substring(0, 10),
      "timeInterval": 1,
    };
    this.dayAdd = this.dayAdd.bind(this);
    this.handleChange = this.handleChange.bind(this);

  }
  componentDidMount() {

    fetch(`/api/day`)
      .then(res => res.json())
      .then(json => {

        this.setState({
          "days": json
        });

      });

  }
  dayAdd(event) {

    let date = new Date(this.state.day).getTime();
    fetch(`/api/day`, {
      "method": `POST`,
      "headers": {
        'Content-Type': `application/json`
      },
      "body": JSON.stringify({
        "date": date
      })
    }).then(res => res.json())
      .then(json => {

        let data = this.state.days;
        data.push(json);

        this.setState({
          "days": data
        });

      });

  }
  handleChange(key, event) {

    this.setState({[key]: event.target.value});

  }
  render() {

    console.log(this.state.days);
    return (
      <>
        <input type="date" value={this.state.day} />
        <input type="number" value={this.state.timeInterval} onInput={this.handleChange.bind(this, `timeInterval`)} pattern="[1-9]*" />
        <button onClick={this.dayAdd} >+</button>
        <div className="day-form">
          {this.state.days[0] ? this.state.days[0].times.map((time, i) => (
            <TimeForm time={time} dayId={this.state.days[0]._id} text={i} key={i}></TimeForm>
          )) : <> </>}
        </div>
      </>
    );

  }
}
