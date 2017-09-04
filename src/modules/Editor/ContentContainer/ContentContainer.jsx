import React from 'react';
import ContentBlocks from '../ContentBlocks';

export default (props) => {
  const { contentBlocks, sectionKey, layoutKey, containerKey } = props;
  const Content = [];
  const contentData = [];
  contentBlocks.map(value => {
    Content.push(ContentBlocks[value.get('name')]);
    contentData.push(value.get('data'));
    return false;
  });
  return (
    <div className="sd-content-container">
      {Content.map((ContentBlock, key) => (
        <ContentBlock
          key={key}
          contentData={contentData[key]}
          sectionKey={sectionKey}
          layoutKey={layoutKey}
          containerKey={containerKey}
          contentKey={key}
        />
      ))}
    </div>
  );
};