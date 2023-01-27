import { connect } from 'react-redux';

import QuoteComponent from '../Components/QuoteComponent';
import { changeQuote, lowerOpacity, incrementOpacity } from './actions'

const mapStateToProps = state => {
  return {
    quote: state.quote,
    author: state.author,
    opacity: state.opacity,
    color: state.color
  };
};

const mapDispatchToProps = dispatch => {
  return {
    submitChangeQuote: (quote, author) => {dispatch(changeQuote(quote, author))},
    submitLowerOpacity: (quote, author) => {dispatch(lowerOpacity())},
    submitIncrementOpacity: (quote, author) => {dispatch(incrementOpacity())}
  };
};

export const Container = connect(mapStateToProps, mapDispatchToProps)(QuoteComponent);