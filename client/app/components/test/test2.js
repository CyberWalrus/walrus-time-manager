import React from "react";
import "./test2.scss";

const getTestFormStyle = (heightlist = []) => {
  return {
    userSelect: `none`,
    display: `grid`,
    height: `100%`,
    gridTemplateRows: ` ${heightlist[0]}px ${heightlist[1]}px ${
      heightlist[2]
    }px`,
    gridTemplateAreas: `"test1" "div" "test2"`,
    width: `300px`,
    background: `red`,
    maxHeight: `600px`
  };
};
const getTestDivStyle = (gridAreaName = ``, color = `orange`) => {
  return {
    gridArea: gridAreaName,
    height: `100%`,
    width: `100%`,
    background: color,
    display: `grid`,
    gridTemplateRows: `20px 1fr 20px`
  };
};
const checkHeiht = (
  heightList = [],
  index = 0,
  isSide = true,
  pointerValue = 0,
  pointerPosition = 0,
  maxHeight = 0,
  minHeightElement = 0
) => {
  const indexSecond = isSide ? index - 1 : index + 1;
  const listNew = heightList.slice();
  let pointerNow = 0;
  if (pointerValue == 0) {
    pointerNow = pointerPosition;
  }
  const valueChange = pointerNow + pointerValue - pointerPosition;
  const heightTotal = listNew[index] + listNew[indexSecond];
  if (isSide) {
    listNew[indexSecond] -= valueChange;
    listNew[index] += valueChange;
  } else {
    listNew[indexSecond] += valueChange;
    listNew[index] -= valueChange;
  }
  if (listNew[index] < minHeightElement) {
    listNew[index] = minHeightElement;
    listNew[indexSecond] = heightTotal - minHeightElement;
  }
  if (listNew[indexSecond] < minHeightElement) {
    listNew[indexSecond] = minHeightElement;
    listNew[index] = heightTotal - minHeightElement;
  }
  return listNew;
};

export default class Test2 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      x: 0,
      y: 0,
      heightList: [200, 200, 200]
    };
    this.divPointerDown = this.divPointerDown.bind(this);
    this.divPointerUp = this.divPointerUp.bind(this);
    this.divPointerMove = this.divPointerMove.bind(this);
    this.divPointerDown2 = this.divPointerDown2.bind(this);
    this.divPointerUp2 = this.divPointerUp2.bind(this);
    this.divPointerMove2 = this.divPointerMove2.bind(this);
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
    this.setState({
      y: 0
    });
  }
  divPointerMove(e) {
    const heightList = checkHeiht(
      this.state.heightList,
      1,
      true,
      this.state.y,
      e.clientY,
      700,
      60
    );
    this.setState({
      y: e.clientY,
      heightList: heightList
    });
  }
  divPointerDown2(e) {
    console.log(`start`);
    window.addEventListener(`pointerup`, this.divPointerUp2);
    window.addEventListener(`pointermove`, this.divPointerMove2);
  }
  divPointerUp2(e) {
    this.setState({
      y: 0
    });
    console.log(`end`);
    window.removeEventListener(`pointerup`, this.divPointerUp2);
    window.removeEventListener(`pointermove`, this.divPointerMove2);
  }
  divPointerMove2(e) {
    const heightList = checkHeiht(
      this.state.heightList,
      1,
      false,
      this.state.y,
      e.clientY,
      700,
      60
    );
    this.setState({
      y: e.clientY,
      heightList: heightList
    });
  }
  render() {
    return (
      <div style={getTestFormStyle(this.state.heightList)}>
        <div style={getTestDivStyle(`test1`)} />
        <div style={getTestDivStyle(`div`, `green`)}>
          <div className="div-top" onPointerDown={this.divPointerDown} />
          {`value: ${this.state.heightList[0]}, y: ${this.state.y}`}
          <div className="div-bot" onPointerDown={this.divPointerDown2} />
        </div>
        <div style={getTestDivStyle(`test2`)} />
      </div>
    );
  }
}
