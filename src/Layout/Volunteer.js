import React from "react";
import "./SideNav.css";
import { withRouter } from "react-router-dom";
import "./SideNav.css";

class Voltu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showNav: false,
      show: false,
      random: 0
    };

    this.handleClick = this.handleClick.bind(this);
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

  handleClick() {
    const min = 30;
    const max = 100;
    const random = min + Math.random() * (max - min);
    this.setState({
      random,
      show: true
    });
  }

  onClick() {
    this.setState({
      show: false
    });
  }

  render() {
    const { showNav } = this.state;
    let navCoverStyle = {
      width: showNav ? "100%" : "0",
      marginLeft: showNav ? "270px" : "0"
    };
    let sideNavStyle = { width: showNav ? "100%" : "0" };

    return (
      <React.Fragment>
        <span onClick={this.openNavClick} class="open-nav text-white">
          <i class="fa fa-users fs"></i>
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
          <h1 className="h1 ">Volunteer Register</h1>
          <div class="container mt-5">
            <div class="row mt-5">
              <div class="container mt-5">
                <div class=" mb-12">
                  <button
                    type="button"
                    class="btn btn-success float-right"
                    data-toggle="modal"
                    data-target=".bd-example-modal-lg"
                  >
                    Register as volunteer
                  </button>
                </div>
                <div class=" mb-12">
                  <h2>Search for a Volunteer </h2>
                </div>

                <form>
                  <hr />
                  <div class="form-group">
                    <label>Country*</label>
                    <select name="country" class="form-control">
                      <option value="" disabled>
                        Select country
                      </option>
                      <option value="country"> POland </option>
                      <option value="country"> Kosova </option>
                      <option value="country"> Germany </option>
                    </select>
                  </div>

                  <div class="form-group">
                    <label>City*</label>
                    <select name="city" class="form-control">
                      <option value="" disabled>
                        Select city
                      </option>
                      <option value="city">City</option>
                    </select>
                  </div>

                  <div class="form-group">
                    <label>Volunteer type*</label>
                    <select name="role" class="form-control">
                      <option value="" disabled>
                        Select type
                      </option>

                      <option value="Food">Food</option>
                      <option value="Medicine">Medicine</option>
                    </select>
                  </div>

                  <div class="form-group ">
                    <label>Date</label>
                    <input
                      type="date"
                      class="form-control"
                      placeholder="date"
                      name="date"
                    />
                  </div>

                  <div class="form-group mt-3">
                    <button
                      type="submit"
                      class="btn btn-success mt-4 mb-3 col-md-2 btn-block btn-submit "
                    >
                      Search
                    </button>
                  </div>
                </form>

                <div class="half box-v">
                  <div class="box-v-inside">
                    <input
                      type="button"
                      class="btn btn-primary float-right"
                      value="Contact"
                    />
                    <h5>
                      Name: <b>Rahul Raj </b>
                    </h5>
                    <h6>Country: POland</h6>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div
            class="modal fade bd-example-modal-lg"
            tabindex="-1"
            role="dialog"
            aria-labelledby="myLargeModalLabel"
            aria-hidden="true"
          >
            <div class="modal-dialog modal-lg" role="document">
              <div class="modal-content p-3">
                <div class="col-md-12 p-3">
                  <h2 class="mt-5">Register as a Volunteer</h2>
                  <p>Help people in need</p>
                  <hr />
                  <form>
                    <div class="col-md-12 row">
                      <div class="col-md-6">
                        <div class="form-group ">
                          <label>Full name*</label>
                          <input
                            class="form-control"
                            placeholder="Full Name"
                            name="name"
                          />
                        </div>

                        <div class="form-group">
                          <label>Country*</label>
                          <select name="country" class="form-control">
                            <option value="">Select</option>
                            <option value="countr.country"> Country </option>
                          </select>
                        </div>

                        <div class="form-group">
                          <label>City*</label>
                          <select name="city" class="form-control">
                            <option value="">Select city</option>
                            <option value="city">City</option>
                          </select>
                        </div>
                      </div>

                      <div class="col-md-6">
                        <div class="form-group ">
                          <label>Address*</label>
                          <input
                            class="form-control"
                            placeholder="address"
                            name="address"
                          />
                        </div>

                        <div class="form-group ">
                          <label>Date*</label>
                          <input
                            type="date"
                            class="form-control"
                            placeholder="date"
                            name="date"
                          />
                        </div>

                        <div class="form-group">
                          <label>Volunteer type*</label>
                          <select name="role" id="role" class="form-control">
                            <option value="">Choose</option>

                            <option value="Food">Food</option>
                            <option value="Medicine">Medicine</option>
                          </select>
                        </div>
                      </div>
                    </div>
                    <div class="col-md-12 row">
                      <label>Information*</label>
                      <textarea
                        name="info"
                        class="form-control"
                        placeholder="Give more information about yourself"
                        rows="2"
                      ></textarea>
                    </div>
                    <br />
                    <div class="form-group col-md-4 float-right">
                      <button
                        type="submit"
                        class="btn btn-success btn-block btn-submit mt-2 mb-4"
                      >
                        Register
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default withRouter(Voltu);
