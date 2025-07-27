import "./App.css";
import TextDisplay from "./components/TextDisplay";
import Stats from "./components/Stats";
import { useTypingTest } from "./hooks/usetypingTest";
import resetIcon from "./assets/resetIcon.svg";
import typingTexts from "./assets/text.json"
import { useState } from "react";

function App() {
  
  
  const getRandomText = () => {
    const randomIndex = Math.floor(Math.random() * typingTexts.length);
    return typingTexts[randomIndex];
  };

  const [currentText, setCurrentText] = useState(() => getRandomText());

  const { userInput, status, wrongCounter, timeInSeconds, resetHandler } = useTypingTest(currentText);

  const handleReset = () => {
    resetHandler(); // Reset the typing test
    setCurrentText(getRandomText()); // Get new random text
  }

  return (
    <>
      <div className="header">
        <div className="title">
          <h1>Slow Typer</h1>
          <p> It's ok to be slow typer.</p>
        </div>
      </div>
      <div className="content">
        <TextDisplay text={currentText} userInput={userInput} />
      </div>
      <div className="footer">
        {status === "completed" && <Stats wrongCounter={wrongCounter} textLength={currentText.length} time={timeInSeconds}/>}
        {status === "completed" && (
          <button className="reset_btn" onClick={handleReset}>
            <img src={resetIcon} alt="Reset" className="reset_icon" />
          </button>
        )}
      </div>
    </>
  );
}

export default App;
