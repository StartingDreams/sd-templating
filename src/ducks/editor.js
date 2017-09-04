import { fromJS } from 'immutable';
import firebase from 'firebase';

const database = firebase.database();

export const Types = {
  GET_REQUEST: 'editor/GET_REQUEST',
  GET_FAILURE: 'editor/GET_FAILURE',
  GET_SUCCESS: 'editor/GET_SUCCESS',
  UPDATE_CONTENT: 'editor/UPDATE_CONTENT',
};

export const getRequest = () => ({
  type: Types.GET_REQUEST,
});

export const getFailure = error => ({
  type: Types.GET_FAILURE,
  error,
});

export const getSuccess = content => ({
  type: Types.GET_SUCCESS,
  content,
});

export const updateContentSuccess = () => ({
  type: Types.UPDATE_CONTENT,
});

// const editor = {
//   template: "Empty",
//   sections: [
//     {name: "Header", styles: {backgroundColor: "#1b1c1c", color: "#eee"}, "layouts": [
//       {name: "OneColumn", styles: {}, containers:[
//         [
//           {name: "FancyTitle", data: {text: ["Some Title", "Some Sub Title Header"]}}
//         ],
//       ]},
//     ]},
//     {name: "Body", styles: {}, "layouts": [
//       {name: "OneColumn", styles: {}, containers:[
//         [
//           {name: "Title", data: {text: [""]}},
//           {name: "Paragraph", data: {text: [""]}}
//         ],
//       ]},
//       {name: "ThreeColumn", styles: {}, containers:[
//         [
//           {name: "FancyTitle", data: {text: ["", "Some Sub Title 2"]}}
//         ],
//       ]},
//       {name: "TwoColumn", styles: {}, containers:[
//         [
//           {name: "FancyTitle", data: {text: ["", "Some Sub Title 3"]}}
//         ],
//       ]},
//     ]},
//     {name: "Footer", styles: {backgroundColor: "#333", color: "#eee"}, "layouts": [
//       {name: "ThreeColumn", styles: {}, containers:[
//         [
//           {name: "FancyTitle", data: {text: ["Some Title", "Some Sub Title Footer"]}}
//         ],
//       ]},
//     ]},
//   ]
// };

export const getAll = (dispatch) => {
  try {
    const { uid } = firebase.auth().currentUser;
    if (!uid) {
      return;
    }
    dispatch(getRequest());
    database.ref(`editor/users/${uid}/content`).on('value', (snapshot) => {
      const values = snapshot.val();
      console.log('values', values);
      dispatch(getSuccess(fromJS(values)));
    }, (error) => {
      dispatch(getFailure(error.message));
    });
  } catch (error) {
    dispatch(getFailure(error.message));
  }
};

export const addContent = async (dispatch, content) => {
  try {
    const { uid } = firebase.auth().currentUser;
    if (!uid) {
      return;
    }
    const rawContent = content.toJS();
    dispatch(getRequest());
    const snapshot = await database.ref(`editor/users/${uid}`).once('value');
    if (!snapshot.exists()) {
      await database.ref(`editor/users/${uid}/`).set({
        content: [rawContent],
      });
    } else {
      const values = snapshot.val();
      const currentContent = values.content;
      currentContent.push(rawContent);
      await database.ref(`editor/users/${uid}/`).update({
        content: currentContent,
      });
    }
    dispatch(updateContentSuccess());
  } catch (error) {
    dispatch(getFailure(error.message));
  }
};

export const updateContent = async (dispatch, content) => {
  try {
    const { uid } = firebase.auth().currentUser;
    if (!uid) {
      return;
    }
    const rawContent = content.toJS();
    dispatch(getRequest());
    await database.ref(`editor/users/${uid}/`).update({
      content: rawContent,
    });
    dispatch(updateContentSuccess());
  } catch (error) {
    dispatch(getFailure(error.message));
  }
};

export const moveLayoutUpSameSection = (content, currentContentID, sectionKey, layoutKey, dispatch) => {
  const layouts = content.getIn([currentContentID, 'sections', sectionKey, 'layouts']);
  const layout = layouts.get(layoutKey);
  const newLayout = layouts.delete(layoutKey).insert(layoutKey - 1, layout);
  const updatedContent = content.setIn([currentContentID, 'sections', sectionKey, 'layouts'], newLayout);
  updateContent(dispatch, updatedContent).catch((error) => {
    dispatch(getFailure(error.message));
  });
};

