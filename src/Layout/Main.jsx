import React, { Component } from "react";

export class Main extends Component {
  handleClick(e) {
    e.preventDefault();
    window.location.href = "/mapview/";
  }
  render() {
    return (
      <div className="heelo" style={{ margin: "0 auto", maxWidth: "350px" }}>
        <div className="Logo_image">
          <h1 className="text-center text-white">Pandemic.ai</h1>
        </div>

        <div style={{ marginTop: "30px" }}>
          <form>
            <label htmlFor="About country">
              What country are you living?{" "}
              <span style={{ color: "yellow" }}>*</span>
            </label>
            <select name="country" className="form-control minimal">
              <option value="" selected hidden disabled>
                Choose a country
              </option>
              <option>Poland</option>
              <option>India</option>
              <option>French</option>
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
            <select name="country" className="form-control minimal">
              <option value="" selected hidden disabled>
                Choose a city
              </option>
              <option>Poland</option>
              <option>India</option>
              <option>French</option>
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
              <button
                className="btn btn-apply btn-block"
                onClick={this.handleClick.bind(this)}
              >
                CONTINUE
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default Main;
