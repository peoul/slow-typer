import "./App.css";
import TextDisplay from "./components/TextDisplay";
import Stats from "./components/Stats";
import { useTypingTest } from "./hooks/usetypingTest";
import resetIcon from "./assets/resetIcon.svg";

function App() {
  const text =
    "The quick brown fox jumps over the lazy dog.";
  const { userInput, status, wrongCounter, timeInSeconds, resetHandler } = useTypingTest(text);

  return (
    <>
      <div className="header">
        <div className="title">
          <h1>Slow Typer</h1>
          <p> It's ok to be slow typer.</p>
        </div>
      </div>
      <div className="content">
        <TextDisplay text={text} userInput={userInput} />
      </div>
      <div className="footer">
        {status === "completed" && <Stats wrongCounter={wrongCounter} textLength={text.length} time={timeInSeconds}/>}
        {status === "completed" && (
          <button className="reset_btn" onClick={resetHandler}>
            <img src={resetIcon} alt="Reset" className="reset_icon" />
          </button>
        )}
      </div>
    </>
  );
}

export default App;
