import React from 'react';
import Card from 'react-bootstrap/Card';
import { connect } from 'react-redux';
import { TGCase, ReduxState } from './Types';
import { tgCases } from './data/Data';

type StateProps = {
  caseId?: string;
}

type OwnProps = {
}

type DispatchProps = {
}

type Props = StateProps & OwnProps & DispatchProps;

const TGCasePanel: React.FunctionComponent<Props> = (props) => {
  if (props.caseId) {
    const tgCase: TGCase = tgCases[props.caseId];
    console.log(tgCases, props.caseId, tgCase);
    return (
      <Card>
        <Card.Header>{ tgCase.case_id }</Card.Header>
        <Card.Body>
        </Card.Body>
      </Card>
    );
  } else {
    return null;
  }
}

const mapStateToProps = (state: ReduxState): StateProps => {
  return {
    caseId: state.caseId,
  };
};

const ConnectedTGCasePanel = connect(mapStateToProps)(TGCasePanel);
export default ConnectedTGCasePanel;