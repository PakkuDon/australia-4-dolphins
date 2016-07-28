// first of course react!
import React from 'react';
import { Map, Marker, TileLayer } from 'react-leaflet';
require('leaflet/dist/leaflet.css');

const position = [-37.8086538,144.9629293];
class SignatureMap extends React.Component {
  render() {
    var markers = this.props.signatures.map((signature) => {
      return (
        <Marker key={signature.id} position={signature.location}></Marker>
      );
    });

    return (
      <div>
        <Map center={position} zoom={3}>
          <TileLayer url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          />
          {markers}
        </Map>
      </div>
    );
  }
}

export default SignatureMap;