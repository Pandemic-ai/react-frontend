import React from "react";
import "./SideNav.css";
import { withRouter } from "react-router-dom";
import "./SideNav.css";

class Filter extends React.Component {
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
    const { showNav } = this.state;
    let navCoverStyle = {
      width: showNav ? "300px" : "0",
      marginLeft: showNav ? "270px" : "0"
    };
    let sideNavStyle = { width: showNav ? "340px" : "0" };

    return (
      <React.Fragment>
        <span onClick={this.openNavClick} class="open-nav text-white">
          <i class="fa fa-filter fs"></i>
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
          <h1 className="h1 ">Filter Map</h1>

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

              <div className="row">
                <div className="col-md-6">
                  <button className="btn btn-apply btn-block">APPLY</button>
                </div>
                <div className="col-md-6">
                  <button className="btn btn-rest btn-block">RESET</button>
                </div>
              </div>

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
                      <div className="col-md-2">
                        {" "}
                        <input
                          defaultChecked
                          type="checkbox"
                          class="form-check-input"
                          id="exampleCheck1"
                        />
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
                      <div className="col-md-2">
                        {" "}
                        <input
                          defaultChecked
                          type="checkbox"
                          class="form-check-input"
                          id="exampleCheck1"
                        />
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
                      <div className="col-md-2">
                        {" "}
                        <input
                          type="checkbox"
                          defaultChecked
                          class="form-check-input"
                          id="exampleCheck1"
                        />
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
                      <div className="col-md-2">
                        {" "}
                        <input
                          defaultChecked
                          type="checkbox"
                          class="form-check-input"
                          id="exampleCheck1"
                        />
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
                      <div className="col-md-2">
                        {" "}
                        <input
                          type="checkbox"
                          class="form-check-input"
                          id="exampleCheck1"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default withRouter(Filter);
