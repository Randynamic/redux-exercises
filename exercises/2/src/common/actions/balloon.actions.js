export const FETCH_BALLOONS = 'FETCH_BALLOONS';

export const fetchBalloons = () => ({
  type: FETCH_BALLOONS,
  url: '/api/balloons',
  method: 'GET',
});

export const getBalloons = () => next => next(fetchBalloons());

