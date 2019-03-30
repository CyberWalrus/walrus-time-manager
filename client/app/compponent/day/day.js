import React from 'react';
import TimeForm from './time-form';

export default class Day extends React.Component {
  constructor(props) {
    super(props);
    this.state ={
      days: [],
      day: new Date().toISOString().substring(0,10)
    }
    this.dayAdd = this.dayAdd.bind(this)
  }
  dayAdd(event) {
    let date = new Date(this.state.day);
    fetch(`/api/day`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        date: date
      })
    }).then(res => res.json())
      .then(json => {
        let data = this.state.days;
        data.push(json);

        this.setState({
          days: data
        });
      });
  }
  render() {
    return (
      <div>
        <input type="date" value={this.state.day}/>
        <button onClick={this.dayAdd} >+</button>
        {(() => {
          const timeForms = [];
          for (let i = 0; i <= 23; i++) {
            let date = new Date(null);
            date.setHours(i);
            const time = date.toLocaleTimeString().replace(/([\d]+:[\d]{2})(:[\d]{2})(.*)/, "$1$3")
            timeForms.push(
              <TimeForm time={time} text={i} key={i}></TimeForm>
            )
          }
          return timeForms;
        })()}
      </div>
    );
  }
}