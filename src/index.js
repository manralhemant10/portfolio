import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './com.css'


ReactDOM.render(
  <BrowserRouter basename={process.env.REACT_APP_BASE_PATH || "/portfolio"}> 
     <App />
     </BrowserRouter>

  ,
  document.getElementById('root')
);

