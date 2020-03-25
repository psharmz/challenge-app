import React, { Component } from "react";
import "./App.css";
import { SearchPokemon } from "./components/SearchPokemon.js";

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1 className="header">These are my pokemon</h1>
        <SearchPokemon />
      </div>
    );
  }
}

export default App;
