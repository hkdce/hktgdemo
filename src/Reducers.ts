import { createReducer } from 'redux-starter-kit';
import { ReduxState } from './Types';
import { selectCase } from './Actions';

export const initialState: ReduxState = {
  caseId: undefined,
}

const reducers = createReducer<ReduxState>(initialState, {
  [selectCase.type]: (state: ReduxState, action) => { state.caseId = action.payload },
});

export default reducers;
