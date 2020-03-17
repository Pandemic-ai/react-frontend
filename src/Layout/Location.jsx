import React from "react";
import "./SideNav.css";
import { withRouter } from "react-router-dom";
import "./SideNav.css";

class Location extends React.Component {
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
          <i class="fa fa-map-marker"></i>
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
          <h1 className="text-dark text-center  h1 ">Area View</h1>
          <hr></hr>
          <form onSubmit={this.props.sub}>
            <div
              className="text-center"
              style={{ width: "90%", margin: "0 auto" }}
            >
              <div class="form-group">
                <label htmlFor="Start Date" className="float-left">
                  Search by country
                </label>
                <select
                  name="location"
                  className="form-control"
                  onChange={this.props.loadd}
                >
                  <option value="">-----</option>
                  <option value="Poland">Poland</option>
                  <option value="Israel">Israel</option>
                </select>
              </div>

              <div class="form-group" style={{ marginTop: "15px" }}>
                <label htmlFor="Start Date" className="float-left">
                  Search for a place
                </label>
                <input
                  type="text"
                  name="address"
                  onChange={this.props.loadd}
                  className="form-control"
                  placeholder="Point of intrest"
                />
              </div>

              <div className="button">
                <button className="btn btn-info btn-block font-weight-bolder ">
                  Search{" "}
                </button>
              </div>
            </div>
          </form>
        </div>
      </React.Fragment>
    );
  }
}

export default withRouter(Location);
