import React from "react";
import "./SideNav.css";
import { withRouter } from "react-router-dom";
import "./SideNav.css"



class Flight extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showNav: false,
      status: []
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
    let navCoverStyle = { width: showNav ? "100%" : "0" };
    let sideNavStyle = { width: showNav ? "270px" : "0" };

    return (
      <React.Fragment>
        <span onClick={this.openNavClick} class="open-nav text-white">
         <i className="fa fa-plane"></i>
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
          <p
            className="navbar-brand text-dark text-capitalize "
            style={{ paddingLeft: "30px" }}
          >
        
          </p>
          <hr></hr>
          <a href="/user/Dashboard/">
            <span>
              <i className="fa fa-desktop"></i>{" "}
            </span>{" "}
            &nbsp; &nbsp; Dashboard
          </a>
          <a href="/user/addblog/">
            <span>
              <i className="fa fa-plus"></i>{" "}
            </span>{" "}
            &nbsp; &nbsp; Add Blog
          </a>
          <a href="/user/viewprofile/">
            <span>
              <i className="fa fa-eye"></i>{" "}
            </span>{" "}
            &nbsp; &nbsp; View Profile
          </a>
          <a href="/user/editprofile/">
            <span>
              <i className="fa fa-pen"></i>{" "}
            </span>{" "}
            &nbsp; &nbsp; Edit Profile
          </a>

        
            <span>
              <a href="/admin/userlist/">
                <span>
                  <i className="fa fa-tasks"></i>{" "}
                </span>{" "}
                &nbsp; &nbsp; User List
              </a>

              <a href="/user/editprofile/">
                <span>
                  <i className="fa fa-pen"></i>{" "}
                </span>{" "}
                &nbsp; &nbsp; Email List
              </a>

              <a href="/admin/bloglist/">
                <span>
                  <i className="fa fa-pen"></i>{" "}
                </span>{" "}
                &nbsp; &nbsp; All Blog
              </a>
            </span>
          

          <a
            className="dropdown-item  js-scroll-trigger "
            style={{ color: "#212226" }}
            href="# "
            onClick={this.onLogout}
          >
            <span>
              <i className="fa fa-sign-out"></i>{" "}
            </span>{" "}
            &nbsp; &nbsp; Logout
          </a>

          <div className="row">
            <div className="col-sm-2">
              {" "}
              <a href=" " style={{ marginRight: "14px" }}>
                <i className="fab fa-facebook"></i>
              </a>
            </div>
            <div className="col-sm-2">
              <a href=" " style={{ marginRight: "14px" }}>
                <i className="fab fa-instagram"></i>
              </a>
            </div>
            <div className="col-sm-2">
              <a href=" " style={{ marginRight: "14px" }}>
                <i className="fab fa-linkedin"></i>
              </a>
            </div>
            <div className="col-sm-2">
              {" "}
              <a href=" ">
                <i className="fab fa-youtube"></i>
              </a>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default withRouter(Flight);
