import React from "react";
import "./SideNav.css";
import { withRouter } from "react-router-dom";
import "./SideNav.css"



class Filter extends React.Component {
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
          <i class="fa fa-filter"></i>
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
          <h1
            className="text-dark text-center  h1 "
        
          >
           Filterview
          </h1>
          <hr></hr>
         <form  onSubmit={this.props.sub} >
         <div className="text-center" style={{width:"70%", margin: "0 auto"}}>
               <div class="form-group">
               <label htmlFor="Start Date" className="float-left"> Start Date</label>
                <input type="date" onChange={this.props.loadd} name="date_gte" className="form-control"  /> 
                
                </div>
                   <label htmlFor="Start Date" className="float-left"> End Date</label>
               <div class="form-group"> <input type="date"  onChange={this.props.loadd} name="date_lte" className="form-control"  /> </div>
               

               <div className="button">
               <button className="btn btn-info btn-block font-weight-bolder " >Search </button>
               
               </div>

               


               <div class="row text-left " style={{marginTop: "20px"}}>
                        <div class="col-md-12">
                            <div class="custom-control custom-checkbox">
                              <input type="checkbox" class="custom-control-input" id="exposure_points_control" defaultChecked />
                              <label class="custom-control-label" for="exposure_points_control">Exposure point</label>
                            </div>
                        </div>
                        <div class="col-md-12">
                            <div class="custom-control custom-checkbox">
                              <input type="checkbox" class="custom-control-input" id="bus_rides_control" defaultChecked />
                              <label class="custom-control-label" for="bus_rides_control">Bus ride</label>
                            </div>
                        </div>
                        <div class="col-md-12">
                            <div class="custom-control custom-checkbox">
                              <input type="checkbox" class="custom-control-input" id="train_rides_control" defaultChecked />
                              <label class="custom-control-label" for="train_rides_control">Train ride</label>
                            </div>
                        </div>
                        <div class="col-md-12">
                            <div class="custom-control custom-checkbox">
                              <input type="checkbox" class="custom-control-input" id="tram_rides_control" defaultChecked />
                              <label class="custom-control-label" for="tram_rides_control">Tram ride</label>
                            </div>
                        </div>
                        <div class="col-md-12">
                            <div class="custom-control custom-checkbox">
                              <input type="checkbox" class="custom-control-input" id="subway_rides_control" checked />
                              <label class="custom-control-label" for="subway_ride_control">Subway ride</label>
                            </div>
                        </div>
                    </div>
                    


               
               </div>


         </form>
        </div>
      </React.Fragment>
    );
  }
}

export default withRouter(Filter);
