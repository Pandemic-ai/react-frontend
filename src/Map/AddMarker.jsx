import React, { Component } from "react";
import {
  Map,
  TileLayer,
  Marker,
  Popup
  // CircleMarker,
  // Circle,
  // FeatureGroup
} from "react-leaflet";
class SimpleExample extends Component {
  constructor() {
    super();
    this.state = {
      markers: [[51.505, -0.09]]
    };
  }

  addMarker = e => {
    const { markers } = this.state;
    markers.push(e.latlng);
    this.setState({ markers });
  };

  render() {
    return (
      <Map center={[51.505, -0.09]} onClick={this.addMarker} zoom={13}>
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png"
        />
        {this.state.markers.map((position, idx) => (
          <Marker key={`marker-${idx}`} position={position}>
            <Popup>
              <span>
                A pretty CSS3 popup. <br /> Easily customizable.
              </span>
            </Popup>
          </Marker>
        ))}
      </Map>
    );
  }
}

export default SimpleExample;
