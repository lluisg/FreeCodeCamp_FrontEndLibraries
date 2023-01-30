const CHANGETEXT = "CHANGE TEXT"
const CHANGEWINDOW = "CHANGE WINDOW SIZE"

export function changeText(input) {
  return {
    type: CHANGETEXT,
    payload: {
      text: input
    }
  }
}

export function changeWindow(windowBig) {
  return {
    type: CHANGEWINDOW,
    payload: {
      window: windowBig
    }
  }
}