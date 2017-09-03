import { fromJS } from 'immutable';

export const Types = {
  TOGGLE_LEFT_DRAWER: 'ui/TOGGLE_LEFT_DRAWER',
  CLOSE_LEFT_DRAWER: 'ui/CLOSE_LEFT_DRAWER',
};

export const toggleLeftDrawer = () => ({
  type: Types.TOGGLE_LEFT_DRAWER,
});

export const closeLeftDrawer = () => ({
  type: Types.CLOSE_LEFT_DRAWER,
});

export const INITIAL_STATE = fromJS({
  leftDrawerOpen: false,
});

export default function reducer(state = INITIAL_STATE, action = {}) {
  switch (action.type) {
    case Types.TOGGLE_LEFT_DRAWER:
      return state.set('leftDrawerOpen', !state.get('leftDrawerOpen'));
    case Types.CLOSE_LEFT_DRAWER:
      return state.set('leftDrawerOpen', false);
    default:
      return state;
  }
}