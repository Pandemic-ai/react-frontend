import React from "react";
import "./SideNav.css";
import { withRouter } from "react-router-dom";
import "./SideNav.css";

class Alert extends React.Component {
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
    let navCoverStyle = {
      width: showNav ? "300px" : "0",
      marginLeft: showNav ? "270px" : "0"
    };
    let sideNavStyle = { width: showNav ? "340px" : "0" };

    return (
      <React.Fragment>
        <span onClick={this.openNavClick} class="open-nav text-white">
          <i class="fa fa-warning"></i>
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
          <h1 className="h1 ">Risk calculator</h1>

          <div
            className="form-section"
            style={{ margin: "0 auto", width: "90%" }}
          >
            <form onSubmit={this.props.sub} style={{ marginTop: "10px" }}>
              <div className="row">
                <div className="col-md-6">
                  <label htmlFor="form">Date</label>
                  <input
                    type="date"
                    onChange={this.props.loadd}
                    name="date_gte"
                    className="form-control"
                  />
                </div>

                <div className="col-md-6">
                  <label htmlFor="form">.</label>
                  <input
                    type="date"
                    onChange={this.props.loadd}
                    name="date_lte"
                    className="form-control"
                  />
                </div>
              </div>

              <div className="form-group" style={{ marginTop: "15px" }}>
                <label htmlFor="form">Add and address or place 1</label>
                <input
                  type="text"
                  onChange={this.props.loadd}
                  name="place1"
                  className="form-control"
                  placeholder="Address or placename"
                />
              </div>

              <div className="form-group">
                <label htmlFor="form">Add and address or place 2</label>
                <input
                  type="text"
                  onChange={this.props.loadd}
                  name="place2"
                  className="form-control"
                  placeholder="Address or placename"
                />
              </div>

              <div className="form-group">
                <label htmlFor="form">Add and address or place 2</label>
                <input
                  type="text"
                  onChange={this.props.loadd}
                  name="place3"
                  className="form-control"
                  placeholder="Address or placename"
                />
              </div>

              <div className="row">
                <div className="col-md-6">
                  <button className="btn btn-apply btn-block">APPLY</button>
                </div>
                <div className="col-md-6">
                  <button className="btn btn-rest btn-block">RESET</button>
                </div>
              </div>
            </form>
          </div>

          <div className="flight-box" style={{ marginTop: "20px" }}>
            <h2
              className="text-center  h1 font-weight-bolder"
              style={{ color: "red", fontSize: "40px" }}
            >
              {" "}
              91 %
            </h2>
            <hr style={{ borderWidth: "2px", borderColor: "yellow" }}></hr>
            <p
              className="font-weight-bolder h6"
              style={{ color: "yellow", marginTop: "-5px" }}
            >
              Recommendation
            </p>
            <p style={{ marginTop: "-5px" }}>
              Stay home for the next two weeks, avoid any contact with other
              people.
            </p>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default withRouter(Alert);
