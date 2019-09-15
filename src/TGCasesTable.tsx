import React from 'react';
import { BootstrapTable, SelectRow, SelectRowMode, SortOrder, TableHeaderColumn } from 'react-bootstrap-table';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { TGCase, ReduxState } from './Types';
import { selectCase } from './Actions';

import '../node_modules/react-bootstrap-table/dist/react-bootstrap-table-all.min.css';

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

const tableOptions = {
  defaultSortName: 'case_id',
  defaultSortOrder: 'asc' as SortOrder
};

const TGCasesTable: React.FunctionComponent<Props> = (props) => {
  const selectRowProp: SelectRow = {
    mode: 'radio' as SelectRowMode,
    bgColor: '#78deee',
    clickToSelect: true,
    selected: props.selectedCaseId ? [ props.selectedCaseId ] : undefined,
    onSelect: (row, isSelected: boolean) => { if (isSelected) props.dispatch(selectCase(row['case_id'])) }
  };

  return (
    <BootstrapTable condensed={ true } data={ props.tgCasesList } options={ tableOptions } selectRow={ selectRowProp } version='4'>
      <TableHeaderColumn isKey dataField='case_id' dataSort={ true }>Case ID</TableHeaderColumn>
      <TableHeaderColumn dataField='case_datetime' dataSort={ true }>Case DateTime</TableHeaderColumn>
      <TableHeaderColumn dataField='case_site' dataSort={ true }>Case Site</TableHeaderColumn>
      <TableHeaderColumn dataField='quantity' dataSort={ true }>Quantity</TableHeaderColumn>
    </BootstrapTable>
  );
}

const mapStateToProps = (state: ReduxState): StateProps => {
  return {
    selectedCaseId: state.caseId
  };
};

const ConnectedTGCasesTable = connect(mapStateToProps, null, null, { forwardRef: true })(TGCasesTable);
export default ConnectedTGCasesTable;
