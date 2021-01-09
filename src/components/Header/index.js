import React from "react";
import { Link } from "react-router-dom";

import "../../styles/header.less";

export default class Header extends React.Component {
  constructor(props) {
    super(props);

    this.handleHeaderIconClick = this.handleHeaderIconClick.bind(this);
    this.toggleUsersOverlay = this.toggleUsersOverlay.bind(this);

    this.icons = [
      {
        name: "Home",
        path: "/",
        url: "home"
      },
      {
        name: "Location",
        path: "/location",
        url: "location"
      },
      {
        name: "Calendar",
        path: "/calendar",
        url: "calendar"
      },
      {
        name: "Notification",
        path: "/notification",
        url: "notification"
      },
      {
        name: "Edit",
        path: "/edit",
        url: "edit"
      }
    ]

    this.state = {
      userOverlayShown: false
    }
  }

  handleHeaderIconClick(e) {
    const path = e.target.dataset.path;

    switch (path) {
      case "/edit":
        this.toggleUsersOverlay();
        break;
      case "/":
        location.replace("/");
        break;
    }
  }

  toggleUsersOverlay() {
    this.setState({
      userOverlayShown: !this.state.userOverlayShown
    })
  }


  render() {
    return (
      <header className="main--header">
        {this.icons.map(icon => (
          <span
            data-path={icon.path}
            className="main--header--elem"
            key={this.icons.indexOf(icon)}
            onClick={this.handleHeaderIconClick}
          >
            <img
              src={`/assets/icons/Header/${icon.url}_${this.props.location.pathname === icon.path ? "" : "in"}active.svg`}
              alt={icon.name}
              data-path={icon.path}
            />
          </span>
        ))}

        <Link to="/" className="main--header--elem main--header--avatar">
          <img src="/assets/images/avatar.png" alt="User"/>
        </Link>

        {this.state.userOverlayShown && <menu className="main--header--edit--overlay">
          <li>
            <Link to="/edit/instructors">Инструкторы</Link>
          </li>
          <li>
            <Link to="/edit/responsible">Ответственные</Link>
          </li>
        </menu>}
        
      </header>
    );
  }

}