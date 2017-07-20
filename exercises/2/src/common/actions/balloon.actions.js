export const FETCH_BALLOONS = 'FETCH_BALLOONS';
export const RANDOMIZE_BALLOONS = 'RANDOMIZE_BALLOONS';

export const fetchBalloons = () => ({
  type: FETCH_BALLOONS,
  url: '/api/balloons',
  method: 'GET',
});

export const randomizeBalloons = () => ({
  type: RANDOMIZE_BALLOONS,
});

export const getBalloons = () => next => next(fetchBalloons());
export const repositionBalloons = () => next => next(randomizeBalloons());

