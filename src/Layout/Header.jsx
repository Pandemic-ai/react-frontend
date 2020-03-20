import React, { Component } from "react";
import Bus from "./Bus";
import Train from "./Train";
import Flight from "./FLight";
import Filter from "./Filter";
import Location from "./Location";
import Help from "./Help";
import Alert from "./Alert";
import logo from "../Img/White.png";
import viva from "../Img/Logo1.png";
export class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {
      map: [],
      map1: [],
      date_gte: "",
      date_lte: "",
      a_country: "",
      d_country: ""
    };
    this.onLogout = this.onLogout.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  async componentDidMount() {
    try {
      Promise.all([
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
          }),
        await fetch(`https://coronaviva.herokuapp.com/api/1/infected/data/`, {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer F9bQK456iUpJVZJLTZsMEKhhENqnGJ"
          }
        })
          .then(map1 => map1.json())
          .then(map1 => {
            this.setState({
              map1
            });
          })
      ]);
    } catch (err) {
      console.log(err);
    }
  }

  async handleSubmit(e) {
    e.preventDefault(e);
    await fetch(
      `https://coronaviva.herokuapp.com/api/1/transport/data/?departure_country__icontains=${this.state.d_country}&arrival_country__icontains=${this.state.a_country}&date__gte=${this.state.date_gte}&date__lte=${this.state.date_lte}`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer F9bQK456iUpJVZJLTZsMEKhhENqnGJ"
        }
      }
    )
      .then(map => map.json())
      .then(map => {
        this.setState({
          map
        });
      });
  }

  async onChange(e) {
    await this.setState({
      [e.target.name]: e.target.value
    });
  }

  onLogout() {
    localStorage.removeItem("Token");
    window.location.href = "/";
  }

  render() {
    const country = [...new Set(this.state.map1.map(i => i.location))];

    const options1 = [];

    for (var i = 0; i < country.length; i++) {
      const don = country[i];

      options1.push(
        <option value={don} key={don}>
          {don}
        </option>
      );
    }

    return (
      <div className="container1">
        <nav className="navbar navbar-expand-lg navbar-dark  fixed top-header bg-dark">
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
                <a
                  className="nav-link   text-dark"
                  href="# "
                  style={{ marginTop: "10px" }}
                >
                  <Bus
                    load={this.state.map}
                    submit={this.handleSubmit}
                    state={this.state}
                    change={this.onChange}
                  />
                </a>
              </li>

              <li className="nav-item  ">
                <a
                  className="nav-link   text-dark"
                  href="# "
                  style={{ marginTop: "10px" }}
                >
                  <Flight
                    load={this.state.map}
                    submit={this.handleSubmit}
                    state={this.state}
                    change={this.onChange}
                  />
                </a>
              </li>
              <li className="nav-item  ">
                <a
                  className="nav-link   text-dark"
                  href="# "
                  style={{ marginTop: "10px" }}
                >
                  <Train
                    load={this.state.map}
                    submit={this.handleSubmit}
                    state={this.state}
                    change={this.onChange}
                  />
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
                  <Alert />
                </a>
              </li>
            </ul>

            <ul className="navbar-nav mx-auto">
              <a
                className="nav-link  text-dark"
                href="# "
                onClick={this.onLogout}
                style={{
                  color: "rgb(183, 28, 28, 0.8)",
                  marginRight: "0px"
                }}
              >
                <img
                  src={logo}
                  alt="Header logo"
                  style={{
                    height: "35px",
                    marginTop: "0px",
                    position: "relative",
                    right: "60%"
                  }}
                />
              </a>
            </ul>

            <ul className="navbar-nav float-right">
              <li>
                <a
                  href="# "
                  className="nav-link   text-white font-weight-bold"
                  style={{ marginTop: "0px" }}
                >
                  ABOUT
                </a>
              </li>

              <li>
                <a
                  href="# "
                  className="nav-link   text-white font-weight-bold"
                  style={{ marginTop: "0px" }}
                >
                  <form onSubmit={this.props.submit1}>
                    <select
                      name="location"
                      className="form-control minimal"
                      onChange={this.props.load1}
                      style={{
                        width: "120px",
                        marginTop: "-12px",
                        borderRadius: "4px"
                      }}
                    >
                      <option value="" selected hidden disabled>
                        Country
                      </option>
                      <option value="">All</option>
                      {options1}
                    </select>
                  </form>
                </a>
              </li>

              <li>
                <a
                  className="nav-link  text-white"
                  href="https://vivadrive.io/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  By{" "}
                  <img
                    src={viva}
                    alt="Header logo"
                    style={{
                      height: "20px",
                      width: "100px",
                      marginTop: "0px"
                    }}
                  />
                </a>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    );
  }
}

export default Header;
