import createReducer from '../helper/reducer.helper';
import {REMOVE_BALLOON, RANDOMIZE_BALLOONS} from '../actions/balloon.actions';

const initialState = {
  data: {},
};

const actionsMap = {
  [REMOVE_BALLOON]: removeBalloon,
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

function removeBalloon({state, action}) {
  // TODO Implement the removal of the balloon
  return state;
}


export default createReducer(initialState, actionsMap);

