import React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import GoogleMap from './components/GoogleMap';
import { TGCase, ReduxState } from './Types';

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
        }
      </GoogleMap>
    );
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
