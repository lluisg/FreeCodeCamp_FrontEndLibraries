import React, { createElement } from 'react';
import PropTypes from "prop-types";
// import icons fontawesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFreeCodeCamp } from "@fortawesome/free-brands-svg-icons"
import { current } from '@reduxjs/toolkit';

// ---------------------------------- EDITOR COMPONENTS ---------------------------------------

const Display = (props) => {
  return (
    <div className="container-display p-0 m-0">
      <p id="formula-display" className='p-0 m-0'>{props.formula}</p>
      <p id="value-display" className='p-0 m-0'>{props.value}</p>
    </div>
    );
};
Display.defaultProps = { formula:'5 + 9', value: '3' };
Display.propTypes = { formula: PropTypes.string.isRequired, value: PropTypes.string.isRequired};


const ButtonCalc = (props) => {
  let symbol = props.value=='x' ? '*' : props.value
  return (
    <button id={props.id} onClick={()=>props.handleClick(symbol)} className="btn-pad">
      {props.value}
    </button>
  );
};
// Editor.defaultProps = { text:'blue' };
// ButtonsDrum.propTypes = { text: PropTypes.string.isRequired };

// ---------------------------------- CENTRAL COMPONENT ---------------------------------------
function CalculateResultFormula(fn) {
  return new Function('return ' + fn)().toString();
}

class JSCalculator extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  includesOperator(text, ...operators){
    let isIncluded = true;
    for(let operator of operators) isIncluded *= !text.includes(operator)
    return !isIncluded
  }

  handleClick(key) {
    // console.log(this.props.value, this.props.formula, this.props.last_value, this.props.result)
    switch(key){
      case 'AC':
        this.props.submitReestartCalc()
        break;

      case '=':
        let current_formula, result_formula
        if (this.props.last_value != '='){ // if previous = does nothing
          if (this.includesOperator(this.props.last_value, '+', '*', '/', '-', '+-', '*-', '/-', '--')){ // if previous operator removes it from formula
            if(this.props.last_value.length == 1){ // if previous operator only 1, replace that 1
              current_formula = this.props.formula.slice(0, -1)
              result_formula = CalculateResultFormula(current_formula)
              this.props.submitChangeFormula(current_formula + key + result_formula, result_formula)
            }else{ // if previous operator is 2 (+-)
              current_formula = this.props.formula.slice(0, -2)
              result_formula = CalculateResultFormula(current_formula)
              this.props.submitChangeFormula(current_formula + key + result_formula, result_formula)
            }
          }else{
            result_formula = CalculateResultFormula(this.props.formula)
            this.props.submitChangeFormula(this.props.formula + key + result_formula, result_formula)
          }
          this.props.submitChangeValue(result_formula, key)
        }
        break;
      
      case '+':
      case '*':
      case '/':
        if (!this.includesOperator(this.props.last_value, '+', '*', '/', '-', '+-', '*-', '/-', '--')){ // if previous operator, does nothing
          if (this.props.last_value == '='){ // if its just after pressing =, should add the operator to the result
            this.props.submitChangeFormula(this.props.result + key, '')
          }else{
            this.props.submitChangeFormula(this.props.formula + key, '')
          }
        }else if (key != this.props.last_value){
          if(this.props.last_value.length == 1){
            this.props.submitChangeFormula(this.props.formula.slice(0, -1) + key, '')
          }else{
            this.props.submitChangeFormula(this.props.formula.slice(0, -2) + key, '')
          }
        }
        this.props.submitChangeValue(key, key)
      break;

      case '.':
        if (this.props.last_value != '.'){ // if previous is a . does nothing
          if(!this.props.formula || this.props.last_value == '='){ //if the formula is empty or previous an =, it starts with 0.
            this.props.submitChangeFormula('0' + key, '')
          }else if ( this.includesOperator(this.props.last_value, '+', '*', '/', '-')){ //if previous an operator, adds a 0 before the .
            this.props.submitChangeFormula(this.props.formula + '0' + key, '')
          }else{
            this.props.submitChangeFormula(this.props.formula + key, '')
          }
          this.props.submitChangeValue(key, key)
        }
        break;

      case '-':
        if (!this.includesOperator(this.props.last_value, '+-', '*-', '/-', '.-', '--')){ // if previous DOUBLE operator does nothing
          if (this.includesOperator(this.props.last_value, '+', '*', '/', '.', '-')){ // if previous operator, previous equals combination of operators
            this.props.submitChangeFormula(this.props.formula + key, '')
            this.props.submitChangeValue(key, this.props.last_value + key)
          }else{
            if (this.props.last_value == '='){ // if its just after pressing =, should add the operator to the result
              this.props.submitChangeFormula(this.props.result + key, '')
            }else{
              this.props.submitChangeFormula(this.props.formula + key, '')
            }
            this.props.submitChangeValue(key, key)
          }
        }
        break;
  
      default: // the numerics are the only ones left
        if (this.props.last_value == '='){ // if its just after pressing =, should show only the numeric
          this.props.submitChangeFormula(key, '')
        }else{
          this.props.submitChangeFormula(this.props.formula + key, '')
        }
        this.props.submitChangeValue(key, key)
        break;
    }
  };

  render() {
    const buttons = ['AC', '/', 'x', '7', '8', '9', '-', '4', '5', '6', '+', '1', '2', '3', '0', '.', '=']
    const calcpads = buttons.map(element => {  return <ButtonCalc key={element}
                                                                  id={'pad'.concat(element)}
                                                                  value={element}
                                                                  handleClick={this.handleClick}
                                                      />
    });

    return (
      <div className="base-container">
        <a id="link_original" href="https://javascript-calculator.freecodecamp.rocks/" target="_blank">original web</a>
        <div className='container-calc p-1'>
          <Display value={this.props.value} formula={this.props.formula} />
          <div id="container-buttons">
            {calcpads}
          </div>
        </div>
        <a id="signed">Coded by<br/><span>Lluis Guardia</span></a>
      </div>
    );
  }
};

export default JSCalculator;
// ReactDOM.render(<JSCalculator />, document.getElementById("root"));