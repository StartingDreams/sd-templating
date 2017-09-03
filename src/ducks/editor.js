import { fromJS } from 'immutable';
import firebase from 'firebase';

const database = firebase.database();

export const Types = {
  GET_REQUEST_LAYOUTS: 'editor/GET_REQUEST_LAYOUTS',
  GET_FAILURE_LAYOUTS: 'editor/GET_FAILURE_LAYOUTS',
  GET_SUCCESS_LAYOUTS: 'editor/GET_SUCCESS_LAYOUTS',
  GET_REQUEST_TEMPLATES: 'editor/GET_REQUEST_TEMPLATES',
  GET_FAILURE_TEMPLATES: 'editor/GET_FAILURE_TEMPLATES',
  GET_SUCCESS_TEMPLATES: 'editor/GET_SUCCESS_TEMPLATES',
  GET_REQUEST_CONTENT_BLOCKS: 'editor/GET_REQUEST_CONTENT_BLOCKS',
  GET_FAILURE_CONTENT_BLOCKS: 'editor/GET_FAILURE_CONTENT_BLOCKS',
  GET_SUCCESS_CONTENT_BLOCKS: 'editor/GET_SUCCESS_CONTENT_BLOCKS',
};

export const getRequestLayouts = () => ({
  type: Types.GET_REQUEST_LAYOUTS,
});

export const getFailureLayouts = error => ({
  type: Types.GET_FAILURE_LAYOUTS,
  error,
});

export const getSuccessLayouts = layouts => ({
  type: Types.GET_SUCCESS_LAYOUTS,
  layouts,
});

export const getRequestTemplates = () => ({
  type: Types.GET_REQUEST_TEMPLATES,
});

export const getFailureTemplates = error => ({
  type: Types.GET_REQUEST_TEMPLATES,
  error,
});

export const getSuccessTemplates = templates => ({
  type: Types.GET_SUCCESS_TEMPLATES,
  templates,
});

export const getRequestContentBlocks = () => ({
  type: Types.GET_REQUEST_CONTENT_BLOCKS,
});

export const getFailureContentBlocks = error => ({
  type: Types.GET_REQUEST_CONTENT_BLOCKS,
  error,
});

export const getSuccessContentBlocks = contentBlocks => ({
  type: Types.GET_SUCCESS_CONTENT_BLOCKS,
  contentBlocks,
});

export const getAll = (dispatch) => {
  getAllLayouts(dispatch);
  getAllTemplates(dispatch);
  getAllContentBlocks(dispatch);
};

export const getAllLayouts = (dispatch) => {
  try {
    dispatch(getRequestLayouts());
    database.ref('editor/layouts').once('value', (snapshot) => {
      const values = snapshot.val();
      const raw = Object.keys(values).map(key => (values[key]));
      const layouts = fromJS(raw);
      dispatch(getSuccessLayouts(layouts));
    }, (error) => {
      dispatch(getFailureLayouts(error.message));
    });
  } catch (error) {
    dispatch(getFailureLayouts(error.message));
  }
};

export const getAllTemplates = (dispatch) => {
  try {
    dispatch(getRequestTemplates());
    database.ref('editor/templates').once('value', (snapshot) => {
      const values = snapshot.val();
      const raw = Object.keys(values).map(key => (values[key]));
      const layouts = fromJS(raw);
      dispatch(getSuccessTemplates(layouts));
    }, (error) => {
      dispatch(getFailureTemplates(error.message));
    });
  } catch (error) {
    dispatch(getFailureTemplates(error.message));
  }
};

export const getAllContentBlocks = (dispatch) => {
  try {
    dispatch(getRequestContentBlocks());
    database.ref('editor/contentBlocks').once('value', (snapshot) => {
      const values = snapshot.val();
      const raw = Object.keys(values).map(key => (values[key]));
      const layouts = fromJS(raw);
      dispatch(getSuccessContentBlocks(layouts));
    }, (error) => {
      dispatch(getFailureContentBlocks(error.message));
    });
  } catch (error) {
    dispatch(getFailureContentBlocks(error.message));
  }
};

export const INITIAL_STATE = fromJS({
  isLoaded: false,
  fetchingLayouts: false,
  fetchingTemplates: false,
  fetchingContentBlocks: false,
  templates: [],
  layouts: [],
  contentBlocks: [],
});

export default function reducer(state = INITIAL_STATE, action = {}) {
  switch (action.type) {
    case Types.GET_REQUEST_LAYOUTS:
      return state.set('fetchingLayouts', true);
    case Types.GET_FAILURE_LAYOUTS:
      return state.set('fetchingLayouts', false);
    case Types.GET_SUCCESS_LAYOUTS:
      return state.withMutations(s => s
        .set('layouts', fromJS(action.layouts)))
        .set('isLoaded', true)
        .set('fetchingLayouts', false);

    case Types.GET_REQUEST_TEMPLATES:
      return state.set('fetchingTemplates', true);
    case Types.GET_FAILURE_TEMPLATES:
      return state.set('fetchingTemplates', false);
    case Types.GET_SUCCESS_TEMPLATES:
      return state.withMutations(s => s
        .set('templates', fromJS(action.templates)))
        .set('isLoaded', true)
        .set('fetchingTemplates', false);

    case Types.GET_REQUEST_CONTENT_BLOCKS:
      return state.set('fetchingContentBlocks', true);
    case Types.GET_FAILURE_CONTENT_BLOCKS:
      return state.set('fetchingContentBlocks', false);
    case Types.GET_SUCCESS_CONTENT_BLOCKS:
      return state.withMutations(s => s
        .set('contentBlocks', fromJS(action.contentBlocks)))
        .set('isLoaded', true)
        .set('fetchingContentBlocks', false);
    default:
      return state;
  }
}