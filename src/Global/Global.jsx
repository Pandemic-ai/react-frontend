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
import Grapth from "./Grapth";

class Global extends Component {
  constructor(props) {
    super(props);

    this.state = {
      stats: [],
      dataa: [],
      overall: [],
      area: [],
      country: ""
    };
    this.mapRef = createRef();
    this.groupRef = createRef();
  }

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
    // const group = this.groupRef.current.leafletElement; //get native featureGroup instance
    // mapInst.fitBounds(group.getBounds());

    this.state.overall.map(c =>
      mapInst.flyTo([c.lat, c.long], 8, {
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

    // this.state.area.map(c =>
    //   mapInst.flyTo([c.lat, c.long], 8, {
    //     animate: true,
    //     duration: 2 // in seconds
    //   })
    // );
  }

  async componentDidMount() {
    // const res = await fetch(`https://api.the2019ncov.com/api/cases`);
    // const stats = await res.json();
    // this.setState({
    //   stats,
    //   dataa: stats.data
    // });

    this.handleArea("");
    this.handleOverview("");
  }

  async onChange(e) {
    await this.setState({
      [e.target.name]: e.target.value
    });
    this.handleArea("");
    this.handleOverview("");
  }

  render() {
    const { dataa, overall } = this.state;

    // const withConfirmedData = dataa.filter(
    //   i => i.dates[i.dates.length - 1].confirmed
    // );
    const data = [];

    dataa.forEach(item => {
      const { confirmed } = item.dates[item.dates.length - 1];
      const { recovered } = item.dates[item.dates.length - 1];
      const { death } = item.dates[item.dates.length - 1];
      // item => item.dates[item.dates.length - 1].confirmed;

      data.push({
        ...item,
        confirmed,
        recovered,
        death
      });
    });

    const totalconfirm = overall.reduce((accumulator, pilot) => {
      var output = accumulator + pilot.totalConfirmed;
      return output;
    }, 0);

    const totaldeath = overall.reduce((accumulator, pilot) => {
      var output = accumulator + pilot.totalDeaths;
      return output;
    }, 0);

    const totalrecovered = overall.reduce((accumulator, pilot) => {
      var output = accumulator + pilot.totalRecovered;
      return output;
    }, 0);

    const activecase = totalconfirm - (totalrecovered + totaldeath);

    return (
      <div>
        <div className="row" style={{ width: "100%" }}>
          <div className="col-md-2 middlee">
            <div className="text-center" style={{ paddingTop: "15px" }}>
              <h1
                className="font-weight-bolder"
                style={{ fontSize: "40px", color: "red" }}
              >
                {" "}
                <CountTo to={totalconfirm} speed={1500} />
              </h1>
              <h2 style={{ marginTop: "-10px", color: "white" }}>Confirmed</h2>

              <form>
                <input
                  className="form-control fass"
                  placeholder="Country"
                  name="country"
                  onChange={this.onChange.bind(this)}
                  style={{ background: "black", color: "white" }}
                />
              </form>
              <hr></hr>
            </div>

            <div className="listss" style={{ paddingLeft: "15px" }}>
              {overall.map(c => (
                <h6 className="font-weight-bold confirmm">
                  <span style={{ fontSize: "17px", color: "red" }}>
                    {c.totalConfirmed}
                  </span>
                  &nbsp;&nbsp;
                  <span style={{ fontSize: "16px", color: "white" }}>
                    {c.country}
                  </span>
                </h6>
              ))}
            </div>
          </div>
          <div className="col-md-10 middlee1">
            {/* <div className="row" style={{ width: "100%" }}>
              <div className="col-md-3 hello" style={{ marginTop: "0px" }}>
                <div className="text-center box-crona11 ">
                  <h3 className="font-weight-bold">
                    <CountTo to={totalconfirm} speed={1500} />
                  </h3>
                  <h2>Confirmed</h2>
                </div>
              </div>

              <div className="col-md-3 hello" style={{ marginTop: "0px" }}>
                <div className="text-center  box-crona11">
                  <h3 className="font-weight-bold">
                    <CountTo to={totaldeath} speed={1200} />
                  </h3>
                  <h2>Deaths</h2>
                </div>
              </div>
              <div className="col-md-3 hello" style={{ marginTop: "0px" }}>
                <div className="text-center  box-crona11">
                  <h3 className="font-weight-bold">
                    <CountTo to={totalrecovered} speed={1100} />
                  </h3>
                  <h2>Recovered</h2>
                </div>
              </div>

              <div className="col-md-3 hello" style={{ marginTop: "0px" }}>
                <div className="text-center  box-crona11">
                  <h3 className="font-weight-bold">
                    <CountTo to={activecase} speed={1150} />
                  </h3>
                  <h2>Active</h2>
                </div>
              </div>
            </div> */}
            <div className="row" style={{ width: "100%" }}>
              <div className="col-md-8">
                <Map
                  center={[20.5937, 78.9629]}
                  style={{ height: "70vh", width: "100%" }}
                  zoom={4}
                  ref={this.mapRef}
                  className="map_map margin-zero map-padding"
                >
                  {/* <Marker position={[51.9194, 19.1451]} markerCluster={true}>
            <Popup>Hello</Popup>
          </Marker> */}
                  <FeatureGroup ref={this.groupRef}>
                    {this.state.overall.map(c => (
                      <CircleMarker
                        center={[c.lat, c.long]}
                        color="red"
                        fillColor="#f00"
                        fillOpacity="0.35"
                        stroke={false}
                        radius={
                          c["totalConfirmed"] < 500
                            ? `${c["totalConfirmed"] / 20}`
                            : `${
                                c["totalConfirmed"] < 1500
                                  ? `${c["totalConfirmed"] / 120}`
                                  : `${
                                      c["totalConfirmed"] < 2500
                                        ? `${c["totalConfirmed"] / 250}`
                                        : `${
                                            c["totalConfirmed"] < 10000
                                              ? `${c["totalConfirmed"] / 600}`
                                              : `${
                                                  c["totalConfirmed"] < 20000
                                                    ? `${c["totalConfirmed"] /
                                                        1200}`
                                                    : `${
                                                        c["totalConfirmed"] <
                                                        50000
                                                          ? `${c[
                                                              "totalConfirmed"
                                                            ] / 3500}`
                                                          : ""
                                                      }`
                                                }`
                                          }`
                                    }`
                              }`
                        }
                        // radius={10}
                      >
                        <Popup autoPan={false}>
                          <div className="carrr1">
                            <h3> Confirmed Cases </h3>
                            <div>
                              <h5 gutterBottom variant="h5" component="h3">
                                Country/Region : {c["country"]}
                              </h5>

                              {c["province"] && (
                                <h6 gutterBottom variant="h5" component="h4">
                                  {" "}
                                  Province / State : {c["province"]}{" "}
                                </h6>
                              )}

                              <p
                                color="textSecondary text-secondary"
                                component="p"
                                className="lodl"
                              >
                                Confirmed:{" "}
                                <span className="main_list h6 font-weight-bolder ">
                                  {" "}
                                  <CountTo
                                    to={c["totalConfirmed"]}
                                    speed={534}
                                  />
                                </span>
                                <br></br>
                                Deaths:{" "}
                                <span className=" font-weight-bolder">
                                  <CountTo to={c["totalDeaths"]} speed={1634} />
                                </span>
                                <br></br>
                                Recovered:{" "}
                                <span className="recover_list font-weight-bolder">
                                  <CountTo
                                    to={c["totalRecovered"]}
                                    speed={1334}
                                  />
                                </span>
                                <br></br>
                                Active:{" "}
                                <span className="active_list font-weight-bolder">
                                  <CountTo
                                    to={
                                      c["totalConfirmed"] -
                                      (c["totalRecovered"] + c["totalDeaths"])
                                    }
                                    speed={550}
                                  />
                                </span>
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
              </div>
              <div className="col-md-4">
                <div
                  className="row"
                  style={{ width: "120%", paddingRight: "0px" }}
                >
                  {/* For Death Patient */}
                  <div className="col-md-6 middleed">
                    <div
                      className="text-center caaar"
                      style={{ paddingTop: "15px" }}
                    >
                      <h1
                        className="font-weight-bolder"
                        style={{ fontSize: "40px", color: "green" }}
                      >
                        {" "}
                        <CountTo to={totaldeath} speed={1200} />
                      </h1>
                      <h2 style={{ marginTop: "-10px", color: "white" }}>
                        Deaths
                      </h2>
                      <hr></hr>
                    </div>

                    <div className="listss" style={{ paddingLeft: "0px" }}>
                      {overall.map(c => (
                        <h6 className="font-weight-bold confirmm">
                          <span style={{ fontSize: "17px", color: "green" }}>
                            {c.totalDeaths}
                          </span>
                          &nbsp;&nbsp;
                          <span style={{ fontSize: "16px", color: "white" }}>
                            {c.country}
                          </span>
                        </h6>
                      ))}
                    </div>
                  </div>

                  {/* For Recovery Patient */}
                  <div className="col-md-6 middleed">
                    <div
                      className="text-center caaar"
                      style={{ paddingTop: "15px" }}
                    >
                      <h1
                        className="font-weight-bolder"
                        style={{ fontSize: "40px", color: "orange" }}
                      >
                        {" "}
                        <CountTo to={totalrecovered} speed={1100} />
                      </h1>
                      <h2 style={{ marginTop: "-10px", color: "white" }}>
                        Recovered
                      </h2>
                      <hr></hr>
                    </div>

                    <div className="listss" style={{ paddingLeft: "0px" }}>
                      {overall.map(c => (
                        <h6 className="font-weight-bold confirmm">
                          <span style={{ fontSize: "17px", color: "orange" }}>
                            {c.totalRecovered}
                          </span>
                          &nbsp;&nbsp;
                          <span style={{ fontSize: "16px", color: "white" }}>
                            {c.country}
                          </span>
                        </h6>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div style={{ marginTop: "15px" }}>
              {" "}
              <Grapth />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Global;
