import React from 'react';

export default (props) => {
  const { contentData } = props;
  const text = contentData.get('text');
  return (
    <div className="sd-fancy-title">
      <h2>{text.get(0, "")}</h2>
      <h5>{text.get(1, "")}</h5>
    </div>
  );
}
