import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './com.css'


ReactDOM.render(
  <BrowserRouter basename="/portfolio"> 
     <App />
     </BrowserRouter>

  ,
  document.getElementById('root')
);

