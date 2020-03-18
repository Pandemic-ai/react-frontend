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

class Global extends Component {
  constructor(props) {
    super(props);

    this.state = {
      stats: [],
      dataa: []
    };
    this.mapRef = createRef();
    this.groupRef = createRef();
  }

  async componentDidMount() {
    const res = await fetch(`https://api.the2019ncov.com/api/cases`, {
      method: "GET",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE",
        "Access-Control-Allow-Credentials": true,
        "Access-Control-Allow-Headers":
          "Origin, X-Requested-With, Content-Type, Accept, Authorization"
      }
    });
    const stats = await res.json();
    this.setState({
      stats,
      dataa: stats.data
    });

    let mapInst = this.mapRef.current.leafletElement;
    const group = this.groupRef.current.leafletElement; //get native featureGroup instance
    mapInst.fitBounds(group.getBounds());
  }

  // locations = () => {
  //   const withConfirmedData = this.data.filter(
  //     i => i.dates[i.dates.length - 1].confirmed
  //   );
  //   console.log("Don", withConfirmedData);
  //   return withConfirmedData.map(item => ({
  //     ...item,
  //     radius: this.scale(item.dates[item.dates.length - 1].confirmed)
  //   }));
  // };

  render() {
    const { dataa } = this.state;

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

    return (
      <div>
        <Map
          center={[20.5937, 78.9629]}
          style={{ height: "100vh", width: "100%" }}
          zoom={4}
          ref={this.mapRef}
          className="map_map margin-zero map-padding"
        >
          {/* <Marker position={[51.9194, 19.1451]} markerCluster={true}>
            <Popup>Hello</Popup>
          </Marker> */}
          <FeatureGroup ref={this.groupRef}>
            {data.map(c => (
              <CircleMarker
                center={[c.Lat, c.Long]}
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
                        Recovered: <CountTo to={c["recovered"]} speed={1334} />
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
    );
  }
}

export default Global;
