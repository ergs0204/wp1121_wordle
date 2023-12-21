import React, { useState } from "react";
import dictionary from "./../data/dictionary";

export default function Modal({
    isCorrect,
    solution,
    turn,
    costTime,
    beginTime,
    endTime,
    resetGame,
    closeModal,
}) {
    const [showDefn, setShowDefn] = useState(false);

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
        closeModal();
    };

    return (
        <div className="modal">
            <div>
                {isCorrect && (
                    <>
                        <h1>You Win!</h1>
                        <p>You found the solution in {turn} guesses :)</p>
                    </>
                )}
                {!isCorrect && (
                    <>
                        <h1>Nevermind</h1>
                        <p>Better luck next time :)</p>
                    </>
                )}
                <p className="time">Your time: {costTime}</p>
                <p className="time">Start time: {beginTime}</p>
                <p className="time">End time: {endTime}</p>
                <p className="solution">THE SOLUTION IS: </p>
                {solutionBlock}
                <button className="reset" onClick={newGame}>
                    Play Again
                </button>
                <button
                    className="anchor"
                    onClick={() => setShowDefn(prev => !prev)}
                >
                    What does it mean?
                </button>
                <div className={`meaning ${showDefn ? "show" : ""}`}>
                    <p className="definition">{dictionary[solution]}</p>
                </div>
                <br />
                <button
                    className="home"
                    onClick={() => window.location.href = "/"}
                >
                    Home
                </button>
            </div>
        </div>
    );
}
