import logo from './logo.svg';
import './App.css';

// for React
import React, { useState, useEffect, useReducer } from 'react';
// for Redux
import { Provider, useSelector, useDispatch} from 'react-redux'
import { Container } from './Redux/container';
import { configureStore } from '@reduxjs/toolkit'

import { pomodoroReducer } from './Redux/pomodoroReducer'
// import PomodoroClock from './Components/PomodoroComponent'

function App() {
  const myStore = configureStore({
    reducer: pomodoroReducer,
    devTools: process.env.NODE_ENV !== 'production'
  })

  return (
    <Provider store={myStore}>
     <Container />
    </Provider>
    // <PomodoroClock />
    );
}

export default App;
