import React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import GoogleMap from './components/GoogleMap';
import { TGCase, ReduxState } from './Types';
import GoogleMapMarker from './components/GoogleMapMarker';
import GoogleMapHeatmap from './components/GoogleMapHeatmap';
import { selectCase } from './Actions';

declare const google: any;

type StateProps = {
  selectedCaseId?: string;
}

type OwnProps = {
  tgCasesList: TGCase[];
}

type DispatchProps = {
  dispatch: Dispatch;
}

type Props = StateProps & OwnProps & DispatchProps;

class TGCasesMap extends React.Component<Props> {

  render() {
    return (
      <GoogleMap>
        {
          this.props.tgCasesList.map(tgCase =>
            <GoogleMapMarker title={ tgCase.case_id }
                             tag={ tgCase.case_id } lat={ tgCase.lat } lng={ tgCase.lon }
                             visible={ true }
                             onClick={ this.onMarkerClick.bind(this)} />
          )
        }
        {
              <GoogleMapHeatmap 
                heatmapData = { 
                this.props.tgCasesList.map(tgCase =>
                  ({location: new google.maps.LatLng(tgCase.lat, tgCase.lon), weight:tgCase.quantity})
                )}
                visible={ true } />
        }
 
      </GoogleMap>
    );
  }

  onMarkerClick(caseId: string) {
    this.props.dispatch(selectCase(caseId));
  }
}

const mapStateToProps = (state: ReduxState): StateProps => {
  return {
    selectedCaseId: state.caseId
  };
};

export type TGCasesMapType = TGCasesMap;

const ConnectedTGCasesMap = connect(mapStateToProps, null, null, { forwardRef: true })(TGCasesMap);
export default ConnectedTGCasesMap;
