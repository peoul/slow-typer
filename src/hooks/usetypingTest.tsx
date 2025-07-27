import { useState, useEffect } from "react";

export const useTypingTest = (text: string) => {
  const [userInput, setUserInput] = useState("");
  const [status, setStatus] = useState<"idle" | "active" | "completed">("idle");
  const [wrongCounter, setWrongCounter] = useState(0);


  useEffect(() => {
    if (userInput.length >= text.length) {
      setStatus("completed");
    } else if (userInput.length > 0 && status === "idle") {
      setStatus("active");
    }
  }, [userInput.length, text.length, status]);

  useEffect(() => {
    if (status === "completed") {

      const errors = [...userInput].filter((char, index) => char !== text[index]).length;
      setWrongCounter(errors)
      return;
    }

    const detectKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Enter") {
        e.preventDefault();
        return;
      }

      setUserInput((prev: string) => {
        const currentIndex = prev.length;

        // Prevent typing beyond text length
        if (currentIndex >= text.length) {
          return prev;
        }
        return prev + e.key;
      });
    };

    document.addEventListener("keypress", detectKeyDown, true);

    return () => {
      document.removeEventListener("keypress", detectKeyDown, true);
    };
  }, [userInput, status, text]);

  return { userInput, status, wrongCounter };
};
