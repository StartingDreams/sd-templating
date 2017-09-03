import { combineReducers } from 'redux';
import configureStore from './CreateStore';
import example from '../ducks/example';
import editor from '../ducks/editor';
import auth from '../ducks/auth';
import ui from '../ducks/ui';

export function createStore() {
  const rootReducer = combineReducers({
    example,
    editor,
    auth,
    ui,
  });

  return configureStore(rootReducer);
}

export default createStore;
