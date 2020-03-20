import React, { Component } from "react";
import logo from "../Img/White.png";

export class Main extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      map: [],
      address: "",
      location: ""
    };
  }
  async componentDidMount() {
    try {
      await fetch(`https://coronaviva.herokuapp.com/api/1/infected/data/`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer F9bQK456iUpJVZJLTZsMEKhhENqnGJ"
        }
      })
        .then(data => data.json())
        .then(data => {
          this.setState({
            data
          });
        });
    } catch (err) {
      console.log(err);
    }
  }

  async handleSubmit1(e) {
    try {
      await fetch(
        `https://coronaviva.herokuapp.com/api/1/infected/data/?address__icontains=${this.state.address}&location__icontains=${this.state.location}`,
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
    } catch (err) {
      console.log(err);
    }
  }

  // async onChange(e) {
  //   await this.setState({
  //     [e.target.name]: e.target.value
  //   });
  // }

  async onChange1(e) {
    await this.setState({
      [e.target.name]: e.target.value
    });
    this.handleSubmit1("");
  }

  async handleClick(e) {
    e.preventDefault();
    const token = "tjdhd96826492749026269296428692904277272";
    localStorage.setItem("Token", token);
    this.props.history.push({
      pathname: "/mapview/",
      state: {
        address: this.state.address,
        location: this.state.location
      }
    });
  }

  render() {
    const country = [...new Set(this.state.data.map(i => i.location))];
    const city = [...new Set(this.state.map.map(i => i.address))];

    const options1 = [];
    for (var i = 0; i < country.length; i++) {
      const don = country[i];

      options1.push(
        <option value={don} key={don}>
          {don}
        </option>
      );
    }

    const options11 = [];
    for (var i = 0; i < city.length; i++) {
      const don = city[i];

      options11.push(
        <option value={don} key={don}>
          {don}
        </option>
      );
    }
    return (
      <div className="heelo" style={{ margin: "0 auto", maxWidth: "350px" }}>
        <div className="Logo_image">
          <h1 className="text-center text-white">
            <img src={logo} alt="Main Logo" />
          </h1>
        </div>

        <div style={{ marginTop: "30px" }}>
          <form onSubmit={this.handleClick.bind(this)}>
            <label htmlFor="About country">
              What country are you living?{" "}
              <span style={{ color: "yellow" }}>*</span>
            </label>
            <select
              name="location"
              className="form-control minimal"
              onChange={this.onChange1.bind(this)}
            >
              <option value="" selected hidden disabled>
                Choose a country
              </option>
              <option value="">All</option>
              {options1}
            </select>

            <p
              className="text-white"
              style={{ marginTop: "15px", fontSize: "13px" }}
            >
              If you want to receieve a daily update about a covid-19 risk in
              your neighbourhood, please leave your email address and your
              location.
            </p>

            <label htmlFor="About country" style={{ marginTop: "15px" }}>
              Your city(Optional)
            </label>
            <select
              name="address"
              onChange={this.onChange1.bind(this)}
              className="form-control minimal"
            >
              <option value="" selected hidden disabled>
                Choose a city
              </option>
              {options11}
            </select>

            <label htmlFor="About country" style={{ marginTop: "35px" }}>
              Your email(Optional)
            </label>
            <input
              type="text"
              placeholder="rahul@vivadrive.io"
              name="email"
              className="form-control"
            />

            <div style={{ marginTop: "40px" }}>
              <button className="btn btn-apply btn-block">CONTINUE</button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default Main;
