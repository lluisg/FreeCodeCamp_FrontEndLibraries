import { createAction, createReducer } from '@reduxjs/toolkit'

const CHANGETEXT = "CHANGE TEXT"
const CHANGEVOLUME = "CHANGE VOLUME"
const CHANGEPOWER = "CHANGE POWER"
const CHANGEBANK = "CHANGE BANK"

const changeText = createAction(CHANGETEXT)
const changeVolume = createAction(CHANGEVOLUME)
const changePower = createAction(CHANGEPOWER)
const changeBank = createAction(CHANGEBANK)

const initialState = {
  start_text: '... ',
  text: '...',
  bank: 'Smooth Piano Kit',
  power: true,
  volume: 50
};

export const drumReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeText, (state, action) => {
      state.text = action.payload.text
    })
    .addCase(changeVolume, (state, action) => {
      state.volume = action.payload.volume
      state.text = 'Volume: '+action.payload.volume
    })
    .addCase(changePower, (state, action) => {
      state.power = !state.power
      state.text = state.start_text
    })
    .addCase(changeBank, (state, action) => {
      state.bank = action.payload.bank
      state.text = action.payload.bank
    })
    .addDefaultCase((state, action) => {})
})