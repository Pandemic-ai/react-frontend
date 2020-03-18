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
          <i className="fa fa-bars"></i>
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
          <h1 className="text-dark text-center  h1 ">Information</h1>

          <hr></hr>

          <div className="" style={{ width: "70%", margin: "0 auto" }}>
            <div className="row">
              <div className="col-md-8">
                <p>Bus Route</p>
                <p>Train Route</p>
                <p>Flight</p>
              </div>
              <div className="col-md-3">
                <p>
                  <i className="fa fa-bus"></i>
                </p>
                <p>
                  <i className="fa fa-train"></i>
                </p>
                <p>
                  <i className="fa fa-plane"></i>
                </p>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default withRouter(Help);
