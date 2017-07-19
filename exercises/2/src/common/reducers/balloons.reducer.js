import createReducer from '../helper/reducer.helper';
import {FETCH_BALLOONS} from '../actions/balloon.actions';

const initialState = {
  data: {},
  renamed: false,
};

const actionsMap = {
  [`${FETCH_BALLOONS}_SUCCESS`]: fetchStores,
};

function fetchStores({state, action}) {
  return {
    ...state,
    data: {...state.data, ...action.payload},
    renamed: false,
  };
}


export default createReducer(initialState, actionsMap);

