import React, { Component } from "react";
import {
  Map,
  TileLayer,
  Marker,
  Popup,
  CircleMarker,
  Circle
} from "react-leaflet";
import L from "leaflet";
// import MarkerPopup from "./MarkerPop";
import Header from "../Layout/Header";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

export class Mapp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      map: [],
      open: false,
      date_gte: "",
      date_lte: "",
      location: "",
      address: ""
    };
    this.onChange = this.onChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  toggleHiddden() {
    this.setState({
      open: true
    });
  }

  toggleHiddden1() {
    this.setState({
      open: false
    });
  }

  async handleSubmit(e) {
    e.preventDefault();
    try {
      await fetch(
        `https://coronaviva.herokuapp.com/api/1/infected/data/?address__icontains=${this.state.address}&location__icontains=${this.state.location}&date__gte=${this.state.date_gte}&date__lte=${this.state.date_lte}`,
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


  async onChange(e){
    await this.state({
      [e.target.name] : e.target.value
    })
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
        .then(map => map.json())
        .then(map => {
          this.setState({
            map
          });
        });
    } catch (err) {
      console.log(err);
    }

    let mapInst = this.refs.map.leafletElement.getBounds
    console.log(mapInst);
  }

  render() {
    const { map } = this.state;

    const pointerIcon = new L.Icon({
      iconUrl:
        "https://icons.iconarchive.com/icons/paomedia/small-n-flat/512/map-marker-icon.png",
      iconAnchor: [25, 40],
      iconSize: [50, 50]
    });
    return (
      <div>
        <Header state={this.state} load={this.onChange}  submit={this.handleSubmit}/>
        <Map
          center={[51.9194, 19.1451]}
          style={{ height: "100vh", width: "auto" }}
          zoom={4}
          ref="map"
          bounceAtZoomLimits={true}
          maxBoundsViscosity={0.95}
          maxBounds={[
            [-180, -90],
            [180, 90]
          ]}
          //   bounds={this.boundsUpdated.bind(this)}
          className="map_map margin-zero map-padding"
        >
          {map.map(c => (
            <Marker
              position={[c.latitude, c.longitude]}
              icon={pointerIcon}
              onclick={this.toggleHiddden.bind(this)}
            >
              <Popup autoPan={false}>
                {/* <Modal
                  //   className={classes.modal}
                  open={this.state.open}
                  //   classes={{ root: classes.root }}
                  onClose={this.toggleHiddden1.bind(this)}
                  BackdropComponent={Backdrop}
                  BackdropProps={{
                    timeout: 0,
                    invisible: true
                  }}
                > */}
                <Card className="carrr">
                  {/* <button
                    className="don btn"
                    onClick={this.toggleHiddden1.bind(this)}
                  >
                    X
                  </button> */}
                  {c.location === "Israel" ? (
                    <img
                      className="image"
                      src="https://thehill.com/sites/default/files/styles/article_full/public/telaviv_skyline_09202018.jpg?itok=pxhk1Rtl"
                      alt="Contemplative Reptile"
                    />
                  ) : (
                    <img
                      className="image"
                      src="https://www.dwf.law/-/media/DWF/Images/Locations-Assets/Warsaw/Warsaw-700-x-388.ashx"
                      alt="Contemplative Reptile"
                    />
                  )}
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                      Place : {c.location}
                    </Typography>

                    <h6>Address : {c.address}</h6>

                    <p
                      color="textSecondary text-secondary"
                      component="p"
                      className="lodl"
                    >
                      PlaceType : {c.place_type}
                      <br></br>
                      Start Hour : {c.start_hour}{" "}
                      {c.start_hour > "12" ? "PM" : "AM"} <br></br>
                      End Hour : {c.end_hour} {c.end_hour > "12" ? "PM" : "AM"}
                    </p>
                  </CardContent>
                </Card>
                {/* </Modal> */}
              </Popup>
              {/* <MarkerPopup
                open={this.state.open}
                detail={c}
                setOpen={this.toggleHiddden1.bind(this)}
              /> */}
              {/* <Circle
                center={[c.latitude, c.longitude]}
                fillColor="red"
                radius={2000}
              /> */}
            </Marker>
          ))}
          {/* {map.map(c => (
            <CircleMarker
              center={[c.latitude, c.longitude]}
              radius={15}
              //   fill="true"

              color="red"
              fillColor="#f00"
              fillOpacity="0.35"
              stroke={false}
            >
              <Popup>
                <span>hello</span>
                <br />
              </Popup>
            </CircleMarker>
          ))} */}

          <TileLayer
            noWrap={true}
             url="https://tiles.stadiamaps.com/tiles/outdoors/{z}/{x}/{y}{r}.png" //alidade_smooth_dark //alidade_smooth
            //url ="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}{r}.png"
            subdomains="1234"
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreepMap</a>  &nbsp; By: <a href="https://vivadrive.io/" targe ="_blank">VivaDrive</a>'
          />
        </Map>
      </div>
    );
  }
}

export default Mapp;
