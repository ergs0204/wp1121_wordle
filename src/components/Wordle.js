import React, { useEffect, useState } from "react";
import useWordle from "../hooks/useWordle";
import Grid from "./Grid";
import Modal from "./Modal";
import { useRouter } from "next/navigation";
import Keypad from "./Keypad";
import letters from "../data/letters";
import Timer from "./Timer";
import Setproblem from "./Setproblem";

const Wordle = ({ words, solution, beginTime, mode }) => {
    const {
        currentGuess,
        setCurrentGuess,
        guesses,
        isCorrect,
        turn,
        handleKeyUp,
        errorMsg,
        setErrorMsg,
        resetGame,
        usedKeys,
    } = useWordle(words, solution);

    const [showModal, setShowModal] = useState(false);
    const [costTime, setcostTime] = useState("");
    const [endTime, setEndTime] = useState("");
    const router = useRouter();

    useEffect(() => {
        window.addEventListener("keyup", handleKeyUp);
        if (isCorrect || turn > 5) {
            setTimeout(() => setShowModal(true), 1500);
            window.removeEventListener("keyup", handleKeyUp);
            saveGameResult(); // Call the function to save the game result
        }
        setEndTime(new Date().toLocaleTimeString());
        return () => window.removeEventListener("keyup", handleKeyUp);
    }, [handleKeyUp, isCorrect, turn]);

    const saveGameResult = async () => {
        try {
            // Make an API call to your backend server to save the game result
            const response = await fetch("/api/saveGameResult", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    // Pass the necessary data to save the game result
                    // For example, you can pass the solution, turn, costTime, etc.
                    solution,
                    turn,
                    costTime,
                }),
            });
            if (response.ok) {
                console.log("Game result saved successfully!");
            } else {
                console.error("Failed to save game result");
            }
        } catch (error) {
            console.error("An error occurred while saving the game result", error);
        }
    };

    const closeModal = () => {
        setShowModal(prev => !prev);
        router.push("/newSgame");
    };

    return (
        <div className="main">
            {mode === "multiplayer" && <Setproblem />}
            <Timer showModal={showModal} setcostTime={setcostTime} />
            {showModal && (
                <Modal
                    isCorrect={isCorrect}
                    turn={turn}
                    costTime={costTime}
                    beginTime={beginTime}
                    endTime={endTime}
                    solution={solution}
                    resetGame={resetGame}
                    closeModal={closeModal}
                />
            )}
            {/* <div className="moves">Moves: {turn}/6</div> */}
            {errorMsg && (
                <div className="error">
                    <p>{errorMsg}</p>
                    <button
                        onClick={() => {
                            setErrorMsg("");
                            setCurrentGuess("");
                        }}
                    >
                        X
                    </button>
                </div>
            )}
            <Grid guesses={guesses} currentGuess={currentGuess} turn={turn} />
            <Keypad letters={letters} usedKeys={usedKeys} />
        </div>
    );
};

export default Wordle;
