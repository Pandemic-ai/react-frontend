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

  componentDidMount() {
    var slider = document.getElementById("myRange");
    var output = document.getElementById("demo");
    output.innerHTML = slider.value;

    slider.oninput = function() {
      output.innerHTML = this.value;
    };
  }

  render() {
    const { showNav, status } = this.state;
    let navCoverStyle = { width: showNav ? "300px" : "0" };
    let sideNavStyle = { width: showNav ? "300px" : "0" };

    return (
      <React.Fragment>
        <span onClick={this.openNavClick} class="open-nav text-white">
          <i class="fa fa-map-marker fs"></i>
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
          <h1 className="h1 ">Radius</h1>

          <form onSubmit={this.props.sub}>
            <div
              className="text-center"
              style={{ width: "90%", margin: "0 auto" }}
            >
              {/* <div class="form-group">
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
              </div> */}

              <div class="form-group" style={{ marginTop: "15px" }}>
                <div class="input-group mb-2">
                  <div class="input-group-prepend">
                    <div class="input-group-text">
                      <i
                        className="fa fa-map-marker"
                        style={{ fontSize: "15px" }}
                      ></i>
                    </div>
                  </div>{" "}
                  &nbsp;
                  <input
                    type="text"
                    style={{ border: "1px solid yellow", height: "40px" }}
                    name="address"
                    onChange={this.props.loadd}
                    className="form-control mr-sm-2 differt"
                    placeholder="Point of intrest"
                  />
                </div>
              </div>

              <div class="slidecontainer">
                <p className="text-left text-white">
                  Range : <span id="demo"></span> km
                </p>
                <input
                  type="range"
                  min="1"
                  max="100"
                  value="50"
                  class="slider"
                  id="myRange"
                />
              </div>

              <div className="button">
                <button
                  className="btn btn-apply btn-block font-weight-bolder "
                  onClick={this.navCoverClick}
                >
                  SEARCH
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
