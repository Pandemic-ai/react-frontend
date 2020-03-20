import React from "react";
import "./SideNav.css";
import { withRouter } from "react-router-dom";
import "./SideNav.css";
// import moment from "moment";

class Help extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showNav: false
    };
  }

  openNavClick = e => {
    e.preventDefault();
    this.openNav();
  };

  closeNavClick = e => {
    e.preventDefault();
    this.closeNav();
  };

  openNav = () => {
    this.setState({
      showNav: true
    });

    document.addEventListener("keydown", this.handleEscKey);
  };
  closeNav = () => {
    this.setState({
      showNav: false
    });

    document.removeEventListener("keydown", this.handleEscKey);
  };

  handleEscKey = e => {
    if (e.key === "Escape") {
      this.closeNav();
    }
  };

  render() {
    const { showNav, status } = this.state;
    let navCoverStyle = { width: showNav ? "300px" : "0" };
    let sideNavStyle = { width: showNav ? "300px" : "0" };

    return (
      <React.Fragment>
        <span onClick={this.openNavClick} class="open-nav text-white">
          <i className="fa fa-bars fs"></i>
        </span>
        <div
          onClick={this.navCoverClick}
          class="nav-cover"
          style={navCoverStyle}
        />

        <div name="side-nav" class="side-nav" style={sideNavStyle}>
          <a href="# " onClick={this.closeNavClick} class="close-nav">
            &times;
          </a>
          <h1 className="h1 ">Legend</h1>

          <div class="  " style={{ marginTop: "30px" }}>
            <div class="">
              <div class="custom-control">
                <div className="row">
                  <div className="col-md-6">
                    <p class="text-white">Exposure point</p>
                  </div>
                  <div className="col-md-4" style={{ marginTop: "-5px" }}>
                    <i
                      className="fa fa-map-marker"
                      style={{ marginLeft: "-12px" }}
                    ></i>
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-6">
                    <p class="text-white">Bus Route</p>
                  </div>
                  <div className="col-md-4" style={{ marginTop: "-5px" }}>
                    <i
                      class="fas fa-dot-circle text-warning"
                      style={{ fontSize: "9px" }}
                    ></i>
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-6">
                    <p class="text-white">Tram Route</p>
                  </div>
                  <div className="col-md-4" style={{ marginTop: "-5px" }}>
                    <i
                      class="fas fa-dot-circle text-info"
                      style={{ fontSize: "9px" }}
                    ></i>
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-6">
                    <p class="text-white">Subway Route</p>
                  </div>
                  <div className="col-md-4" style={{ marginTop: "-5px" }}>
                    <i
                      class="fas fa-dot-circle text-danger"
                      style={{ fontSize: "9px" }}
                    ></i>
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-6">
                    <p class="text-white">Train Route</p>
                  </div>
                  <div className="col-md-4" style={{ marginTop: "-5px" }}>
                    <i
                      class="fas fa-dot-circle text-success"
                      style={{ fontSize: "9px" }}
                    ></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default withRouter(Help);
