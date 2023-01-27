const CHANGEQUOTE = "CHANGE QUOTE"
const LOWEROPACITY = "LOWER OPACITY"
const INCREASEOPACITY = "INCREASE OPACITY"

export function changeQuote(quote, author) {
  return {
    type: CHANGEQUOTE,
    payload: {
      quote: quote,
      author: author
    }
  }
}

export function lowerOpacity() {
  return {
    type: LOWEROPACITY,
  }
}

export function incrementOpacity() {
  return {
    type: INCREASEOPACITY,
  }
}

// -------- OLD VERSIONS ----------------------------------
// export const changeQuote = (quote, author) => {
//   return {
//     type: CHANGEQUOTE,
//     quote: quote,
//     author: author
//   }
// }

// export const lowerOpacity = () => {
//   return {
//     type: LOWEROPACITY,
//   }
// }

// export const incrementOpacity = () => {
//   return {
//     type: INCREASEOPACITY,
//   }
// }
