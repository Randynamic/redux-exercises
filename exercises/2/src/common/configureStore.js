import {createStore, applyMiddleware, compose, combineReducers} from 'redux';
import reduxLogger from 'redux-logger';
import thunk from 'redux-thunk';
import ajaxMiddleware from './middleware/ajax.middleware';
import * as reducers from './reducers';

export default function configureStore(initialState = {test: 'test'}) {
  const middleware = [thunk, ajaxMiddleware];

  let enhancer;

  if (__DEV__) {
    middleware.push(reduxLogger);
    enhancer = compose(
      applyMiddleware(...middleware),
      process.env.BROWSER && window.devToolsExtension ? window.devToolsExtension() : f => f,
    );
  } else {
    enhancer = applyMiddleware(...middleware);
  }

  const reducer = combineReducers({...reducers});
  const store = createStore(reducer, initialState, enhancer);

  // Hot reload reducers (requires Webpack or Browserify HMR to be enabled)
  if (__DEV__ && module.hot && process.env.BROWSER) {
    module.hot.accept('./reducers', () =>
      // eslint-disable-next-line global-require
      store.replaceReducer(require('./reducers').default),
    );
  }

  return store;
}
