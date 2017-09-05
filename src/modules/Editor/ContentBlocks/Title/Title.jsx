import React from 'react';
import ContentTypes from '../../ContentTypes';

const Text = ContentTypes.Text;

export default (props) => {
  const { contentData, sectionKey, layoutKey, containerKey, contentKey } = props;
  const text = contentData.get('text');
  return (
    <div className="sd-content-block sd-title">
      <h2 style={{margin: 0, padding: "10px 0 5px 0", fontSize: "25px"}}>
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
    </div>
  );
}
