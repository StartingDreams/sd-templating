import { fromJS } from 'immutable';

export const Types = {
  LOGIN: 'auth/LOGIN',
  LOGOUT: 'auth/LOGOUT',
};

export const login = user => ({
  type: Types.LOGIN,
  user,
});

export const logout = () => ({
  type: Types.LOGOUT,
});

export const INITIAL_STATE = fromJS({
  user: null,
  isAuthenticated: false,
});

export default function reducer(state = INITIAL_STATE, action = {}) {
  switch (action.type) {
    case Types.LOGIN:
      return state.withMutations(s => s
        .set('user', fromJS(action.user))
        .set('isAuthenticated', true));
    case Types.LOGOUT:
      return state.withMutations(s => s
        .set('user', null)
        .set('isAuthenticated', false));
    default:
      return state;
  }
}
