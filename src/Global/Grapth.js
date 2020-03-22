import React, { Component } from "react";
import Sex from "./Graph/Sex";
import Age from "./Graph/Age";
import Death from "./Graph/Death";

export class Grapth extends Component {
  constructor(props) {
    super(props);

    this.state = {
      byAge: [],
      bySex: [],
      byDisease: [],
      main: []
    };
  }

  async componentDidMount() {
    const res = await fetch(
      `https://coronaviva.herokuapp.com/api/1/cronavirues/deathrate/`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer F9bQK456iUpJVZJLTZsMEKhhENqnGJ"
        }
      }
    );
    const main = await res.json();
    this.setState({
      main,
      byAge: main.byAge,
      bySex: main.bySex,
      byDisease: main.byComorbidity
    });
  }

  render() {
    return (
      <div>
        <div className="row">
          <div className="col-md-6 ">
            <Age state={this.state.byAge} />
          </div>

          <div className="col-md-6 ">
            <Sex state={this.state.bySex} />
          </div>
        </div>

        <div className="" style={{ marginTop: "15px" }}>
          <Death state={this.state.byDisease} />
        </div>
      </div>
    );
  }
}

export default Grapth;
