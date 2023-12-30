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
        saveData,
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
            saveGameResult();
        }
        setEndTime(new Date().toLocaleString("en-US"));
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
    
    const saveGameResult = async () => {
        try {
            // console.log(new Date(beginTime) );

            // Make an API call to your backend server to save the game result
            // console.log("data",saveData);
            // console.log("starttime",beginTime.getTime());
            const response = await fetch("/api/finishGame", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    // Pass the necessary data to save the game result
                    // For example, you can pass the solution, turn, costTime, etc.
                    // TODO: userid / session
                    // userId: "1",
                    word: solution,
                    corpusId: 1,
                    startTime: beginTime,
                    endTime: endTime,
                    guesses: saveData,
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