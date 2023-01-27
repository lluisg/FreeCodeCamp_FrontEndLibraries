import logo from './logo.svg';
import './App.css';

// for React
import React, { useState, useEffect, useReducer } from 'react';
// for Redux
import { Provider, useSelector, useDispatch} from 'react-redux'
import { Container } from './Redux/container';
import { configureStore } from '@reduxjs/toolkit'

import { quoteReducer } from './Redux/quoteReducer'

function App() { 

  const myStore = configureStore({
    reducer: quoteReducer,
    devTools: process.env.NODE_ENV !== 'production'
  })

  return (
    // <Provider store={store}>
    <Provider store={myStore}>
      <Container />
    </Provider>
  );
}

export default App;
