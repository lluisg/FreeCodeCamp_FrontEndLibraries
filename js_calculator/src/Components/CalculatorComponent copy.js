import React, { createElement } from 'react';
import PropTypes from "prop-types";
// import icons fontawesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFreeCodeCamp } from "@fortawesome/free-brands-svg-icons"

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
function CalculateResult(fn) {
  return new Function('return ' + fn)();
}

class JSCalculator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '0',
      formula: ' ',
      last_value: '',
      result: ''
    }

    this.handleClick = this.handleClick.bind(this);
  }

  includesOperator(text, ...operators){
    let isIncluded = true;
    for(let operator of operators) isIncluded *= !text.includes(operator)
    return !isIncluded
  }

  handleClick(key) {
    let current_formula = this.state.formula
    let current_result = this.state.result
    let current_value = this.state.value
    let current_last_value = this.state.last_value

    switch(key){
      case 'AC':
        current_value = '0'
        current_formula = ' '
        current_last_value = key
        current_result = ''
        break;

      case '=':
        let result_formula = CalculateResult(current_formula).toString()

        if (current_last_value != '='){ // if previous = does nothing
          if (this.includesOperator(current_last_value, '+', '*', '/', '.', '-')){ // if previous operator removes it from formula
            current_formula = current_formula.slice(0, -1) + key + result_formula
          }else{
            current_formula = current_formula + key + result_formula
          }
          current_value = result_formula
          current_last_value = key
          current_result = result_formula
        }
        break;
      
      case '+':
      case '*':
      case '/':
        if (!this.includesOperator(current_last_value, '+', '*', '/', '-', '+-', '*-', '/-', '--')){ // if previous operator, does nothing
          if (current_last_value == '='){ // if its just after pressing =, should add the operator to the result
            current_formula = current_result + key;
          }else{
            current_formula = current_formula + key
          }
        }else if (key != current_last_value){
          if(current_last_value.length == 1){
            current_formula = current_formula.slice(0, -1) + key
          }else{
            current_formula = current_formula.slice(0, -2) + key
          }
        }
        current_value = key
        current_last_value = key
        current_result = ''
      break;

      case '.':
        if (current_last_value != '.'){ // if previous is a . does nothing
          if(!current_formula || current_last_value == '='){ //if the formula is empty or previous an =, it starts with 0.
            current_formula = '0' + key
          }else if ( this.includesOperator(current_last_value, '+', '*', '/', '-')){ //if previous an operator, adds a 0 before the .
            current_formula = current_formula + '0' + key
          }else{
            current_formula = current_formula + key
          }
          current_value = key
          current_last_value = key
          current_result = ''
        }
        break;

      case '-':
        if (!this.includesOperator(current_last_value, '+-', '*-', '/-', '.-', '--')){ // if previous DOUBLE operator does nothing
          if (this.includesOperator(current_last_value, '+', '*', '/', '.', '-')){ // if previous operator, previous equals combination of operators
            current_formula = current_formula + key
            current_last_value = current_last_value + key
          }else{
            if (current_last_value == '='){ // if its just after pressing =, should add the operator to the result
              current_formula = current_result + key;
            }else{
              current_formula = current_formula + key
            }
            current_last_value = key
          }
          current_value = key
          current_result = ''
        }
        break;
  
      default: // the numerics are the only ones left
        if (current_last_value == '='){ // if its just after pressing =, should show only the numeric
          current_formula = key;
        }else{
          current_formula = current_formula + key
        }
        current_value = key
        current_last_value = key
        current_result = ''
    }

    console.log('formula:', current_formula)
    this.setState({
      value: current_value,
      formula: current_formula,
      last_value: current_last_value,
      result: current_result
    })
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
          <Display value={this.state.value} formula={this.state.formula} />
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