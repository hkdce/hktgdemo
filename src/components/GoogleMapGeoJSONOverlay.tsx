/// <reference types="googlemaps" />
/// <reference types="geojson" />

import React from 'react';
import { GoogleMapContext } from './GoogleMap';

declare const google: any;

const tinycolor = require('tinycolor2');

type State = {
  data: google.maps.Data | null;
  selectedFeature?: google.maps.Data.Feature;
}

type OwnProps = {
  geojsons: GeoJSON.Feature[]; // Does not support mutating after initialization.
  visible: boolean;
  color?: string;
  highlightOnMouseOver?: boolean;
  onFeatureClick?: (feature: google.maps.Data.Feature) => void;
  selectedFeatureProperty?: [string, string];
}

type Props = OwnProps;

const isFeatureMatching = (feature: google.maps.Data.Feature, featureProperty: [string, string]): boolean => {
  return feature.getProperty(featureProperty[0]) === featureProperty[1];
}

class GoogleMapGeoJSONOverlay extends React.Component<Props, State> {
  static contextType = GoogleMapContext;

  constructor(props: Props) {
    super(props);
    this.state = {
      data: null
    };
  }

  componentDidMount() {
    if (!this.state.data) {
      const data = this.createDataObjectFromProp(this.props);
      this.setState({ data });
    }
  }

  componentWillUnmount() {
    if (!this.state.data) return;

    this.state.data.setMap(null);
    this.state.data.unbindAll();
    this.setState({ data: null });
  }

  componentDidUpdate(prevProps: Props) {
    this.componentDidGeoJsonUpdate(prevProps);
    this.componentDidSelectedFeatureUpdate(prevProps);
  }

  componentDidGeoJsonUpdate(prevProps: Props) {
    if (!this.state.data) return;
    if (this.props.geojsons === prevProps.geojsons) return;

    const data = this.state.data;
    data.forEach(data.remove.bind(data));

    this.props.geojsons.forEach(geojson => {
      data.addGeoJson(geojson);
    });
  }

  componentDidSelectedFeatureUpdate(prevProps: Props) {
    if (!this.state.data) return;
    if (this.props.selectedFeatureProperty === prevProps.selectedFeatureProperty) return;

    const prevSelectedFeatureProperty = prevProps.selectedFeatureProperty;
    if (prevSelectedFeatureProperty) {
      this.state.data.forEach(f => {
        if (isFeatureMatching(f, prevSelectedFeatureProperty)) {
          this.changeFeatureStyle(this.state.data as google.maps.Data, f, false);
        }
      });
    }

    const currentSelectedFeatureProperty = this.props.selectedFeatureProperty;
    if (currentSelectedFeatureProperty) {
      this.state.data.forEach(f => {
        if (isFeatureMatching(f, currentSelectedFeatureProperty)) {
          this.changeFeatureStyle(this.state.data as google.maps.Data, f, false);
        }
      });
    }
  }

  render() {
    const data = this.state.data;
    if (data) {
      const nextMap: google.maps.Map = this.props.visible ? this.context : null;
      if (data.getMap() !== nextMap) {
        data.setMap(nextMap);
      }
      const currentStyle: google.maps.Data.StyleOptions = data.getStyle() as google.maps.Data.StyleOptions;
      if (currentStyle.fillColor !== this.props.color) {
        currentStyle.fillColor = this.props.color;
        data.setStyle(currentStyle);
      }
    }

    return null;
  }

  createDataObjectFromProp(props: Props) {
    const data: google.maps.Data = new google.maps.Data();
    props.geojsons.forEach(geojson => {
      data.addGeoJson(geojson);
    });

    const style: google.maps.Data.StyleOptions = {
      strokeWeight: 1.25,
      fillOpacity: 0.3,
    }
    data.setStyle(style);

    data.addListener('mouseover', this.onMouseOver.bind(this));
    data.addListener('mouseout', this.onMouseOut.bind(this));
    data.addListener('click', this.onClick.bind(this));

    return data;
  }

  onMouseOver(event: google.maps.Data.MouseEvent) {
    const data = this.state.data;
    if (!data) return;

    if (this.props.highlightOnMouseOver) {
      this.changeFeatureStyle(data, event.feature, true);
    }
  }

  onMouseOut(event: google.maps.Data.MouseEvent) {
    const data = this.state.data;
    if (!data) return;

    if (this.props.highlightOnMouseOver) {
      this.changeFeatureStyle(data, event.feature, false);
    }
  }

  onClick(event: google.maps.Data.MouseEvent) {
    if (this.props.onFeatureClick) {
      this.props.onFeatureClick(event.feature);
    }
  }

  changeFeatureStyle(data: google.maps.Data, feature: google.maps.Data.Feature, isMouseOver: boolean) {
    const isSelectedFeature = this.props.selectedFeatureProperty ? isFeatureMatching(feature, this.props.selectedFeatureProperty) : false;

    if (!isMouseOver && !isSelectedFeature) {
      data.revertStyle(feature);
    } else {
      const defaultStyle = (data.getStyle() as google.maps.Data.StyleOptions);
      const defaultFillColor = defaultStyle.fillColor;
      const fillColor = isSelectedFeature ? tinycolor("yellow") : tinycolor(defaultFillColor).brighten(20);
      data.overrideStyle(feature, { fillColor });
    }
  }
}

export default GoogleMapGeoJSONOverlay;
