import React, { Component } from 'react';
import 'whatwg-fetch';
import DropDownUserRole from '../DropdDown/DropDownUserRole';

class MenuOptions extends Component {
  constructor(props) {
    super(props);

    this.state = {
      menus: [],
      label: '',
      url: '/',
      newindex: 0,
      userRole: []
    };

    this.handleLabelListChange = this.handleLabelListChange.bind(this);
    this.handleURLListChange = this.handleURLListChange.bind(this);
    this.handleIndexListChange = this.handleIndexListChange.bind(this);
    this.handleUserRoleListChange = this.handleUserRoleListChange.bind(this);

    this.handleLabel = this.handleLabel.bind(this);
    this.handleURL = this.handleURL.bind(this);
    this.handleIndex = this.handleIndex.bind(this);
    this.handleUserRole = this.handleUserRole.bind(this);

    this.createMenu = this.createMenu.bind(this);
    this.deletedMenu = this.deletedMenu.bind(this);

    this.__modifyMenu = this.__modifyMenu.bind(this);
  }

  componentDidMount() {
    fetch('/api/options/menu')
      .then(res => res.json())
      .then(json => {
        this.setState({
          menus: json
        });
      });
  }
  handleLabelListChange(index, event) {
    let menus = this.state.menus.slice(); // Make a copy of the emails first.
    menus[index].label = event.target.value; // Update it with the modified email.
    this.setState({ menus: menus }); // Update the state.
    this.changeMenu(index);
  }
  handleURLListChange(index, event) {
    let menus = this.state.menus.slice(); // Make a copy of the emails first.
    menus[index].url = event.target.value; // Update it with the modified email.
    this.setState({ menus: menus }); // Update the state.
    this.changeMenu(index);
  }
  handleIndexListChange(index, event) {
    let menus = this.state.menus.slice(); // Make a copy of the emails first.
    menus[index].index = event.target.value; // Update it with the modified email.
    this.setState({ menus: menus }); // Update the state.
    this.changeMenu(index);
  }
  handleUserRoleListChange(index, value) {
    console.log(value);
    let menus = this.state.menus.slice(); // Make a copy of the emails first.
    menus[index].userRole = value; // Update it with the modified email.
    this.setState({ menus: menus }); // Update the state.
    this.changeMenu(index);
  }
  handleLabel(event) {
    this.setState({ label: event.target.value }); // Update the state.
  }
  handleURL(event) {
    this.setState({ url: event.target.value }); // Update the state.
  }
  handleIndex(event) {    
    this.setState({ newindex: event.target.value }); // Update the state.
  }
  handleUserRole(value) {
    this.setState({ userRole: value }); 
  }

  changeMenu(index) {
    const id = this.state.menus[index]._id;
    const label = this.state.menus[index].label;
    const url = this.state.menus[index].url;
    const idx = this.state.menus[index].index;
    const userRole = this.state.menus[index].userRole;
    // Post request to backend
    fetch(`/api/options/menu/${id}/change`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        label: label,
        url: url,
        idx: idx,
        userRole: userRole
      }),
    })
      .then(res => res.json())
      .then(json => {
        //this.__modifyMenu(index, json);
      });
  }

  createMenu() {
    const label = this.state.label;
    const url = this.state.url;
    const idx = this.state.newindex;
    const userRole = this.state.userRole;
    this.state.label = '';
    this.state.url = '';
    this.state.newindex = '';
    // Post request to backend
    fetch(`/api/options/menu/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        label: label,
        url: url,
        idx: idx,
        userRole: userRole
      }),
    }).then(res => res.json())
      .then(json => {
        let data = this.state.menus;
        data.push(json);

        this.setState({
          menus: data
        });
      });
  }

  onIsDeleted(index) {
    const id = this.state.menus[index]._id;

    fetch(`/api/options/menu/${id}/isdeleted`, { method: 'PUT' })
      .then(res => res.json())
      .then(json => {
        this.__modifyMenu(index, json);
      });
  }

  deletedMenu(index) {
    const id = this.state.menus[index]._id;

    fetch(`/api/options/menu/${id}/deleted`, { method: 'DELETE' })
      .then(_ => {
        this.__modifyMenu(index, null);
      });
  }

  __modifyMenu(index, data) {
    let prevData = this.state.menus;

    if (data) {
      prevData[index] = data;
    } else {
      prevData.splice(index, 1);
    }

    this.setState({
      menus: prevData
    });
  }

  findMaxIndex(array, value, oldvalue) {
    if ((array.filter(x => x.index == value).length != 0) || (value == 0) || (value == '')) {
      if (oldvalue != parseInt(array.reduce((prev, current) => (prev.id > current.index) ? prev : current).index, 10)) {
        value = 1 + parseInt(array.reduce((prev, current) => (prev.id > current.index) ? prev : current).index, 10);
      } else {
        value = oldvalue;
      }
    }
    return value;
  }

  render() {
    return (
      <div>
        <p>Menu Options:</p>

        <ul>
          {this.state.menus.map((menu, i) => (
            <li key={i}>
              <span>
                <input type="text"
                  value={menu.label}
                  onChange={this.handleLabelListChange.bind(this, i)} />
              </span>
              <span>
                <input type="text"
                  value={menu.url}
                  onChange={this.handleURLListChange.bind(this, i)} />
              </span>
              <span>
                <input type="number"
                  value={menu.index}
                  onChange={this.handleIndexListChange.bind(this, i)} />
              </span>
              <span>
                <DropDownUserRole value={menu.userRole} onChange={this.handleUserRoleListChange.bind(this, i)} />
              </span>
              <span>{menu.isActive.toString()}</span>
              <button onClick={() => this.onIsDeleted(i)}>Active</button>
              <button onClick={() => this.deletedMenu(i)}>Deleted</button>
            </li>
          ))}
        </ul>

        <div>
          <span>
            <input type="text"
              value={this.state.label}
              onChange={this.handleLabel} />
          </span>
          <span>
            <input type="text"
              value={this.state.url}
              onChange={this.handleURL} />
          </span>
          <span>
            <input type="number"
              value={this.state.newindex}
              onChange={this.handleIndex} />
          </span>
          <span>
            <DropDownUserRole value={this.state.userRole} onChange={this.handleUserRole.bind(this)} />
          </span>
          <button onClick={this.createMenu}>add</button>
        </div>
      </div>
    );
  }
}

export default MenuOptions;