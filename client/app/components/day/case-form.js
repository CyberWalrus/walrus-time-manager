import React from "react";
import PropTypes from "prop-types";
import "./case-form.scss";

export default class CaseForm extends React.Component {
  static propTypes = {
    caseId: null
  }
  constructor(props) {
    super(props)
    this.state = {
      caselist: [],
      caseId: this.props.caseId,
      case: {},
      id: ``,
      listOpen: false,
      headerTitle: this.props.caseId,
      valueInput: this.props.caseId
    }
    this.toggleList = this.toggleList.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);
    this.inputChange = this.inputChange.bind(this);
    this.itemClick = this.itemClick.bind(this);
    this.inputAccept = this.inputAccept.bind(this);
    this.itemDelete = this.itemDelete.bind(this);
  }
  componentDidMount() {
    fetch(`/api/caselist`)
      .then(res => res.json())
      .then(json => {
        this.setState({
          caselist: json
        });
      });
    if (this.state.caseId != null) {
      fetch(`/api/case/${this.state.caseId}`)
        .then(res => res.json())
        .then(json => {
          this.setState({
            case: json
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
    fetch(`/api/caselist`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: name
      })
    }).then(res => res.json())
      .then(json => {
        let data = this.state.caselist;
        data.push(json);

        this.setState({
          caselist: data
        });
      });
  }
  itemDelete(index) {
    const id = this.state.caselist[index]._id;

    fetch(`/api/caselist/${id}`, {method: `DELETE`})
      .then(_ => {
        this._modifyCaseList(index, null);
      });
  }
  itemClick(evet) {
    this.setState({
      valueInput: event.target.title,
      listOpen: false
    })
  }
  _modifyCaseList(index, data) {
    let prevData = this.state.caselist;

    if (data) {
      prevData[index] = data;
    } else {
      prevData.splice(index, 1);
    }

    this.setState({
      caselist: prevData
    });
  }
  render() {
    const {listOpen, headerTitle} = this.state
    return (
      <div className="case-form" >
        <div className="case-form__header" onClick={this.toggleList} >
          <input className="case-form__header_input" value={this.state.valueInput} onInput={this.inputChange}></input>
          <button onClick={this.inputAccept}>v</button>
        </div>
        {listOpen && <ul className="case-form__list">
          {this.state.caselist.map((item, i) => (
            <li className="case-form__list_item" key={i} onClick={this.itemClick} title={item.name}>{item.name}
              <button onClick={() => this.itemDelete(i)}>v</button></li>
          ))}
        </ul>}
      </div>
    )
  }
}
