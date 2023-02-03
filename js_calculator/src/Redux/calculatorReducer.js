import { createAction, createReducer } from '@reduxjs/toolkit'
const RESTARTCALC = "REESTART CALCULATOR"
const CHANGEVALUE = "CHANGE VALUE"
const CHANGEFORMULA = "CHANGE FORMULA"

const reestartCalc = createAction(RESTARTCALC)
const changeValue = createAction(CHANGEVALUE)
const changeFormula = createAction(CHANGEFORMULA)

const initialState = {
  value: '0',
  formula: ' ',
  last_value: '',
  result: ''
};

export const calculatorReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeValue, (state, action) => {
      state.value = action.payload.value
      state.last_value = action.payload.last_value
    })
    .addCase(changeFormula, (state, action) => {
      state.formula = action.payload.formula
      state.result = action.payload.result
    })
    .addCase(reestartCalc, (state, action) => {
      state.value = '0'
      state.formula = ' '
      state.last_value = 'AC'
      state.result = ''
    })
    .addDefaultCase((state, action) => {})
})