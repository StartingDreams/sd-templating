import React from 'react';
import ContentTypes from '../../ContentTypes';

const Text = ContentTypes.Text;

export default (props) => {
  const { contentData, sectionKey, layoutKey, containerKey, contentKey } = props;
  const text = contentData.get('text');
  return (
    <div className="sd-content-block sd-paragraph">
        <Text
          defaultText="Enter paragraph text here..."
          currentText={text.get(0)}
          sectionKey={sectionKey}
          layoutKey={layoutKey}
          containerKey={containerKey}
          contentKey={contentKey}
          subContentKey={0}
        />
    </div>
  );
}
