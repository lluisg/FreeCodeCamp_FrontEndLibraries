const RESTARTCALC = "REESTART CALCULATOR"
const CHANGEFORMULA = "CHANGE FORMULA"
const CHANGEDISPLAY = "CHANGE DISPLAY"
const CHANGEKEY = "CHANGE KEY"
const VALIDDOT = "VALID DOT"
const INVALIDDOT = "INVALID DOT"

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

export function changeDisplay(input) {
  return {
    type: CHANGEDISPLAY,
    payload: {
      display: input
    }
  }
}

export function changeKey(input) {
  return {
    type: CHANGEKEY,
    payload: {
      prev_key: input
    }
  }
}

export function validDot() {
  return {
    type: VALIDDOT,
  }
}

export function invalidDot() {
  return {
    type: INVALIDDOT,
  }
}
