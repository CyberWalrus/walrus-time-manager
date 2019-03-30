import React from "react";
import 'whatwg-fetch';
import { Link } from 'react-router-dom';

class Menu extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      menus: []
    };
    //this.componentDidMount =this.componentDidMount.bind(this);
    this.myRef = React.createRef();
    this.changeCollapse = this.changeCollapse.bind(this);
  }
  componentDidMount() {
    fetch('/api/app/menu')
      .then(res => res.json())
      .then(json => {
        if (json.success) {
          this.setState({
            menus: json.menus,
            isLoadingMenu: false
          });
        }
      });
  }
  changeCollapse() {
    const node = this.myRef.current;
    console.log(node);
    if (node.className == 'collapse nav-bar-collapse') {
      node.setAttribute("class", "open nav-bar-collapse");
    } else {
      node.setAttribute("class", "collapse nav-bar-collapse");
    }
  }
  render() {
    if (this.state.menus) {
      return (
        <nav className="nav-bar">
          <Link to='/' className='nav-bar-link'>NavBar</Link>
          <button className="nav-bar-toggler" onClick={this.changeCollapse}>
            <span className="nav-bar-toggler-icon">Test</span>
          </button>

          <div className="collapse nav-bar-collapse" ref={this.myRef}>
            <ul className="nav-bar-nav">
              {this.state.menus.map((menu, i) => (
                <li key={i} className="nav-bar-item">
                  <Link to={menu.url} className='nav-bar-link'>{menu.label}</Link>
                </li>
              ))}
              <li className="nav-bar-item">
                <Link to={'/signup'} className='nav-bar-link'>{'signup'}</Link>
              </li>
            </ul>
          </div>

        </nav>
      )
    }
  }

}
export default Menu;