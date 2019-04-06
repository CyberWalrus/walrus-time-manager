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
    fetch(`/api/day`)
      .then(res => res.json())
      .then(json => {
        this.setState({
          days: json
        });
      })
      .then(() => {
        this.setState({
          text: `test`
        });
      });
  }

  render() {
    return (
      <>
        {this.state.text}
        {this.state.days[0] ? (
          this.state.days.map((day, i) => (
            <div key="i">{JSON.stringify(day)}</div>
          ))
        ) : (
          <> </>
        )}
      </>
    );
  }
}
