import React from 'react';
import ReactDOM from 'react-dom/client';
import 'react-loading-skeleton/dist/skeleton.css';
import './index.css';
import App from './App';
import FirebaseContext from './context/firebase';
import { auth, db } from './lib/firebase';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <FirebaseContext.Provider value={{ auth, db }}>
    <App />
  </FirebaseContext.Provider>
);
