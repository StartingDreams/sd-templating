import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { reactReduxFirebase, firebaseStateReducer } from 'react-redux-firebase'
import firebase from 'firebase'

const rrfConfig = {
  userProfile: 'users',
};

// initialize firebase instance
const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyCNpHltMel8PmbID0U8YON-Px8oAj7aAyI",
  authDomain: "sd-templating.firebaseapp.com",
  databaseURL: "https://sd-templating.firebaseio.com",
  projectId: "sd-templating",
  storageBucket: "sd-templating.appspot.com",
  messagingSenderId: "589884695631"
});

// Add reduxReduxFirebase to compose
const createStoreWithFirebase = compose(
  reactReduxFirebase(firebaseApp, rrfConfig), // firebase instance as first argument
)(createStore);

export default (rootReducer) => {
  const middleware = [thunk];
  const enhancers = [];
  const newRootReducer = combineReducers({
    firebase: firebaseStateReducer
  });

  enhancers.push(applyMiddleware(...middleware));
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  return createStoreWithFirebase(
    newRootReducer,
    composeEnhancers(...enhancers)
  );
};
