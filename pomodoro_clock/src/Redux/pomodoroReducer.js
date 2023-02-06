import { createAction, createReducer } from '@reduxjs/toolkit'

const RESTARTCLOCK = "RESTART CLOCK"
const INCREASEBREAK = "INCREASE BREAK"
const DECREASEBREAK = "DECREASE BREAK"
const INCREASESESSION = "INCREASE SESSION"
const DECREASESESSION = "DECREASE SESSION"
const STARTSTOP = "START STOP CLOCK"
const CHANGECURRENT = "CHANGE CURRENT"
const UPDATETIMER = "UPDATE TIMER"
const UPDATECLOCK = "UPDATE CLOCK"
const DECREASECOUNT = "DECREASE COUNT"

const restartClock = createAction(RESTARTCLOCK)
const increaseBreak = createAction(INCREASEBREAK)
const decreaseBreak = createAction(DECREASEBREAK)
const increaseSession = createAction(INCREASESESSION)
const decreaseSession = createAction(DECREASESESSION)
const startStopClock = createAction(STARTSTOP)
const changeCurrent = createAction(CHANGECURRENT)
const updateTimer = createAction(UPDATETIMER)
const updateClock = createAction(UPDATECLOCK)
const decreaseCount = createAction(DECREASECOUNT)

const initialState = {
  break: 5,
  session: 25,
  timer: 1500,
  clock: '25:00',
  current: 'Session',
  clock_running: false
};

export const pomodoroReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(restartClock, (state, action) => {
      state.break = 5
      state.session = 25
      state.timer = 1500
      state.clock = '25:00'
      state.current = 'Session'
      state.clock_running = false
    })
    .addCase(increaseBreak, (state, action) => {
      state.break =  state.break + 1
    })
    .addCase(decreaseBreak, (state, action) => {
      state.break =  state.break - 1
    })
    .addCase(increaseSession, (state, action) => {
      state.session =  state.session + 1
    })
    .addCase(decreaseSession, (state, action) => {
      state.session =  state.session - 1
    })
    .addCase(startStopClock, (state, action) => {
      state.clock_running =  !state.clock_running
    })
    .addCase(changeCurrent, (state, action) => {
      if(state.current == 'Break'){
        state.current = 'Session'
      }else if(state.current == 'Session'){
        state.current = 'Break'
      }
    })
    .addCase(updateTimer, (state, action) => {
      if(state.current=='Break'){
        state.timer = state.break * 60
      }else if(state.current=='Session'){
        state.timer = state.session * 60
      }
    })
    .addCase(updateClock, (state, action) => {
      let minutes = '' + parseInt(state.timer / 60, 10)
      let seconds = '' + parseInt(state.timer % 60, 10)
      if(minutes<10){ minutes = '0'+minutes}
      if(seconds<10){ seconds = '0'+seconds }

      state.clock = minutes + ':' + seconds
    })
    .addCase(decreaseCount, (state, action) => {
      state.timer = state.timer - 1
    })
    .addDefaultCase((state, action) => {})
})