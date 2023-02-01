const CHANGETEXT = "CHANGE TEXT"
const CHANGEVOLUME = "CHANGE VOLUME"
const CHANGEPOWER = "CHANGE POWER"
const CHANGEBANK = "CHANGE BANK"

export function changeText(input) {
  return {
    type: CHANGETEXT,
    payload: {
      text: input
    }
  }
}

export function changeVolume(input) {
  return {
    type: CHANGEVOLUME,
    payload: {
      volume: input
    }
  }
}

export function changePower() {
  return {
    type: CHANGEPOWER,
  }
}

export function changeBank(input) {
  return {
    type: CHANGEBANK,
    payload: {
      bank: input
    }
  }
}