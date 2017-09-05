import React from 'react';
import ContentTypes from '../../ContentTypes';

const Text = ContentTypes.Text;

export default (props) => {
  const { contentData, sectionKey, layoutKey, containerKey, contentKey } = props;
  const text = contentData.get('text');
  return (
    <div className="sd-fancy-title">
      <h2 style={{margin: "10px"}}>
        <Text
          defaultText="Default Title"
          currentText={text.get(0)}
          sectionKey={sectionKey}
          layoutKey={layoutKey}
          containerKey={containerKey}
          contentKey={contentKey}
          subContentKey={0}
        />
      </h2>
      <h5 style={{margin: "-10px 5px 5px 5px", color: "#ccc"}}>
        <Text
          defaultText="Default Sub Title"
          currentText={text.get(1)}
          sectionKey={sectionKey}
          layoutKey={layoutKey}
          containerKey={containerKey}
          contentKey={contentKey}
          subContentKey={1}
        />
      </h5>
    </div>
  );
}
