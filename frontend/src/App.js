import React, { useState } from "react";
import { getBlockChainMessage } from "./services/blockchain";

import "./App.css";

function App() {
  const [name, setName] = useState("");

  const getNameHandler = async () => {
    const _name = await getBlockChainMessage();
    setName(_name);
  };

  return (
    <div className="App">
      <header className="App-header">
        <p>Welcome To Block chain template</p>
      </header>

      <h2>{name}</h2>
      <button className="button" onClick={getNameHandler}>
        Get Name
      </button>
    </div>
  );
}

export default App;
