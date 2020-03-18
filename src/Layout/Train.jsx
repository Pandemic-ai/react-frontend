import React from "react";
import "./SideNav.css";
import { withRouter } from "react-router-dom";
import "./SideNav.css";
import moment from "moment";

class Train extends React.Component {
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

    var weekday = new Array(7);
    weekday[0] = "Sunday";
    weekday[1] = "Monday";
    weekday[2] = "Tuesday";
    weekday[3] = "Wednesday";
    weekday[4] = "Thursday";
    weekday[5] = "Friday";
    weekday[6] = "Saturday";

    const train = this.props.load.filter(c => c.transport_mode === "Train");

    return (
      <React.Fragment>
        <span onClick={this.openNavClick} class="open-nav text-white">
          <i className="fa fa-train"></i>
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
          <h1 className="text-dark text-center  h1 ">TrainView</h1>
          <h5 className="text-dark text-center   ">
            Known Train related to <strong>COVID-19</strong> cases
          </h5>
          <hr></hr>

          {train.map(c => (
            <div className="text-left box" style={{ marginBottom: "15px" }}>
              <h5 className="font-weight-bolder">
                {c.transport_number} - {c.departure_country} (
                {c.departure_place}) To {c.arrival_country} ({c.arrival_place})
              </h5>
              <h6 style={{ marginTop: "10px" }}>
                <strong>
                  {weekday[new Date(c.date).getDay()]} ,
                  {moment(c.datetime).format("DD-MM-YYYY")}
                </strong>
              </h6>
              <h6 style={{ marginTop: "-3px" }}>
                Departure : {c.departure_time}{" "}
                {c.departure_time > "12" ? "PM" : "AM"}{" "}
              </h6>
              <h6 style={{ marginTop: "-3px" }}>
                Arrival : {c.arrival_time} {c.arrival_time > "12" ? "PM" : "AM"}
              </h6>
            </div>
          ))}
        </div>
      </React.Fragment>
    );
  }
}

export default withRouter(Train);
