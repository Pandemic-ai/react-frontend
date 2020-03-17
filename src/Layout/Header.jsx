import React, { Component } from "react";
import Bus from "./Bus";
import Train from "./Train";
import Flight from "./FLight";
import Filter from "./Filter";
import Location from "./Location";
import logo from "../Img/Logo.png";

export class Header extends Component {
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
          {/* <button
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
                </button> */}
          {/* <div className="collapse navbar-collapse" id="navbarSupportedContent"> */}
          <ul className="navbar-nav mr-auto">
            <li>
              <a className="nav-link   text-dark" style={{ marginTop: "10px" }}>
                <i class="fa fa-bars"></i>
              </a>
            </li>
            <li>
              <a className="nav-link   text-dark" style={{ marginTop: "10px" }}>
                <Location
                  sub={this.props.submit}
                  vall={this.props.state}
                  loadd={this.props.load}
                />
              </a>
            </li>
            <li className="nav-item  ">
              <a className="nav-link   text-dark" href="# ">
                <Bus />
              </a>
            </li>

            <li className="nav-item  ">
              <a className="nav-link   text-dark" href="# ">
                <Flight />
              </a>
            </li>
            <li className="nav-item  ">
              <a className="nav-link   text-dark" href="# ">
                <Train />
              </a>
            </li>
            <li>
              <a className="nav-link   text-dark" style={{ marginTop: "10px" }}>
                <Filter
                  sub={this.props.submit}
                  vall={this.props.state}
                  loadd={this.props.load}
                />
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
          {/* </div> */}
        </nav>
      </div>
    );
  }
}

export default Header;
