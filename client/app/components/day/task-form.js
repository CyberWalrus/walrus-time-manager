import React from "react";
import PropTypes from "prop-types";
import "./task-form.scss";

export default class TaskForm extends React.Component {
  static propTypes = {

    "time": PropTypes.object.isRequired,
    "dayId": PropTypes.string.isRequired,
    "tasklist": PropTypes.array.isRequired,

  }

  constructor(props) {

    super(props);
    this.state = {
      "tasklist": this.props.tasklist,
      "time": this.props.time,
      "taskId": this.props.time.taskId,
      "tasklistId": ``,
      "task": {},
      "id": ``,
      "listOpen": false,
      "headerTitle": ``,
      "valueInput": ``,
      "dayId": this.props.dayId
    };
    this.toggleList = this.toggleList.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);
    this.inputChange = this.inputChange.bind(this);
    this.itemClick = this.itemClick.bind(this);
    this.inputAccept = this.inputAccept.bind(this);
    this.itemDelete = this.itemDelete.bind(this);

  }

  componentDidMount() {

    if (this.state.taskId != null) {


      fetch(`/api/task/${this.state.taskId}`)
        .then(res => res.json())
        .then(json => {

          this.setState({
            "task": json
          });
          try {

            const value = this.state.tasklist.find((element, index, array) => {

              return element._id == this.state.task.tasklistId;

            });
            this.setState({
              "valueInput": value.name
            });

          } catch (err) {

            err;

          }

        });

    } else {

      this.setState({
        "valueInput": `ne zadanno`
      });

    }

  }

  takeValueTask(value) {
  }

  handleClickOutside() {

    this.setState({
      "listOpen": false
    });

  }

  toggleList() {

    this.setState(prevState => ({
      "listOpen": !prevState.listOpen
    }));

  }

  inputChange(event) {

    this.setState({
      "valueInput": event.target.value
    });

  }

  inputAccept(event) {

    this.tasklistAdd(this.state.valueInput, true);

  }

  tasklistAdd(value, isTask = false) {

    let name = value;
    fetch(`/api/tasklist`, {
      "method": `POST`,
      "headers": {
        'Content-Type': `application/json`
      },
      "body": JSON.stringify({
        "name": name
      })
    })
      .then(res => res.json())
      .then(json => {

        let data = this.state.tasklist;
        data.push(json);

        this.setState({
          "tasklist": data,
          "tasklistId": json._id
        });
        if (isTask) {

          this.changeTask();

        }

      });

  }

  changeTime(value) {

    const timeNew = Object.assign({}, this.state.time, {"taskId": value});
    fetch(`/api/day/${this.state.dayId}/change-time/${this.state.time._id}`, {
      "method": `POST`,
      "headers": {
        'Content-Type': `application/json`
      },
      "body": JSON.stringify({
        "timeNew": timeNew
      })
    }).then(res => res.json())
      .then(json => {

        let data = json;

        this.setState({
          "time": data
        });

      });

  }

  changeTask(isTime = false) {

    if (this.state.taskId !== null) {

      console.log(`??`);

    } else {

      const task = {
        "tasklistId": this.state.tasklistId,
        "dayId": this.state.dayId
      };
      fetch(`/api/task`, {
        "method": `POST`,
        "headers": {
          'Content-Type': `application/json`
        },
        "body": JSON.stringify({
          "taskNew": task
        })
      }).then(res => res.json())
        .then(json => {

          let data = json;

          this.setState({
            "task": data,
            "taskId": data._id
          });
          if (isTime) {

            this.changeTime(data._id);

          }

        });

    }

  }

  itemDelete(index) {

    const id = this.state.tasklist[index]._id;

    fetch(`/api/tasklist/${id}`, {"method": `DELETE`})
      .then(_ => {

        this._modifyTaskList(index, null);

      });

  }

  itemClick(evet) {

    this.setState({
      "valueInput": event.target.title,
      "listOpen": false
    });

  }

  _modifyTaskList(index, data) {

    let prevData = this.state.tasklist;

    if (data) {

      prevData[index] = data;

    } else {

      prevData.splice(index, 1);

    }

    this.setState({
      "tasklist": prevData
    });

  }

  render() {

    const {listOpen, headerTitle} = this.state;
    return (
      <div className="task-form" >
        <div className="task-form__header" onClick={this.toggleList} >
          <input className="task-form__header_input" value={this.state.valueInput} onInput={this.inputChange}></input>
          <button onClick={this.inputAccept}>s</button>
        </div>
        {listOpen && <ul className="task-form__list">
          {this.state.tasklist.map((item, i) => (
            <li className="task-form__list_item" key={i} onClick={this.itemClick} title={item.name}>{item.name}
              <button onClick={() => this.itemDelete(i)}>v</button></li>
          ))}
        </ul>}
      </div>
    );

  }
}
