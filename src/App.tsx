import { useState, useEffect } from "react";
import "./App.css";
import TextDisplay from "./components/TextDisplay";

function App() {
  const text = "The quick brown fox jumps over the lazy dog.";
  const [userInput, setUserInput] = useState("");

  useEffect(() => {
    const detectKeyDown = (e: KeyboardEvent) => {
      if (e.key !== "Enter") {
        setUserInput((prev: string) => {
          return prev + e.key;
        });
      }
    };

    document.addEventListener("keypress", detectKeyDown, true);

    return () => {
      document.removeEventListener('keypress', detectKeyDown, true)
    }

  }, []);

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
