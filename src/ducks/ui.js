export const Types = {
  TOGGLE_EXAMPLE: 'ui/CLICKED',
};

export const toggleExample = () => ({
  type: Types.TOGGLE_EXAMPLE,
});

export const INITIAL_STATE = {
  toggleExample: false,
};

export default function reducer(state = INITIAL_STATE, action = {}) {
  const newState = Object.assign({}, state);
  switch (action.type) {
    case Types.TOGGLE_EXAMPLE:
      newState.toggleExample = !state.toggleExample;
      return newState;
    default:
      return state;
  }
}
