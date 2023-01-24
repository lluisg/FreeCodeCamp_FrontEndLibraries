import randomColor from "randomcolor";
import { createAction, createReducer } from '@reduxjs/toolkit'

const CHANGEQUOTE = "CHANGE QUOTE"
const LOWEROPACITY = "LOWER OPACITY"
const INCREASEOPACITY = "INCREASE OPACITY"

const changeQuote = createAction(CHANGEQUOTE)
const incrementOP = createAction(INCREASEOPACITY)
const decrementOP = createAction(LOWEROPACITY)

const initialState = {
  quote: "Unknown3",
  author: "Unknown3",
  opacity: 1,
  color: "green"
}

export const quoteReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeQuote, (state, action) => {
      let rand_color = randomColor()
      state.quote = action.payload.quote
      state.author = action.payload.author
      state.color = rand_color
    })
    .addCase(decrementOP, (state, action) => {
      state.opacity = 0
    })
    .addCase(incrementOP, (state, action) => {
      state.opacity = 1
    })
    .addDefaultCase((state, action) => {})
})


// export const quoteReducer = (state=initialState, action) => {
//   switch (action.type) {

//     case CHANGEQUOTE:
//       let rand_color = randomColor()
//       return ({
//         author: action.author,
//         quote: action.quote,
//         color: rand_color
//       });

//     case LOWEROPACITY:
//       return ({
//         opacity: 0
//       });

//     case INCREASEOPACITY:
//       return ({
//         opacity: 1
//       });

//     default:
//       return state;
//     } 
// };
