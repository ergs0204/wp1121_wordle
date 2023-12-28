"use client"
import React, { useEffect, useState, useContext } from "react";
import useWordle from "../hooks/useWordle";
import Grid from "./Grid";
import Modal from "./Modal";
import { useRouter } from 'next/navigation';
import { useSearchParams } from "next/navigation";
import Keypad from "./Keypad";
import letters from "../data/letters";
import Timer from "./Timer";
import SocketContext from "@/app/socket/SocketProvider";

const Wordle = ({ words, solution, beginTime, setIsPlayAgain}) => {
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
    const router = useRouter();
    const searchParams = useSearchParams();
    const roomCode = searchParams.get("roomCode");
    const [costTime, setcostTime] = useState("");
    const [endTime, setEndTime] = useState("");
    const socket = useContext(SocketContext);
    const [isOpponentEnd, setIsOpponentEnd] = useState(false);
    const [isOpponentCorrect, setIsOpponentCorrect] = useState(false);
    const [opponentTurn, setOpponentTurn] = useState(0);
    useEffect(() => {
        window.addEventListener("keyup", handleKeyUp);
        if (isCorrect || turn > 5) {
            socket.emit("end-game", isCorrect, turn, roomCode);
            setTimeout(() => setShowModal(true), 1500);
            window.removeEventListener("keyup", handleKeyUp);
        }
        setEndTime(new Date().toLocaleTimeString());
        return () => window.removeEventListener("keyup", handleKeyUp);
    }, [handleKeyUp, isCorrect, turn]);

    useEffect(() => {
        if (socket) {
            socket.on("opponent-end-game", (isCorrect, turn) => {
                setIsOpponentEnd(true);
                setIsOpponentCorrect(isCorrect);
                setOpponentTurn(turn);
                setShowModal(true);
                window.removeEventListener("keyup", handleKeyUp);
            });
        }
    }, [socket]);

    const closeModal = () => {
        setShowModal(prev => !prev);
        if (!roomCode) {
            router.push('/singlePlayer');
        }
    };



    return (
        <div className="main">
            <Timer showModal={showModal} setcostTime={setcostTime} />
            {showModal && (
                <Modal
                    isMulti={roomCode ? true : false}
                    isCorrect={isOpponentEnd ? isOpponentCorrect : isCorrect}
                    turn={isOpponentEnd ? opponentTurn : turn}
                    isOpponentEnd={isOpponentEnd}
                    costTime={costTime}
                    beginTime={beginTime}
                    endTime={endTime}
                    solution={solution}
                    resetGame={resetGame}
                    closeModal={closeModal}
                    setIsPlayAgain={setIsPlayAgain}
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