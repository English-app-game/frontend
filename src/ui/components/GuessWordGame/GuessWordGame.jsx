import { useState, useEffect, useCallback } from "react";
import { fetchRandomWords } from "../../../services/GeussGame";
import { pickMissingIndexes, isGuessComplete } from "../../../utils/gameLogic";

import WordDisplay from "./WordDisplay";
import VirtualKeyboard from "./VirtualKeyboard";
import ButtonGuessWord from "./ButtonGuessWord";
import UserInfoHeader from "../UserInfoHeader";

import Confetti from "react-confetti";
import { useWindowSize } from "@uidotdev/usehooks";

import ExitButton from "../ExitButton";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../../routes/routes_consts";
import { useDispatch } from "react-redux";
import { resetRoom } from "../../../store/slices/roomSlice";

export default function GuessWordGame({ handleBack }) {
  const [words, setWords] = useState([]); //get the words list
  const [index, setIndex] = useState(0); //from all the words, showing the index of the current word
  const [missingIdxs, setMissingIdxs] = useState([]); //showing the missing inxs of the current word
  const [guesses, setGuesses] = useState([]); //the letters that the user geuss from keyboard
  const [isCompleted, setIsCompleted] = useState(false);
  const { width, height } = useWindowSize(); //for the confeti
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const currentPresentedWord = words[index] || "";

  //new word - new turn
  const setupNewWord = useCallback(() => {
    setGuesses([]); //restarts the keyboard
    setMissingIdxs(
      pickMissingIndexes(currentPresentedWord, Math.random() < 0.5 ? 1 : 2)
    );
    setIsCompleted(false);
  }, [currentPresentedWord]);

  useEffect(() => {
    if (!words.length) {
      fetchRandomWords().then(setWords).catch(console.error);
      return;
    }

    setupNewWord();
  }, [words.length, index, setupNewWord]);

  const handleLetterClick = (letter) => {
    const lower = letter.toLowerCase();
    if (guesses.includes(lower)) return;

    const updated = [...guesses, lower];
    setGuesses(updated);

    if (isGuessComplete(currentPresentedWord, missingIdxs, updated)) {
      setIsCompleted(true);
      setTimeout(() => setIndex((i) => (i + 1) % words.length), 4000); //move to the next word
    }
  };

  const handleHint = () => {
    const remaining = missingIdxs
      .map((i) => currentPresentedWord[i].toLowerCase())
      .filter((ch) => !guesses.includes(ch));

    if (!remaining.length) return;

    const hintLetter = remaining[Math.floor(Math.random() * remaining.length)];
    const updated = [...guesses, hintLetter];
    setGuesses(updated);

    if (isGuessComplete(currentPresentedWord, missingIdxs, updated)) {
      setIsCompleted(true);
      setTimeout(() => setIndex((i) => (i + 1) % words.length), 4000); //move to the next word
    }
  };

  const goToNextWord = () => {
    setIsCompleted(false);
    setIndex((i) => (i + 1) % words.length);
  };

  const handleExit = () => {
    localStorage.removeItem("enteredFromWaitingRoom");
    dispatch(resetRoom());
    navigate(ROUTES.ROOMS_LIST);
  };

  return (
    <>
      {isCompleted && (
        <Confetti
          width={width}
          height={height}
          numberOfPieces={320}
          recycle={false}
          tweenDuration={800}
          confettiSource={{
            x: width / 2,
            y: height / 2,
            w: 10,
            h: 10,
          }}
        />
      )}

      <div className="flex flex-col justify-between h-screen px-2 py-4 bg-[url('/homePage.png')] bg-cover bg-center">
        <div className="absolute top-4 left-4">
          <ExitButton
            onClick={handleExit}
            className="bg-rose-300 border-4 border-orange-600 hover:bg-rose-400 text-xs sm:text-base px-3 py-2 sm:px-5 sm:py-3"
          >
            EXIT GAME{" "}
          </ExitButton>
        </div>
        <div>
          {" "}
          <UserInfoHeader />
        </div>

        <div className="flex justify-center items-center flex-1">
          <WordDisplay
            word={currentPresentedWord}
            missingIdxs={missingIdxs}
            guesses={guesses}
          />
        </div>

        <div className="flex justify-center gap-6 mb-6">
          <ButtonGuessWord
            text="Want a hint?"
            onClick={handleHint}
            className="px-5 py-2 rounded-full font-semibold text-base
              bg-sky-200 text-sky-800 hover:bg-sky-300 active:bg-sky-400
              disabled:bg-sky-100 disabled:text-sky-400 disabled:cursor-not-allowed transition shadow-sm"
          />
          <ButtonGuessWord
            text="Next word"
            onClick={goToNextWord}
            className="px-5 py-2 rounded-full font-semibold text-base
              bg-sky-200 text-sky-800 hover:bg-sky-300 active:bg-sky-400
              disabled:bg-sky-100 disabled:text-sky-400 disabled:cursor-not-allowed transition shadow-sm"
          />
        </div>

        <VirtualKeyboard onClick={handleLetterClick} disabledKeys={guesses} />
      </div>
    </>
  );
}
