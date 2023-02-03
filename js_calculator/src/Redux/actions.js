const CHANGEFORMULA = "CHANGE FORMULA"
const CHANGEVALUE = "CHANGE VALUE"
const RESTARTCALC = "REESTART CALCULATOR"

export function reestartCalc() {
  return {
    type: RESTARTCALC,
  }
}
export function changeFormula(input_formula, input_result) {
  return {
    type: CHANGEFORMULA,
    payload: {
      formula: input_formula,
      result: input_result
    }
  }
}

export function changeValue(input_value, input_last) {
  return {
    type: CHANGEVALUE,
    payload: {
      value: input_value,
      last_value: input_last
    }
  }
}
