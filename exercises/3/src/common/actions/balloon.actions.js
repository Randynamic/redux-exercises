export const REMOVE_BALLOON = 'REMOVE_BALLOON';
export const RANDOMIZE_BALLOONS = 'RANDOMIZE_BALLOONS';

export const randomizeBalloons = () => ({
  type: RANDOMIZE_BALLOONS,
});

export const removeBalloon = (id) => ({
  type: REMOVE_BALLOON,
  id
});

export const killBaloon = (id) => next => next(removeBalloon(id))
export const repositionBalloons = () => next => next(randomizeBalloons());

