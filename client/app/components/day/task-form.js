import React from "react";
import PropTypes from "prop-types";
import "./task-form.scss";

export default class TaskForm extends React.Component {
  static propTypes = {
    taskId: null
  }
  constructor(props) {
    super(props)
    this.state = {
      tasklist: [],
      taskId: this.props.taskId,
      task: {},
      id: ``,
      listOpen: false,
      headerTitle: this.props.taskId,
      valueInput: this.props.taskId
    }
    this.toggleList = this.toggleList.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);
    this.inputChange = this.inputChange.bind(this);
    this.itemClick = this.itemClick.bind(this);
    this.inputAccept = this.inputAccept.bind(this);
    this.itemDelete = this.itemDelete.bind(this);
  }
  componentDidMount() {
    fetch(`/api/tasklist`)
      .then(res => res.json())
      .then(json => {
        this.setState({
          tasklist: json
        });
      });
    if (this.state.taskId != null) {
      fetch(`/api/task/${this.state.taskId}`)
        .then(res => res.json())
        .then(json => {
          this.setState({
            task: json
          });
        });
    }
  }
  handleClickOutside() {
    this.setState({
      listOpen: false
    })
  }
  toggleList() {
    this.setState(prevState => ({
      listOpen: !prevState.listOpen
    }))
  }
  inputChange(event) {
    this.setState({
      valueInput: event.target.value
    });
  }
  inputAccept(event) {
    let name = this.state.valueInput;
    fetch(`/api/tasklist`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: name
      })
    }).then(res => res.json())
      .then(json => {
        let data = this.state.tasklist;
        data.push(json);

        this.setState({
          tasklist: data
        });
      });
  }
  itemDelete(index) {
    const id = this.state.tasklist[index]._id;

    fetch(`/api/tasklist/${id}`, {method: `DELETE`})
      .then(_ => {
        this._modifyTaskList(index, null);
      });
  }
  itemClick(evet) {
    this.setState({
      valueInput: event.target.title,
      listOpen: false
    })
  }
  _modifyTaskList(index, data) {
    let prevData = this.state.tasklist;

    if (data) {
      prevData[index] = data;
    } else {
      prevData.splice(index, 1);
    }

    this.setState({
      tasklist: prevData
    });
  }
  render() {
    const {listOpen, headerTitle} = this.state
    return (
      <div className="task-form" >
        <div className="task-form__header" onClick={this.toggleList} >
          <input className="task-form__header_input" value={this.state.valueInput} onInput={this.inputChange}></input>
          <button onClick={this.inputAccept}>v</button>
        </div>
        {listOpen && <ul className="task-form__list">
          {this.state.tasklist.map((item, i) => (
            <li className="task-form__list_item" key={i} onClick={this.itemClick} title={item.name}>{item.name}
              <button onClick={() => this.itemDelete(i)}>v</button></li>
          ))}
        </ul>}
      </div>
    )
  }
}
