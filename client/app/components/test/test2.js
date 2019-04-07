import React from "react";
import "./test2.scss";

const getTestFormStyle = height => ({
  userSelect: `none`,
  display: `grid`,
  height: `100%`,
  gridTemplateRows: `1fr ${height}px`,
  gridTemplateAreas: `"test1" "div"`,
  width: `400px`,
  background: `red`,
  maxHeight: `700px`
});
const getTestDivStyle = () => ({
  gridArea: `div`,
  height: `100%`,
  width: `100%`,
  background: `green`
});

export default class Test2 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      x: 0,
      y: 0,
      value: 100
    };
    this.divPointerDown = this.divPointerDown.bind(this);
    this.divPointerUp = this.divPointerUp.bind(this);
    this.divPointerMove = this.divPointerMove.bind(this);
  }

  divPointerDown(e) {
    console.log(`start`);
    window.addEventListener(`pointerup`, this.divPointerUp);
    window.addEventListener(`pointermove`, this.divPointerMove);
  }
  divPointerUp(e) {
    console.log(`end`);
    window.removeEventListener(`pointerup`, this.divPointerUp);
    window.removeEventListener(`pointermove`, this.divPointerMove);
  }
  divPointerMove(e) {
    let yNow = 0;

    if (this.state.y == 0) {
      yNow = e.clientY;
    }
    this.setState({
      y: e.clientY,
      value: this.state.value + (yNow + this.state.y - e.clientY)
    });
  }
  render() {
    return (
      <div style={getTestFormStyle(this.state.value)}>
        <div
          style={getTestDivStyle()}
          onPointerDown={this.divPointerDown}
        >{`value: ${this.state.value}, y: ${this.state.y}`}</div>
      </div>
    );
  }
}
