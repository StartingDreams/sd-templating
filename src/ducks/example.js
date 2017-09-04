import { fromJS } from 'immutable';

export const Types = {
  UPDATE: 'sample/UPDATE',
};

const editor = {
  template: "Empty",
  sections: [
    {name: "Header", styles: {backgroundColor: "#1b1c1c", color: "#eee"}, "layouts": [
      {name: "OneColumn", styles: {}, containers:[
        [
          {name: "FancyTitle", data: {text: ["Some Title", "Some Sub Title Header"]}}
        ],
      ]},
    ]},
    {name: "Body", styles: {}, "layouts": [
      {name: "OneColumn", styles: {}, containers:[
        [
          {name: "Title", data: {text: [""]}},
          {name: "Paragraph", data: {text: [""]}}
        ],
      ]},
      {name: "ThreeColumn", styles: {}, containers:[
        [
          {name: "FancyTitle", data: {text: ["", "Some Sub Title 2"]}}
        ],
      ]},
      {name: "TwoColumn", styles: {}, containers:[
        [
          {name: "FancyTitle", data: {text: ["", "Some Sub Title 3"]}}
        ],
      ]},
    ]},
    {name: "Footer", styles: {backgroundColor: "#333", color: "#eee"}, "layouts": [
      {name: "ThreeColumn", styles: {}, containers:[
        [
          {name: "FancyTitle", data: {text: ["Some Title", "Some Sub Title Footer"]}}
        ],
      ]},
    ]},
  ]
};

export const update = editor => ({
  type: Types.UPDATE,
  editor,
});

export const moveLayoutUpOneSection = (editor, sectionKey, layoutKey, dispatch) => {
  const newSectionKey = sectionKey - 1;
  const layouts = editor.getIn(['sections', sectionKey, 'layouts']);
  const layout = layouts.get(layoutKey);
  const oldSectionLayouts = layouts.delete(layoutKey);
  const newEditor = editor.setIn(['sections', sectionKey, 'layouts'], oldSectionLayouts);
  const currentLayouts = editor.getIn(['sections', newSectionKey, 'layouts']);
  const newPosition = currentLayouts.size === 0 ? 0 : currentLayouts.size - 1;
  const updatedLayouts = currentLayouts.insert(newPosition, layout);
  const nextEditor = newEditor.setIn(['sections', newSectionKey, 'layouts'], updatedLayouts);
  dispatch(update(nextEditor));
};

export const moveLayoutUpSameSection = (editor, sectionKey, layoutKey, dispatch) => {
  const layouts = editor.getIn(['sections', sectionKey, 'layouts']);
  const layout = layouts.get(layoutKey);
  const newLayout = layouts.delete(layoutKey).insert(layoutKey - 1, layout);
  const newEditor = editor.setIn(['sections', sectionKey, 'layouts'], newLayout);
  dispatch(update(newEditor));
};

export const moveLayoutUp = (editor, sectionKey, layoutKey, dispatch) => {
  if (sectionKey === 0 && layoutKey === 0) {
    return;
  }
  if (layoutKey === 0) {
    moveLayoutUpOneSection(editor, sectionKey, layoutKey, dispatch);
    return;
  }
  if (layoutKey > 0) {
    moveLayoutUpSameSection(editor, sectionKey, layoutKey, dispatch);
    return;
  }
};

export const moveLayoutDownSameSection = (editor, sectionKey, layoutKey, dispatch) => {
  const layouts = editor.getIn(['sections', sectionKey, 'layouts']);
  const layout = layouts.get(layoutKey);
  const newLayout = layouts.delete(layoutKey).insert(layoutKey + 1, layout);
  const newEditor = editor.setIn(['sections', sectionKey, 'layouts'], newLayout);
  dispatch(update(newEditor));
};

export const moveLayoutDownOneSection = (editor, sectionKey, layoutKey, dispatch) => {
  const newSectionKey = sectionKey + 1;
  const layouts = editor.getIn(['sections', sectionKey, 'layouts']);
  const layout = layouts.get(layoutKey);
  const oldSectionLayouts = layouts.delete(layoutKey);
  const newEditor = editor.setIn(['sections', sectionKey, 'layouts'], oldSectionLayouts);
  const currentLayouts = editor.getIn(['sections', newSectionKey, 'layouts']);
  const newPosition = currentLayouts.size === 0 ? 0 : 1;
  const updatedLayouts = currentLayouts.insert(newPosition, layout);
  const nextEditor = newEditor.setIn(['sections', newSectionKey, 'layouts'], updatedLayouts);
  dispatch(update(nextEditor));
};

export const moveLayoutDown = (editor, sectionKey, layoutKey, dispatch) => {
  const totalLayouts = editor.getIn(['sections', sectionKey, 'layouts']).size;
  if (layoutKey + 1 === totalLayouts) {
    moveLayoutDownOneSection(editor, sectionKey, layoutKey, dispatch);
    return;
  }
  moveLayoutDownSameSection(editor, sectionKey, layoutKey, dispatch);
};

export const INITIAL_STATE = fromJS({
  editor,
});

export default function reducer(state = INITIAL_STATE, action = {}) {
  switch (action.type) {
    case Types.UPDATE:
      return state.withMutations(s => s.set('editor', action.editor));
    default:
      return state;
  }
}
