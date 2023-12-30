"use client";

import { useEffect, useState, useContext } from "react";

import { useSearchParams } from "next/navigation";

import "@/app/App.css";
import SocketContext from "@/app/socket/SocketProvider";
import Grid from "@/components/Grid";
import SetProblem from "@/components/SetProblem2";
import Wordle from "@/components/Wordle";
// import words from "./data/wordDb";
import dictionary from "@/data/dictionary";

function Multiplayer() {
  const [solution, setSolution] = useState<String>();
  const [problem, setProblem] = useState<String>();
  const [isProvideProblem, setIsProvideProblem] = useState(false);
  const [isGetSolution, setIsGetSolution] = useState(false);
  const [words, setWords] = useState<String[]>([]);
  const [beginTime, setBeginTime] = useState("");
  const [gameStart, setGameStart] = useState(false);
  const socket = useContext(SocketContext);
  const searchParams = useSearchParams();
  const roomCode = searchParams.get("roomCode");

  const [guesses, setGuesses] = useState<String[]>([...Array(6)]);
  const [currentGuess, setCurrentGuess] = useState<String>("");
  const [turn, setTurn] = useState(0);

  const [isPlayAgain, setIsPlayAgain] = useState(false);
  const [isOpponentPlayAgain, setIsOpponentPlayAgain] = useState(false);

  useEffect(() => {
    const dictWords = Object.keys(dictionary).filter(
      (dict) => dict.length === 5,
    );
    setWords(dictWords);
    const wordSize = dictWords.length;
    let wordIndex = Math.floor(Math.random() * wordSize);
    const solution = dictWords[wordIndex];
    setSolution(solution);
    setBeginTime(new Date().toLocaleTimeString());
    console.log("solution", solution);
  }, [gameStart]);

  useEffect(() => {
    if (socket) {
      socket.on("get-problem", (solution) => {
        setIsGetSolution(true);
        setSolution(solution);
        console.log("bbb");
      });
      socket.on("get-guess", (formattedGuess, turn) => {
        setGuesses((guesses) => {
          let g = guesses.slice();
          g[turn] = formattedGuess;
          return g;
        });
        setTurn(turn + 1);
      });
      socket.on("opponent-play-again", () => {
        setIsOpponentPlayAgain(true);
      });
    }
  }, [socket]);

  useEffect(() => {
    if (isOpponentPlayAgain && isPlayAgain) {
        setIsOpponentPlayAgain(false);
        setIsPlayAgain(false);
        setIsProvideProblem(false);
        setIsGetSolution(false);
        setGuesses([...Array(6)]);
        setTurn(0);
    }
  }, [isOpponentPlayAgain, isPlayAgain]);

  const provideProblem = (problem: string) => {
    setProblem(problem);
    setIsProvideProblem(true);
  };

  return (
    <div className="multiplayer">
      {!isGetSolution || !isProvideProblem ? (
        <SetProblem provideProblem={provideProblem} />
      ) : (
        <div>
          <button className="back" onClick={() => (window.location.href = "/")}>
            Home
          </button>
          <h1 className="title">Wordle</h1>
          <div className="multizone">
            <div className="self">
              <a>YOU</a>
              <Wordle solution={solution} words={words} beginTime={beginTime} setIsPlayAgain={setIsPlayAgain} />
            </div>
            <div className="opponent">
              <a>OPPONENT</a>
              <h2>{problem}</h2>
              <Grid guesses={guesses} currentGuess={currentGuess} turn={turn} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Multiplayer;
