"use client"
import React, { useState, useContext } from "react";
import dictionary from "./../data/dictionary";
import { useRouter } from "next/navigation";
import SocketContext from "@/app/socket/SocketProvider";
import { useSearchParams } from "next/navigation";
export default function Modal({
    isMulti,
    isCorrect,
    isOpponentEnd,
    solution,
    turn,
    costTime,
    beginTime,
    endTime,
    resetGame,
    closeModal,
    setIsPlayAgain,
}) {
    const [showDefn, setShowDefn] = useState(false);
    const [isWaiting, setIsWaiting] = useState(false);
    const router = useRouter();
    const socket = useContext(SocketContext);
    const searchParams = useSearchParams();
    const roomCode = searchParams.get("roomCode");
    let letters = solution.split("");
    const solutionBlock = (
        <div className="row current">
            {letters.map((letter, i) => (
                <div key={i} className="green">
                    {letter}
                </div>
            ))}
        </div>
    );

    const newGame = () => {
        resetGame();
        if (isMulti) {
            socket.emit("play-again", roomCode);
            setIsPlayAgain(true);
            setIsWaiting(true);
        }
        else{
            closeModal();
            router.push("/newSgame")
        }
        
    };

    return (
        <div className="modal">
            <div>
                {isCorrect && !isOpponentEnd && (
                    <>
                        <h1>You Win!</h1>
                        <p>You found the solution in {turn} guesses :</p>
                    </>
                )}
                {isCorrect && isOpponentEnd && (
                    <>
                        <h1>You Lose!</h1>
                        <p>Your opponent found the solution in {turn} guesses :</p>
                    </>
                )}
                {!isMulti && !isCorrect && (
                    <>
                        <h1>NeverMind</h1>
                        <p>Better luck next time :</p>
                    </>
                )}
                {isMulti && !isCorrect && !isOpponentEnd && (
                    <>
                        <h1>You Lose!</h1>
                        <p>You have used up your turns!</p>
                    </>
                )}
                {isMulti && !isCorrect && isOpponentEnd && (
                    <>
                        <h1>You Win!</h1>
                        <p>Your opponent has used up their turns!</p>
                    </>
                )}
                <p className="time">Your time: {costTime}</p>
                <p className="time">Start time: {beginTime}</p>
                <p className="time">End time: {endTime}</p>
                <p className="solution">THE SOLUTION IS: </p>
                {solutionBlock}
                <button className="reset" onClick={newGame}>
                    {isWaiting ? "Wait for opponent" : " Play Again"}
                </button>
                <button
                    className="anchor"
                    onClick={() => setShowDefn(prev => !prev)}
                >
                    What does it mean?
                </button>
                <button
                    className="home"
                    onClick={() => router.push("/")}
                >
                    Home
                </button>
                <div className={`meaning ${showDefn ? "show" : ""}`}>
                    <p className="definition">{dictionary[solution]}</p>
                </div>
            </div>
        </div>
    );
}
