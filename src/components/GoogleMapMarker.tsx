/// <reference types="googlemaps" />

import React from 'react';
import { GoogleMapContext } from './GoogleMap';

declare const google: any;

type State = {
  marker?: google.maps.Marker;
}

type OwnProps = {
  lat: number;
  lng: number;
  title: string;
  tag: string;
  visible: boolean;
  onClick?: (tag: string) => void;
}

type Props = OwnProps;

class GoogleMapMarker extends React.Component<Props, State> {
  static contextType = GoogleMapContext;

  constructor(props: Props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    if (!this.state.marker) {
      const marker = this.createMarkerFromProp(this.props);
      this.setState({ marker });
    }
  }

  componentWillUnmount() {
    if (!this.state.marker) return;

    this.state.marker.setMap(null);
    this.state.marker.unbindAll();
    this.setState({ marker: undefined });
  }

  render() {
    const marker = this.state.marker;
    if (marker) {
      const nextMap: google.maps.Map = this.props.visible ? this.context : null;
      if (marker.getMap() !== nextMap) {
        marker.setMap(nextMap);
      }
    }

    return null;
  }

  createMarkerFromProp(props: Props) {
    const marker: google.maps.Marker = new google.maps.Marker({
      position: { lat: props.lat, lng: props.lng },
      title: props.title
    });
    marker.addListener('click', this.onClick.bind(this, props.tag));

    return marker;
  }

  onClick(tag: string) {
    if (this.props.onClick) {
      this.props.onClick(tag);
    }
  }
}

export default GoogleMapMarker;
