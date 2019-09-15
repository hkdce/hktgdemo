import React from 'react';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import { connect } from 'react-redux';
import TGCaseSelectPane from './TGCaseSelectPane';
import TGCasePanel from './TGCasePanel';
import { ReduxState } from './Types';

import 'bootstrap/dist/css/bootstrap.css';
import './App.css';

type OwnProps = {
}

type StateProps = {
}

type DispatchProps = {
}

type Props = StateProps & OwnProps & DispatchProps;

const App: React.FunctionComponent<Props> = (props) => {
  return (
    <div className="App">
      <Container fluid={true} >
        <Row>
          <Col className="thinCol">
            <TGCaseSelectPane/>
          </Col>
          <Col className="thinCol" md="3">
            <TGCasePanel/>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

const mapStateToProps = (state: ReduxState): StateProps => {
  return {};
};

const ConnectedApp = connect(mapStateToProps)(App);
export default ConnectedApp;
