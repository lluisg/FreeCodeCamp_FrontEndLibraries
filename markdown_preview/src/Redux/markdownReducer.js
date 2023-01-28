import { createAction, createReducer } from '@reduxjs/toolkit'

const CHANGETEXT = "CHANGE TEXT"
const CHANGEWINDOW = "CHANGE WINDOW SIZE"

const changeText = createAction(CHANGETEXT)
const changeWindow = createAction(CHANGEWINDOW)

const initialState = {
  input: "",
  window: 'None',
};

export const markdownReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeText, (state, action) => {
      state.input = action.payload.text
    })
    .addCase(changeWindow, (state, action) => {
      state.window = action.payload.window
    })
    .addDefaultCase((state, action) => {})
})