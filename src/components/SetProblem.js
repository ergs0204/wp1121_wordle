"use client"
import React, { useState, useEffect, useRef, useContext } from "react";
import dictionary from "../data/dictionary";
import SocketContext from "@/app/socket/SocketProvider";
import { useSearchParams } from 'next/navigation';

export default function SetProblem({provideProblem}) {
    const [solution, setSolution] = useState();
    const [errorMsg, setErrorMsg] = useState("");
    const [isProvideProblem, setIsProvideProblem] = useState(false);
    const errorRef = useRef();
    const socket = useContext(SocketContext);
    const searchParams = useSearchParams();
    const roomCode = searchParams.get("roomCode");
    useEffect(() => {
        setErrorMsg("");
    }, [solution]);

    const handleSave = () => {
        if (solution === "") {
            setErrorMsg("Solution cannot be empty!");
            return false;
        };
        if (solution.length !== 5) {
            setErrorMsg("Solution must be 5 characters!");
            return false;
        };
        // if (!dictionary.includes(solution)) {
        //     setErrorMsg("Solution must be a valid word!");
        //     return false;
        // };
        socket.emit("set-problem", solution, roomCode);
        provideProblem(solution);
        setIsProvideProblem(true);
        return true;
      };


    return (
        <div className="set-problem">
            <h2>Set Problem</h2>
            <h3>Enter your problem:</h3>
            <textarea
                placeholder="Enter your problem here..."
                onChange={(e) => setSolution(e.target.value)}
                value={solution}
                required
            />
            <p ref={errorRef} className={errorMsg?"error":"error hidden"} aria-live="assertive">{errorMsg}</p>
            <button onClick={handleSave}>{isProvideProblem?"wait for opponent...":"start!"}</button>
            {/* <div>
                <p className="solution">THE SOLUTION IS: </p>
                {solutionBlock}
                <button className="reset" onClick={newGame}>
                    Play Again
                </button>
                <br />
            </div> */}
        </div>
    );
}