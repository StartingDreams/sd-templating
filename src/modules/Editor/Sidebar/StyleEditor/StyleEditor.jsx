import React from 'react';
import { connect } from 'react-redux';
import {Card, CardHeader, CardText} from 'material-ui/Card';
import TextField from 'material-ui/TextField';

export class StyleEditor extends React.Component {
  constructor(props) {
    super(props);
    this.currentStyles = props.currentStyles;
  };

  updateCurrentStyles = (name, value) => {
    this.currentStyles = this.currentStyles.setIn(['editableStyles', name], value);
    this.props.updateStyles(this.currentStyles);
  };

  render = () => {
    const styleList = [];
    this.currentStyles.get('editableStyles').map((value, name) => {
      styleList.push({name, value});
      return false;
    });

    return (
      <Card>
        <CardHeader
          title={this.currentStyles.get('name')}
          actAsExpander={true}
          showExpandableButton={true}
        />
        <CardText expandable={true}>
        {styleList.map((style, key) => (
          <TextField
            key={key}
            fullWidth={true}
            onChange={(event, newValue) => {
              this.updateCurrentStyles(style.name, newValue);
            }}
            floatingLabelText={style.name}
            defaultValue={style.value}
          />
        )) }
        </CardText>
      </Card>
    );
  }
}

StyleEditor.propTypes = {

};

export const mapStateToProps = state => ({

});

export default connect(
  mapStateToProps,
)(StyleEditor);