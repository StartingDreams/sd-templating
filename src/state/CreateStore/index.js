import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

export default (rootReducer) => {
  const middleware = [thunk];
  const enhancers = [];

  enhancers.push(applyMiddleware(...middleware));
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  return createStore(rootReducer, composeEnhancers(...enhancers));
};
