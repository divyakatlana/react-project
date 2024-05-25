import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import App from './App';
//import 'bootstrap/dist/css/bootstrap.min.css'; 
import '../node_modules/primereact/resources/themes/bootstrap4-dark-blue/theme.css'
import 'primereact/resources/themes/saga-blue/theme.css';  // Choose your theme
import 'primereact/resources/primereact.min.css';          // Core PrimeReact CSS
import 'primeicons/primeicons.css';   
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <Router>
    <App />
  </Router>
);


