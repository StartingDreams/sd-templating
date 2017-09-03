import React from 'react';

export default class Empty extends React.Component {
  render = () => {
    const {sections, renderStyles, layouts} = this.props;
    return (
      <div className="sd-template">
        {sections.map((Section, key) => (
          <Section
            key={key}
            sectionKey={key}
            renderStyles={renderStyles[key]}
            layouts={layouts[key]}
          />
        ))}
      </div>
    );
  }
}
