import logo from './logo.svg';
import './App.css';

// for React
import React, { useState, useEffect, useReducer } from 'react';
// // for Redux
// import { Provider, useSelector, useDispatch} from 'react-redux'
// import { Container } from './Redux/container';
// import { configureStore } from '@reduxjs/toolkit'

// import { markdownReducer } from './Redux/markdownReducer'
import DrumMachine from './Components/DrumComponent'

function App() {
  // const myStore = configureStore({
  //   reducer: markdownReducer,
  //   devTools: process.env.NODE_ENV !== 'production'
  // })

  return (
    // <Provider store={myStore}>
      // <Container />
    // </Provider>
    <DrumMachine />
    );
}

export default App;
