import { connect } from 'react-redux';

import CalculatorComponent from '../Components/CalculatorComponent';
import { reestartCalc, changeFormula, changeDisplay, changeKey, validDot, invalidDot } from './actions'

const mapStateToProps = state => {
  return {
    display: state.display,
    formula: state.formula,
    result: state.result,
    prev_key: state.prev_key,
    validDot: state.validDot
  };
};

const mapDispatchToProps = dispatch => {
  return {
    submitReestartCalc: () => {dispatch(reestartCalc())},
    submitChangeFormula: (formula, result) => {dispatch(changeFormula(formula, result))},
    submitChangeDisplay: (display) => {dispatch(changeDisplay(display))},
    submitChangeKey: (prev_key) => {dispatch(changeKey(prev_key))},
    submitValidDot: () => {dispatch(validDot())},
    submitInvalidDot: () => {dispatch(invalidDot())},
  };
};

export const Container = connect(mapStateToProps, mapDispatchToProps)(CalculatorComponent);