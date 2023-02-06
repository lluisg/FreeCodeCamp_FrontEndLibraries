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

export function restartClock() {
  return {
    type: RESTARTCLOCK,
  }
}
export function increaseBreak() {
  return {
    type: INCREASEBREAK,
  }
}
export function decreaseBreak() {
  return {
    type: DECREASEBREAK,
  }
}
export function increaseSession() {
  return {
    type: INCREASESESSION,
  }
}
export function decreaseSession() {
  return {
    type: DECREASESESSION,
  }
}
export function startStopClock() {
  return {
    type: STARTSTOP,
  }
}
export function changeCurrent() {
  return {
    type: CHANGECURRENT,
  }
}
export function updateTimer() {
  return {
    type: UPDATETIMER,
  }
}
export function updateClock() {
  return {
    type: UPDATECLOCK,
  }
}
export function decreaseCount() {
  return {
    type: DECREASECOUNT,
  }
}

