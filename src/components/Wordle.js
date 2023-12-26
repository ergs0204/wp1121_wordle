import React, { useEffect, useState } from "react";
import useWordle from "../hooks/useWordle";
import Grid from "./Grid";
import Modal from "./Modal";
import {useRouter} from "next/navigation";
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
    const navigate = useNavigate();
    const [costTime, setcostTime] = useState("");
    const [endTime, setEndTime] = useState("");
    const router = useRouter();

    useEffect(() => {
        window.addEventListener("keyup", handleKeyUp);
        if (isCorrect || turn > 5) {
            setTimeout(() => setShowModal(true), 1500);
            window.removeEventListener("keyup", handleKeyUp);
        }
        setEndTime(new Date().toLocaleTimeString());
        return () => window.removeEventListener("keyup", handleKeyUp);
    }, [handleKeyUp, isCorrect, turn]);

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
