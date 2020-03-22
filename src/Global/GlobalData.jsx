import React, { createRef, Component } from "react";
import {
  Map,
  TileLayer,
  Marker,
  Popup,
  CircleMarker,
  FeatureGroup
} from "react-leaflet";
import CountTo from "react-count-to";
import "leaflet/dist/leaflet.css";
// import moment from "moment";

class GlobalData extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showNav: false,
      overall: [],
      area: [],
      country: ""
    };
    this.mapRef = createRef();
    this.groupRef = createRef();
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

  async handleOverview() {
    const res = await fetch(
      `https://coronaviva.herokuapp.com/api/1/cronavirues/area/?country__icontains=${this.state.country}`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer F9bQK456iUpJVZJLTZsMEKhhENqnGJ"
        }
      }
    );
    const overall = await res.json();
    console.log(overall);
    this.setState({
      overall
    });

    let mapInst = this.mapRef.current.leafletElement;
    const group = this.groupRef.current.leafletElement; //get native featureGroup instance
    mapInst.fitBounds(group.getBounds());

    this.state.overall.map(c =>
      mapInst.flyTo([c.lat, c.lat], 8, {
        animate: true,
        duration: 2 // in seconds
      })
    );
  }

  async handleArea() {
    const res = await fetch(
      `https://coronaviva.herokuapp.com/api/1/cronavirues/overview/?country__icontains=${this.state.country}`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer F9bQK456iUpJVZJLTZsMEKhhENqnGJ"
        }
      }
    );
    const area = await res.json();
    console.log(area);
    this.setState({
      area
    });
    let mapInst = this.mapRef.current.leafletElement;
    const group = this.groupRef.current.leafletElement; //get native featureGroup instance
    mapInst.fitBounds(group.getBounds());

    this.state.area.map(c =>
      mapInst.flyTo([c.lat, c.lat], 8, {
        animate: true,
        duration: 2 // in seconds
      })
    );
  }

  async onChange(e) {
    await this.setState({
      [e.target.name]: e.target.value
    });
    this.handleArea(" ");
    this.handleOverview(" ");
  }

  componentDidMount() {
    this.handleArea(" ");
    this.handleOverview(" ");
    // let mapInst = this.mapRef.current.leafletElement;
    // const group = this.groupRef.current.leafletElement; //get native featureGroup instance
    // mapInst.fitBounds(group.getBounds());
  }

  render() {
    const { showNav, overall, area } = this.state;
    let navCoverStyle = { width: showNav ? "100%" : "0" };
    let sideNavStyle = { width: showNav ? "100%" : "0" };

    const totalconfirm = area.reduce((accumulator, pilot) => {
      var output = accumulator + pilot.totalConfirmed;
      return output;
    }, 0);

    const totaldeath = area.reduce((accumulator, pilot) => {
      var output = accumulator + pilot.totalDeaths;
      return output;
    }, 0);

    const totalrecovered = area.reduce((accumulator, pilot) => {
      var output = accumulator + pilot.totalRecovered;
      return output;
    }, 0);

    const activecase = totalconfirm - totalrecovered;

    console.log(totaldeath, activecase, totalrecovered, totalconfirm);

    return (
      <React.Fragment>
        <span onClick={this.openNavClick} class="open-nav text-white">
          <i className="fa fa-bars fs"></i>
        </span>
        <div
          onClick={this.navCoverClick}
          class="nav-cover"
          style={navCoverStyle}
        />

        <div name="side-nav" class="side-nav" style={sideNavStyle}>
          <a
            href="# "
            onClick={this.closeNavClick}
            class="close-nav close-nav1"
            style={{ marginTop: "-20px" }}
          >
            &times;
          </a>
          <h1 className="h1" style={{ marginTop: "-43px" }}>
            Legend
            <form
              style={{
                float: "right",
                top: "-15px",
                left: "-5%",
                position: "relative"
              }}
            >
              <select className="form-control minimal" name="country">
                <option>India</option>
                <option>Germany</option>
                <option>Poland</option>
              </select>
            </form>
          </h1>

          <Map
            center={[20.5937, 78.9629]}
            style={{ height: "100vh", width: "100%" }}
            zoom={2}
            ref={this.mapRef}
            className="map_map margin-zero map-padding"
          >
            {/* <Marker position={[51.9194, 19.1451]} markerCluster={true}>
            <Popup>Hello</Popup>
          </Marker> */}
            <FeatureGroup ref={this.groupRef}>
              {overall.map(c => (
                <CircleMarker
                  center={[c.lat, c.long]}
                  color="red"
                  fillColor="#f00"
                  fillOpacity="0.35"
                  stroke={false}
                  radius={
                    c["confirmed"] < 500
                      ? `${c["confirmed"] / 20}`
                      : `${
                          c["confirmed"] < 1500
                            ? `${c["confirmed"] / 150}`
                            : `${
                                c["confirmed"] < 2500
                                  ? `${c["confirmed"] / 250}`
                                  : `${
                                      c["confirmed"] < 10000
                                        ? `${c["confirmed"] / 600}`
                                        : `${
                                            c["confirmed"] < 20000
                                              ? `${c["confirmed"] / 1100}`
                                              : `${
                                                  c["confirmed"] < 50000
                                                    ? `${c["confirmed"] / 3500}`
                                                    : ""
                                                }`
                                          }`
                                    }`
                              }`
                        }`
                  }
                >
                  <Popup autoPan={false}>
                    <div className="carrr">
                      <h3> Confirmed Cases </h3>
                      <div>
                        <h5 gutterBottom variant="h5" component="h3">
                          Country/Region : {c["Country/Region"]}
                        </h5>

                        {c["Province/State"] && (
                          <h6 gutterBottom variant="h5" component="h4">
                            {" "}
                            Province / State : {c["Province/State"]}{" "}
                          </h6>
                        )}

                        <p
                          color="textSecondary text-secondary"
                          component="p"
                          className="lodl"
                        >
                          Confirmed:{" "}
                          <span className="main_list h6 font-weight-bolder">
                            {" "}
                            <CountTo to={c["confirmed"]} speed={534} />
                          </span>
                          <br></br>
                          Deaths: <CountTo to={c["death"]} speed={1634} />
                          <br></br>
                          Recovered:{" "}
                          <CountTo to={c["recovered"]} speed={1334} />
                        </p>
                      </div>
                    </div>
                  </Popup>
                </CircleMarker>
              ))}
            </FeatureGroup>

            <TileLayer
              // noWrap={true}
              url="https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png" //alidade_smooth_dark //alidade_smooth
              //url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              //url="https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png"
              // url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreepMap</a>  '
              // &nbsp; By: <a href="https://vivadrive.io/" targe ="_blank">VivaDrive</a>
            />
          </Map>

          {/* <div class="row">
            <div class="column left ">
              <h2>Column 1</h2>
              <p>Some text..</p>
            </div>
            <div class="column middle ">
              <div className="row" style={{ width: "100%" }}>
                <div className="col-md-3" style={{ marginTop: "0px" }}>
                  <div className="text-center box-crona11 ">
                    <h3 className="font-weight-bold">
                      <CountTo to={totalconfirm} speed={1500} />
                    </h3>
                    <h2>Confirmed</h2>
                  </div>
                </div>

                <div className="col-md-3" style={{ marginTop: "0px" }}>
                  <div className="text-center  box-crona11">
                    <h3 className="font-weight-bold">
                      <CountTo to={totaldeath} speed={1200} />
                    </h3>
                    <h2>Deaths</h2>
                  </div>
                </div>
                <div className="col-md-3" style={{ marginTop: "0px" }}>
                  <div className="text-center  box-crona11">
                    <h3 className="font-weight-bold">
                      <CountTo to={totalrecovered} speed={1100} />
                    </h3>
                    <h2>Recovered</h2>
                  </div>
                </div>

                <div className="col-md-3" style={{ marginTop: "0px" }}>
                  <div className="text-center  box-crona11">
                    <h3 className="font-weight-bold">
                      <CountTo to={activecase} speed={1150} />
                    </h3>
                    <h2>Active</h2>
                  </div>
                </div>
              </div>

              <div className="map-section">
                <Map
                  center={[20.5937, 78.9629]}
                  style={{ height: "70vh", width: "100%" }}
                  zoom={2}
                  ref={this.mapRef}
                  // className="map_map margin-zero map-padding"
                >
                  <FeatureGroup ref={this.groupRef}>
                    {overall.map(c => (
                      <CircleMarker
                        center={[c.lat, c.long]}
                        color="red"
                        fillColor="#f00"
                        fillOpacity="0.35"
                        stroke={false}
                        radius={
                          c["confirmed"] < 500
                            ? `${c["confirmed"] / 20}`
                            : `${
                                c["confirmed"] < 1500
                                  ? `${c["confirmed"] / 150}`
                                  : `${
                                      c["confirmed"] < 2500
                                        ? `${c["confirmed"] / 250}`
                                        : `${
                                            c["confirmed"] < 10000
                                              ? `${c["confirmed"] / 600}`
                                              : `${
                                                  c["confirmed"] < 20000
                                                    ? `${c["confirmed"] / 1100}`
                                                    : `${
                                                        c["confirmed"] < 50000
                                                          ? `${c["confirmed"] /
                                                              3500}`
                                                          : ""
                                                      }`
                                                }`
                                          }`
                                    }`
                              }`
                        }
                      >
                        <Popup autoPan={false}>
                          <div className="carrr">
                            <h3> Confirmed Cases </h3>
                            <div>
                              <h5 gutterBottom variant="h5" component="h3">
                                Country/Region : {c["Country/Region"]}
                              </h5>

                              {c["Province/State"] && (
                                <h6 gutterBottom variant="h5" component="h4">
                                  {" "}
                                  Province / State : {c["Province/State"]}{" "}
                                </h6>
                              )}

                              <p
                                color="textSecondary text-secondary"
                                component="p"
                                className="lodl"
                              >
                                Confirmed:{" "}
                                <span className="main_list h6 font-weight-bolder">
                                  {" "}
                                  <CountTo to={c["confirmed"]} speed={534} />
                                </span>
                                <br></br>
                                Deaths: <CountTo to={c["death"]} speed={1634} />
                                <br></br>
                                Recovered:{" "}
                                <CountTo to={c["recovered"]} speed={1334} />
                              </p>
                            </div>
                          </div>
                        </Popup>
                      </CircleMarker>
                    ))}
                  </FeatureGroup>

                  <TileLayer
                    // noWrap={true}
                    //url="https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png" //alidade_smooth_dark //alidade_smooth
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreepMap</a>  '
                  />
                </Map>
              </div>
            </div>
          </div> */}
        </div>
      </React.Fragment>
    );
  }
}

export default GlobalData;
