import { combineReducers } from 'redux';
import configureStore from './CreateStore';
import examples from '../ducks/examples';
import auth from '../ducks/auth';
import ui from '../ducks/ui';

export function createStore() {
  const rootReducer = combineReducers({
    examples,
    auth,
    ui,
  });

  return configureStore(rootReducer);
}

export default createStore;
