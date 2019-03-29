import React from 'react';
import "./case-form.scss";
import {finished} from 'stream';


const list = [
  {
    id: 0,
    title: 'eat',
    selected: false,
    key: 'case'
  },
  {
    id: 1,
    title: 'run',
    selected: false,
    key: 'case'
  },
  {
    id: 2,
    title: 'learn',
    selected: false,
    key: 'case'
  }
];

export default class CaseForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      listOpen: false,
      headerTitle: this.props.title,
      valueInput: ""
    }
    this.toggleList = this.toggleList.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);
    this.inputChange = this.inputChange.bind(this);
    this.itemClick = this.itemClick.bind(this);
    this.inputAccept = this.inputAccept.bind(this);
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
    console.log(this.state.valueInput);
    const valueTitle = this.state.valueInput;
    function isTitle(i) {
      return i.title == valueTitle ;
    }
    console.log(list.find(isTitle));
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
          {list.map((item) => (
            <li className="case-form__list_item" key={item.id} onClick={this.itemClick} title={item.title}>{item.title}</li>
          ))}
        </ul>}
      </div>
    )
  }
}