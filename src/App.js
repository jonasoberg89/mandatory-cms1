import React from 'react';
import { BrowserRouter, Route } from "react-router-dom"
import Navbar from "./components/js/navbar"
import Home from "./components/js/home"
import Author from "./components/js/author"
import Post from "./components/js/post"
import styles from './components/css/app.module.css';
function App() {
  return (
    <BrowserRouter>
      <div className={styles.app}>
        <Navbar />
        <Route exact path="/" component={Home}></Route>
          <Route path="/author/:id" component={Author}></Route>
          <Route path="/post/:id" component={Post}></Route>
      </div>
    </BrowserRouter>
  );
}

export default App;
