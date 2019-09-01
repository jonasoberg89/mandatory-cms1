import React from 'react';
import { BrowserRouter, Route } from "react-router-dom"
import Navbar from "./components/js/navbar"
import Home from "./components/js/home"
import styles from './components/css/app.module.css';
function App() {
  return (
    <BrowserRouter>
      <div className={styles.app}>
        <Navbar />
        <Home />
      </div>
    </BrowserRouter>
  );
}

export default App;
