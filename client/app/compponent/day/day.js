import React from 'react';
import TimeForm from './time-form';

export default class Day extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
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