import { connect } from 'react-redux';

import MarkdownComponent from '../Components/MarkdownComponent';
import { changeText, changeWindow } from './actions'

const mapStateToProps = state => {
  return {
    input: state.input,
    window: state.window,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    submitChangeText: (input) => {dispatch(changeText(input))},
    submitChangeWindow: (window) => {dispatch(changeWindow(window))},
  };
};

export const Container = connect(mapStateToProps, mapDispatchToProps)(MarkdownComponent);