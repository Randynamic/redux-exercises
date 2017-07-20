import createReducer from '../helper/reducer.helper';
import {FETCH_BALLOONS, RANDOMIZE_BALLOONS} from '../actions/balloon.actions';

const initialState = {
  data: {},
};

const actionsMap = {
  [`${FETCH_BALLOONS}_SUCCESS`]: fetchStores,
  [RANDOMIZE_BALLOONS]: randomizeBalloonPosition,
};

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}

function randomizeBalloonPosition({state}){
  const balloons = state.data;
  for (const id in balloons) {
    balloons[id] = {
      position: {
        top: `${getRandomInt(1,50)}%`,
        left: `${getRandomInt(1,100)}%`,
      },
    };
  }

  return {
    ...state,
    data: {...state.data, ...balloons},
  };
}

function fetchStores({state, action}) {
  let randomizedBaloons = {};
  if (Object.keys(state.data).length > 100) {
    return initialState;
  }

  if (Object.keys(state.data).length > 50) {
    randomizedBaloons = randomizeBalloonPosition({state});
  }

  return {
    ...state,
    data: {...state.data, ...randomizedBaloons.data, ...action.payload,},
  };
}


export default createReducer(initialState, actionsMap);

