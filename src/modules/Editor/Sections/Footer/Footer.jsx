import React from 'react';
import Layouts from '../../Layouts';

export default (props) => {
  const { renderStyles, layouts, sectionKey } = props;
  const RenderLayouts = [];
  const layoutStyles = [];
  const layoutContainers = [];
  layouts.map(value => {
    RenderLayouts.push(Layouts[value.get('name')]);
    layoutStyles.push(value.get('styles'));
    layoutContainers.push(value.get('containers'));
    return false;
  });
  return (
    <div className="sd-section" style={renderStyles.toJS()}>
      {RenderLayouts.map((Layout, key) => (
        <Layout
          key={key}
          sectionKey={sectionKey}
          layoutKey={key}
          renderStyles={layoutStyles[key]}
          containers={layoutContainers[key]}
        />
      ))}
    </div>
  );
};