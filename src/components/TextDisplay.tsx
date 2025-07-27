import "../styles/TextDisplay.css";
import { type TextDisplayProps } from "../types";

function TextDisplay({ text, userInput }: TextDisplayProps) {
  const renderCharacters = () => {
    return text.split("").map((char, index) => {
      let className = "char";

      if (index < userInput.length) {
        if (userInput[index] === char) {
          className += " correct";
        } else if (userInput[index] !== char && char === " ") {
          className += " incorrect_space";
        } else {
          className += " incorrect";
        }
      } else if (index === userInput.length) {
        className += " current";
      }

      return (
        <span key={index} className={className}>
          {char}
        </span>
      );
    });
  };

  return (
    <div className="paragraph">
      <div className="text-content"> {renderCharacters()}</div>
    </div>
  );
}

export default TextDisplay;
