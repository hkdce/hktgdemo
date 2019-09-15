import React from 'react';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';

import { tgCases } from './data/Data';
import TGCasesMap, { TGCasesMapType } from './TGCasesMap';
import TGCasesTable from './TGCasesTable';

type Props = {
}

class DistrictSelectPane extends React.Component<Props> {
  private districtMapRef: React.RefObject<TGCasesMapType> = React.createRef();

  onTabUpdate() {
    if (this.districtMapRef.current) {
      this.districtMapRef.current.forceUpdate();
    }
  }

  render() {
    const tgCasesList = Object.values(tgCases);
    return (
      <Tabs defaultActiveKey="map" id="selectCasePane" onSelect={ () => this.onTabUpdate() }>
        <Tab style={{ height: "95vh" }} tabClassName="thinTab" eventKey="map" title="Map">
          <TGCasesMap ref={ this.districtMapRef } tgCasesList={ tgCasesList }/>
        </Tab>
        <Tab tabClassName="thinTab" eventKey="list" title="List">
          <TGCasesTable tgCasesList={ tgCasesList }/>
        </Tab>
      </Tabs>
    );
  }
}

export default DistrictSelectPane;
