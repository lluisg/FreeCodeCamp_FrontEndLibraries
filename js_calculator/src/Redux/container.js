import { connect } from 'react-redux';

import CalculatorComponent from '../Components/CalculatorComponent';
import { changeLastValue, changeResult } from './actions'
import { reestartCalc, changeFormula, changeValue } from './actions'

const mapStateToProps = state => {
  return {
    value: state.value,
    formula: state.formula,
    last_value: state.last_value,
    result: state.result,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    submitChangeValue: (value, last_value) => {dispatch(changeValue(value, last_value))},
    submitChangeFormula: (formula, result) => {dispatch(changeFormula(formula, result))},
    submitReestartCalc: () => {dispatch(reestartCalc())},
  };
};

export const Container = connect(mapStateToProps, mapDispatchToProps)(CalculatorComponent);