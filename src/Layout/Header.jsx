import React, { Component } from "react";
import Bus from "./Bus";
import Train from "./Train";
import Flight from "./FLight";
import Filter from "./Filter";
import Location from "./Location";
import Help from "./Help";
import logo from "../Img/Logo.png";

export class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {
      map: []
    };
  }

  async componentDidMount() {
    try {
      await fetch(`https://coronaviva.herokuapp.com/api/1/transport/data/`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer F9bQK456iUpJVZJLTZsMEKhhENqnGJ"
        }
      })
        .then(map => map.json())
        .then(map => {
          this.setState({
            map
          });
        });
    } catch (err) {
      console.log(err);
    }
  }

  render() {
    return (
      <div className="container1">
        <nav className="navbar navbar-expand-lg navbar-dark  fixed top-header">
          {/* <a
                  className="navbar-brand logo_text font-weight-bolder"
                  href="/dashboard/"
                  data-toggle="collapse"
                  data-target="#navbarSupportedContent"
                  aria-controls="navbarSupportedContent"
                  aria-expanded="false"
                  aria-label="Toggle navigation"
                  style={{ color: "rebeccapurple" }}
                >
                  <img
                    src={logo}
                    alt="Logo"
                    style={{ width: "200px", height: "60px" }}
                  />
                </a> */}
          <button
            className="navbar-toggler font-weight-bold text-white  "
            style={{ background: "#38d39f", padding: "2px", width: "70px" }}
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon  "></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">
              <li>
                <a
                  href="# "
                  className="nav-link   text-dark"
                  style={{ marginTop: "10px" }}
                >
                  <Help />
                </a>
              </li>
              <li>
                <a
                  href="# "
                  className="nav-link   text-dark"
                  style={{ marginTop: "10px" }}
                >
                  <Location
                    sub={this.props.submit}
                    vall={this.props.state}
                    loadd={this.props.load}
                  />
                </a>
              </li>
              <li className="nav-item  ">
                <a className="nav-link   text-dark" href="# ">
                  <Bus load={this.state.map} />
                </a>
              </li>

              <li className="nav-item  ">
                <a className="nav-link   text-dark" href="# ">
                  <Flight load={this.state.map} />
                </a>
              </li>
              <li className="nav-item  ">
                <a className="nav-link   text-dark" href="# ">
                  <Train load={this.state.map} />
                </a>
              </li>
              <li>
                <a
                  href="# "
                  className="nav-link   text-dark"
                  style={{ marginTop: "10px" }}
                >
                  <Filter
                    sub={this.props.submit}
                    vall={this.props.state}
                    loadd={this.props.load}
                  />
                </a>
              </li>
              <li>
                <a
                  href="# "
                  className="nav-link   text-dark"
                  style={{ marginTop: "10px" }}
                >
                  <i className="fa fa-warning"></i>
                </a>
              </li>
            </ul>
            <ul className="navbar-nav mx-auto" style={{ margin: "0 auto" }}>
              <img
                src={logo}
                alt="Website Logo"
                style={{ width: " 200px", height: "40px" }}
              />
            </ul>
          </div>
        </nav>
      </div>
    );
  }
}

export default Header;
