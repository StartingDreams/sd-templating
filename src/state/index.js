import { combineReducers } from 'redux';
import configureStore from './CreateStore';
import editor from '../ducks/editor';
import auth from '../ducks/auth';
import ui from '../ducks/ui';

export function createStore() {
  const rootReducer = combineReducers({
    editor,
    auth,
    ui,
  });

  return configureStore(rootReducer);
}

export default createStore;
