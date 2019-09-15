/// <reference types="googlemaps" />

import React from 'react';
import { GoogleMapContext } from './GoogleMap';

declare const google: any;

type State = {
  heatmap?: google.maps.visualization.HeatmapLayer;
}

type HeatmapDataROW ={
  location:google.maps.LatLng;
  weight:number;
}

type OwnProps = {
  heatmapData: HeatmapDataROW[];
  visible: boolean;
}


type Props = OwnProps;

// Configuration for plotting
const heatmapMaxIntensity:number = 10.0;
const heatmapRadius:number = 25.0;

class GoogleMapHeatmap extends React.Component<Props, State> {
  static contextType = GoogleMapContext;


  constructor(props: Props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    if (!this.state.heatmap) {
      const heatmap = this.createHeatmapFromData(this.props);
      this.setState({ heatmap });
    }
  }

  componentWillUnmount() {
    if (!this.state.heatmap) return;

    this.state.heatmap.setMap(null);
    this.state.heatmap.unbindAll();
    this.setState({ heatmap: undefined });
  }

  render() {
    const heatmap = this.state.heatmap;
    if (heatmap) {
      const nextMap: google.maps.Map = this.props.visible ? this.context : null;
      if (heatmap.getMap() !== nextMap) {
        heatmap.setMap(nextMap);
      }
    }

    return null;
  }



  createHeatmapFromData(props: Props) {
    const Heatmap: google.maps.visualization.HeatmapLayer = new google.maps.visualization.HeatmapLayer({
        data: this.props.heatmapData, 
        maxIntensity: heatmapMaxIntensity,
        radius:heatmapRadius
    });

    return Heatmap;
  }

}

export default GoogleMapHeatmap;
