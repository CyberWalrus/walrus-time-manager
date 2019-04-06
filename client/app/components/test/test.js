import React from "react";

export default class TestPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      days: [],
      text: `test`
    };
  }

  componentDidMount() {
    const canvas = this.refs.canvas;
    const ctx = canvas.getContext(`2d`);
    ctx.fillRect(25, 25, 100, 100);
    ctx.clearRect(45, 45, 60, 60);
    ctx.strokeRect(50, 50, 50, 50);
  }

  render() {
    return (
      <div>
        <canvas ref={`canvas`} width={200} height={400} />
      </div>
    );
  }
}