export const moveLayoutUpOneSection = (content, currentContentID, sectionKey, layoutKey, dispatch) => {
  const newSectionKey = sectionKey - 1;
  const layouts = content.getIn([currentContentID, 'sections', sectionKey, 'layouts']);
  const layout = layouts.get(layoutKey);
  const oldSectionLayouts = layouts.delete(layoutKey);
  const newContent = content.setIn([currentContentID, 'sections', sectionKey, 'layouts'], oldSectionLayouts);
  const currentLayouts = content.getIn([currentContentID, 'sections', newSectionKey, 'layouts']);
  const newPosition = currentLayouts.size === 0 ? 0 : currentLayouts.size - 1;
  const updatedLayouts = currentLayouts.insert(newPosition, layout);
  const updatedContent = newContent.setIn([currentContentID, 'sections', newSectionKey, 'layouts'], updatedLayouts);
  updateContent(dispatch, updatedContent).catch((error) => {
    dispatch(getFailure(error.message));
  });
};

export const moveLayoutUp = (content, currentContentID, sectionKey, layoutKey, dispatch) => {
  if (sectionKey === 0 && layoutKey === 0) {
    return;
  }
  if (layoutKey === 0) {
    moveLayoutUpOneSection(content, currentContentID, sectionKey, layoutKey, dispatch);
    return;
  }
  if (layoutKey > 0) {
    moveLayoutUpSameSection(content, currentContentID, sectionKey, layoutKey, dispatch);
    return;
  }
};

export const moveLayoutDownSameSection = (content, currentContentID, sectionKey, layoutKey, dispatch) => {
  const layouts = content.getIn([currentContentID, 'sections', sectionKey, 'layouts']);
  const layout = layouts.get(layoutKey);
  const newLayout = layouts.delete(layoutKey).insert(layoutKey + 1, layout);
  const updatedContent = content.setIn([currentContentID, 'sections', sectionKey, 'layouts'], newLayout);
  updateContent(dispatch, updatedContent).catch((error) => {
    dispatch(getFailure(error.message));
  });
};

export const moveLayoutDownOneSection = (content, currentContentID, sectionKey, layoutKey, dispatch) => {
  const newSectionKey = sectionKey + 1;
  const layouts = content.getIn([currentContentID, 'sections', sectionKey, 'layouts']);
  const layout = layouts.get(layoutKey);
  const oldSectionLayouts = layouts.delete(layoutKey);
  const newContent = content.setIn([currentContentID, 'sections', sectionKey, 'layouts'], oldSectionLayouts);
  const currentLayouts = content.getIn([currentContentID, 'sections', newSectionKey, 'layouts']);
  const newPosition = currentLayouts.size === 0 ? 0 : 1;
  const updatedLayouts = currentLayouts.insert(newPosition, layout);
  const updatedContent = newContent.setIn([currentContentID, 'sections', newSectionKey, 'layouts'], updatedLayouts);
  updateContent(dispatch, updatedContent).catch((error) => {
    dispatch(getFailure(error.message));
  });
};

export const moveLayoutDown = (content, currentContentID, sectionKey, layoutKey, dispatch) => {
  const totalLayouts = content.getIn([currentContentID, 'sections', sectionKey, 'layouts']).size;
  if (layoutKey + 1 === totalLayouts) {
    moveLayoutDownOneSection(content, currentContentID, sectionKey, layoutKey, dispatch);
    return;
  }
  moveLayoutDownSameSection(content, currentContentID, sectionKey, layoutKey, dispatch);
};

export const INITIAL_STATE = fromJS({
  isLoaded: false,
  fetching: false,
  currentContentID: 0,
  content: [],
});

export default function reducer(state = INITIAL_STATE, action = {}) {
  switch (action.type) {
    case Types.GET_REQUEST:
      return state.set('fetching', true);
    case Types.GET_FAILURE:
      console.log('failed', action);
      return state.set('fetching', false);
    case Types.GET_SUCCESS:
      return state.withMutations(s => s
        .set('content', fromJS(action.content)))
        .set('isLoaded', true)
        .set('fetching', false);
    case Types.ADD_SUCCESS:
      return state.set('fetching', false);
    default:
      return state;
  }
}