import React from "react";
import "./SideNav.css";
import { withRouter } from "react-router-dom";
import "./SideNav.css";
import moment from "moment";

class Bus extends React.Component {
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
    let navCoverStyle = { width: showNav ? "340px" : "0" };
    let sideNavStyle = { width: showNav ? "340px" : "0" };

    var weekday = new Array(7);
    weekday[0] = "Sunday";
    weekday[1] = "Monday";
    weekday[2] = "Tuesday";
    weekday[3] = "Wednesday";
    weekday[4] = "Thursday";
    weekday[5] = "Friday";
    weekday[6] = "Saturday";

    const bus = this.props.load.filter(c => c.transport_mode === "Bus");

    return (
      <React.Fragment>
        <span onClick={this.openNavClick} class="open-nav text-white">
          <i className="fa fa-bus fs"></i>
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

          <h1 className="h1 ">Bus trips</h1>

          <div
            className="form-section"
            style={{ margin: "0 auto", width: "85%" }}
          >
            <form>
              <div className="row">
                <div className="col-md-6">
                  <label htmlFor="form">Date</label>
                  <input className="form-control" name="date_gte" type="date" />

                  <label htmlFor="form" style={{ marginTop: "15px" }}>
                    From
                  </label>
                  <input
                    className="form-control"
                    name="departure"
                    type="text"
                    placeholder="Choose Place"
                  />
                </div>

                <div className="col-md-6">
                  <label htmlFor="form"></label>
                  <input
                    style={{ marginTop: "8px" }}
                    className="form-control"
                    name="date_lte"
                    type="date"
                  />

                  <label htmlFor="form" style={{ marginTop: "15px" }}>
                    To
                  </label>
                  <input
                    className="form-control"
                    name="arrival"
                    type="text"
                    placeholder="Choose Place"
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
            </form>
          </div>
          <div className="flight-box" style={{ marginTop: "20px" }}>
            {bus.map(c => (
              <div
                className="text-left  row"
                style={{
                  marginBottom: "15px",
                  width: "100%"
                }}
              >
                <div className="col-sm-2">
                  {" "}
                  <i className="fa fa-bus"></i>{" "}
                </div>

                <div className="col-sm-10">
                  <h5 className="font-weight-bolder">
                    {c.departure_country} ({c.departure_place}) To{" "}
                    {c.arrival_country} ({c.arrival_place})
                  </h5>
                  <h6 style={{ marginTop: "7px" }}>
                    <strong>
                      {weekday[new Date(c.date).getDay()]} ,
                      {moment(c.datetime).format("DD-MM-YYYY")}
                    </strong>
                  </h6>
                  <h6 style={{ marginTop: "-3px" }}>
                    {c.departure_time} {c.departure_time > "12" ? "PM" : "AM"}{" "}
                    {" To  "} {c.arrival_time}{" "}
                    {c.arrival_time > "12" ? "PM" : "AM"}
                  </h6>

                  <hr
                    style={{ borderWidth: "2px", borderColor: "yellow" }}
                  ></hr>
                </div>
              </div>
            ))}
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default withRouter(Bus);
