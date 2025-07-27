import { useState, useEffect } from "react";

export const useTypingTest = (text: string) => {
  const [userInput, setUserInput] = useState("");
  const [status, setStatus] = useState<"idle" | "active" | "completed">("idle");
  const [wrongCounter, setWrongCounter] = useState(0);
  const [timerState, setTimerState] = useState({
    timerValue: 0,
    prevTime: Date.now(),
    isRunning: false,
  });

  //timer

  useEffect(() => {
    let watchDog: ReturnType<typeof setInterval>;

    if (status === "active") {
      if (!timerState.isRunning) {
        // Start timer
        setTimerState((prev) => ({
          ...prev,
          isRunning: true,
          prevTime: Date.now(),
        }));
      }

      watchDog = setInterval(() => {
        const now = Date.now();
        setTimerState((ps) => ({
          ...ps,
          timerValue: ps.timerValue + (now - ps.prevTime),
          prevTime: now,
        }));
      }, 100);
    }

    return () => {
      if (watchDog) {
        clearInterval(watchDog);
      }
    };
  }, [status, timerState.isRunning]);

  //update Status
  useEffect(() => {
    if (userInput.length >= text.length) {
      setStatus("completed");
    } else if (userInput.length > 0 && status === "idle") {
      setStatus("active");
    }
  }, [userInput.length, text.length, status]);

  //save key stroke - universal
  useEffect(() => {
    if (status === "completed") {
      console.log(1);
      const errors = [...userInput].filter(
        (char, index) => char !== text[index]
      ).length;
      setWrongCounter(errors);
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
  }, [userInput, text, status]);

  const resetHandler = () => {
    setUserInput("");
    setStatus("idle");
    setWrongCounter(0);
    setTimerState(() => ({
      timerValue: 0,
      prevTime: Date.now(),
      isRunning: false,
    }));
  };

    const timeInSeconds = Math.round(timerState.timerValue / 1000);

  return { userInput, status, wrongCounter,timeInSeconds, resetHandler };
};
