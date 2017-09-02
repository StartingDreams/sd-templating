import firebase from 'firebase';

export const Types = {
  TOGGLE: 'examples/TOGGLE',
  TOGGLE_INC: 'examples/TOGGLE_INC',
  SET_TOGGLE_COUNT: 'examples/SET_TOGGLE_COUNT',
};

export const toggle = () => ({
  type: Types.TOGGLE,
});

export const toggleCount = (toggleCount) => ({
  type: Types.SET_TOGGLE_COUNT,
  toggleCount,
});

export const watchToggleCounterOn = (dispatch) => {
  const counterRef = firebase.database().ref('examples/toggleCounter');
  counterRef.on('value', function(snapshot) {
    dispatch(toggleCount(snapshot.val()));
  });
};

export const watchToggleCounterOff = () => {
  firebase.database().ref('examples/toggleCounter').off();
};

export const incrementToggleCounter = (dispatch) => {
  const counterRef = firebase.database().ref('examples/toggleCounter');
  let counter = null;
  counterRef.once('value').then(function(snapshot) {
    counter = (snapshot.val() || 0) + 1;
  }).then(() => {
    if (counter !== null) {
      counterRef.set(counter).then(() => {
        dispatch(toggleCount(counter));
      });
    }
  });
};

export const INITIAL_STATE = {
  toggle: false,
  toggleCount: 0,
};

export default function reducer(state = INITIAL_STATE, action = {}) {
  const newState = Object.assign({}, state);
  switch (action.type) {
    case Types.SET_TOGGLE_COUNT:
      newState.toggleCount = action.toggleCount;
      return newState;
    case Types.TOGGLE:
      newState.toggle = !state.toggle;
      return newState;
    default:
      return state;
  }
}
