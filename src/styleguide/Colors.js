import { fade } from 'material-ui/utils/colorManipulator';
import {
  indigo500, indigo700,
  red700,
  grey100, grey300, grey400, grey500,
  white, darkBlack, fullBlack,
} from 'material-ui/styles/colors';

export const colors = {
  primary1Color: indigo500,
  primary2Color: indigo700,
  primary3Color: grey400,
  accent1Color: red700,
  accent2Color: grey100,
  accent3Color: grey500,
  textColor: darkBlack,
  alternateTextColor: white,
  canvasColor: white,
  borderColor: grey300,
  disabledColor: fade(darkBlack, 0.3),
  pickerHeaderColor: indigo500,
  clockCircleColor: fade(darkBlack, 0.07),
  shadowColor: fullBlack,
};

export default colors;
