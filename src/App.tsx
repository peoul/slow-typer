import { useState, useEffect } from "react";
import "./App.css";
import TextDisplay from "./components/TextDisplay";
import { useTypingTest } from "./hooks/usetypingTest";

function App() {
  const text = "The quick brown fox jumps over the lazy dog.";
  const {userInput, status, wrongCounter} = useTypingTest(text);
  
  console.log(wrongCounter);
  console.log(userInput);

  return (
    <>
      <div className="header">
        <div className="title">
          <h1>Slow Typer</h1>
          <p> It's ok to be slow typer.</p>
        </div>

        <TextDisplay text={text} userInput={userInput} />
      </div>
    </>
  );
}

export default App;
