import { createAction, createReducer } from '@reduxjs/toolkit'

const RESTARTCALC = "REESTART CALCULATOR"
const CHANGEFORMULA = "CHANGE FORMULA"
const CHANGEDISPLAY = "CHANGE DISPLAY"
const CHANGEKEY = "CHANGE KEY"
const VALIDDOT = "VALID DOT"
const INVALIDDOT = "INVALID DOT"

const reestartCalc = createAction(RESTARTCALC)
const changeFormula = createAction(CHANGEFORMULA)
const changeDisplay = createAction(CHANGEDISPLAY)
const changeKey = createAction(CHANGEKEY)
const validDot = createAction(VALIDDOT)
const invalidDot = createAction(INVALIDDOT)

const initialState = {
  display: '0',
  formula: ' ',
  result: null,
  prev_key: 'AC',
  validDot: true
};

export const calculatorReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(reestartCalc, (state, action) => {
      state.display = '0'
      state.formula = ' '
      state.result = null
      state.prev_key = 'AC'
      state.validDot = true
    })
    .addCase(changeFormula, (state, action) => {
      state.formula = action.payload.formula
      state.result = action.payload.result
    })
    .addCase(changeDisplay, (state, action) => {
      state.display = action.payload.display
    })
    .addCase(changeKey, (state, action) => {
      state.prev_key = action.payload.prev_key
    })
    .addCase(validDot, (state, action) => {
      state.validDot = true
    })
    .addCase(invalidDot, (state, action) => {
      state.validDot = false
    })
    .addDefaultCase((state, action) => {})
})