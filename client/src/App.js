import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.css";
import Chat from "./components/Chat";
import JoinChat from "./components/JoinChat";

const App = () => {
  return (
    <Router>
      <Route path="/" component={JoinChat} exact />
      <Route path="/chat" component={Chat} exact />
    </Router>
  );
};

export default App;
