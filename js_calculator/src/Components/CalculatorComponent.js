import React, { createElement } from 'react';
import PropTypes from "prop-types";

import buttons from "./buttons"

// ---------------------------------- EDITOR COMPONENTS ---------------------------------------

const Display = (props) => {
  return (
    <div className="container-display p-0 m-0">
      <p id="formula-display" className='p-0 m-0'>{props.formula}</p>
      <p id="display" className='p-0 m-0'>{props.value}</p>
    </div>
    );
};
Display.defaultProps = { formula:'5 + 9', value: '3' };
Display.propTypes = { formula: PropTypes.string.isRequired, value: PropTypes.string.isRequired};


const ButtonCalc = (props) => {
  return (
    <button id={props.id} onClick={()=>props.handleClick(props.value)} className="btn-pad">
      {props.value}
    </button>
  );
};
// Editor.defaultProps = { text:'blue' };
// ButtonsDrum.propTypes = { text: PropTypes.string.isRequired };

// ---------------------------------- CENTRAL COMPONENT ---------------------------------------
function CalculateResultFormula(fn) {
  // console.log('calculate:', fn)
  return new Function('return ' + fn)().toString();
}

function includesElement(text, elements){
  let isIncluded = true;
  for(let el of elements) isIncluded *= !text.includes(el)
  return !isIncluded
}

class JSCalculator extends React.Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(key) {
    console.log(this.props.formula, this.props.result, this.props.display, this.props.prev_key, this.props.validDot)

    switch(key){
      case 'AC':
        this.props.submitReestartCalc()
        break;

      case '=':
        let formula, result_formula
        if (key != this.props.prev_key){ // if previous = does nothing
          if (this.props.prev_key == 'AC'){ // if = after AC, returns NAN
            this.props.submitChangeFormula(key + 'NAN')
            this.props.submitChangeDisplay('NAN')

          }else if (includesElement(this.props.prev_key, ['+', '*', '/', '-', '+-', '*-', '/-', '--'])){ // if previous operator removes it from formula
            if(this.props.prev_key.length == 1){ // if previous operator only 1, replace that 1
              formula = this.props.formula.slice(0, -1)
              result_formula = CalculateResultFormula(formula)
              this.props.submitChangeFormula(formula + key + result_formula, result_formula)
            }else{ // if previous operator is 2 (+-)
              formula = this.props.formula.slice(0, -2)
              result_formula = CalculateResultFormula(formula)
              this.props.submitChangeFormula(formula + key + result_formula, result_formula)
            }
            this.props.submitChangeDisplay(result_formula)

          }else{
            result_formula = CalculateResultFormula(this.props.formula)
            this.props.submitChangeFormula(this.props.formula + key + result_formula, result_formula)
            this.props.submitChangeDisplay(result_formula)
          }

          this.props.submitChangeKey(key)
          this.props.submitValidDot()  
        }
        break;
      
      case '+':
      case '*':
      case '/':
        if (!includesElement(this.props.prev_key, ['+', '*', '/', '-', '+-', '*-', '/-', '--'])){ // if previous operator, does nothing
          if (this.props.prev_key == '='){ // if its just after pressing =, should add the operator to the result
            this.props.submitChangeFormula(this.props.result + key, null)
          }else{
            this.props.submitChangeFormula(this.props.formula + key, null)
          }
        }else if (key != this.props.prev_key){
          if(this.props.prev_key.length == 1){
            this.props.submitChangeFormula(this.props.formula.slice(0, -1) + key, null)
          }else{
            this.props.submitChangeFormula(this.props.formula.slice(0, -2) + key, null)
          }
        }
        this.props.submitChangeDisplay(key)
        this.props.submitChangeKey(key)
        this.props.submitValidDot()
        break;

      case '-':
        if (!includesElement(this.props.prev_key, ['+-', '*-', '/-', '.-', '--'])){ // if previous DOUBLE operator does nothing
          if (includesElement(this.props.prev_key, ['+', '*', '/', '.', '-'])){ // if previous operator, previous equals combination of operators
            this.props.submitChangeFormula(this.props.formula + key, null)
            this.props.submitChangeDisplay(key)
            this.props.submitChangeKey(this.props.prev_key + key)
          }else{
            if (this.props.prev_key == '='){ // if its just after pressing =, should add the operator to the result
              this.props.submitChangeFormula(this.props.result + key, null)
            }else{
              this.props.submitChangeFormula(this.props.formula + key, null)
            }
            this.props.submitChangeDisplay(key)
            this.props.submitChangeKey(key)
          }
          this.props.submitValidDot()
        }
        break;

      case '.':
        if (this.props.validDot){ // if previous is a . does nothing
          if(this.props.prev_key == 'AC' || this.props.prev_key == '='){ //if the formula is empty or previous an =, it starts with 0.
            this.props.submitChangeFormula('0' + key, null)
            this.props.submitChangeDisplay('0' + key)
          }else if (includesElement(this.props.prev_key, ['+', '*', '/', '-'])){ //if previous an operator, adds a 0 before the .
            this.props.submitChangeFormula(this.props.formula + '0' + key, null)
            this.props.submitChangeDisplay('0' + key)
          }else{
            this.props.submitChangeFormula(this.props.formula + key, null)
            this.props.submitChangeDisplay(this.props.display + key)
          }
          this.props.submitChangeKey(key)
          this.props.submitInvalidDot()
        }
        break;
  
      case '0':
        if (key != this.props.prev_key){ // if previous 0 does nothing
          if (this.props.prev_key == '='){ // if its just after pressing =, should show only the numeric
            this.props.submitChangeFormula(key, null)
          }else{
            this.props.submitChangeFormula( this.props.formula + key, null)
          }
          if (includesElement(this.props.prev_key, ['AC', '+', '-', '/', '*', '='])){ // if previous an operator, it reemplaces it on the display
            this.props.submitChangeDisplay(key)
          }else{
            this.props.submitChangeDisplay(this.props.display + key)
          }
          this.props.submitChangeKey(key)
        }
        break
        

      case '1':
      case '2':
      case '3':
      case '4':
      case '5':
      case '6':
      case '7':
      case '8':
      case '9':
        if (this.props.prev_key == '='){ // if its just after pressing =, should show only the numeric
          this.props.submitChangeFormula(key, null)
        }else{
          this.props.submitChangeFormula(this.props.formula + key, null)
        }

        if (includesElement(this.props.prev_key, ['AC', '+', '-', '/', '*', '='])){ // if previous an operator, it reemplaces it on the display
          this.props.submitChangeDisplay(key)
        }else{
          this.props.submitChangeDisplay(this.props.display + key)
        }
        this.props.submitChangeKey(key)
        break

      default:
        break
    }
  };

  render() {
    const calcpads = buttons.map(element => {  return <ButtonCalc key={element.id}
                                                                  id={element.id}
                                                                  value={element.value}
                                                                  handleClick={this.handleClick}
                                                      />
    });

    return (
      <div className="base-container">
        <a id="link_original" href="https://javascript-calculator.freecodecamp.rocks/" target="_blank">original web</a>
        <div className='container-calc p-1'>
          <Display value={this.props.display} formula={this.props.formula} />
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