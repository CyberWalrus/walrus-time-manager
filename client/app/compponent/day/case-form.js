import React from 'react';
import PropTypes from 'prop-types';
import "./case-form.scss";
import {finished} from 'stream';

export default class CaseForm extends React.Component {
  static propTypes = {
    title: PropTypes.string,
  }
  constructor(props) {
    super(props)
    this.state = {
      counters: [],
      listOpen: false,
      headerTitle: this.props.title,
      valueInput: this.props.title
    }
    this.toggleList = this.toggleList.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);
    this.inputChange = this.inputChange.bind(this);
    this.itemClick = this.itemClick.bind(this);
    this.inputAccept = this.inputAccept.bind(this);
  }
  componentDidMount() {
    fetch('/api/counters')
      .then(res => res.json())
      .then(json => {
        this.setState({
          counters: json
        });
      });
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
  }
  itemClick(evet){
    this.setState({
      valueInput: event.target.title,      
      listOpen: false
    })
  }
  render() {
    const {listOpen, headerTitle} = this.state
    return (
      <div className="case-form" >
        <div className="case-form__header" onClick={this.toggleList} >
          <input className="case-form__header_input" value={this.state.valueInput} onChange={this.inputChange}></input>
        </div>
        <button onClick={this.inputAccept}>v</button>
        {listOpen && <ul className="case-form__list">
          {this.state.counters.map((item) => (
            <li className="case-form__list_item" key={item.id} onClick={this.itemClick} title={item.name}>{item.name}</li>
          ))}
        </ul>}
      </div>
    )
  }
}
