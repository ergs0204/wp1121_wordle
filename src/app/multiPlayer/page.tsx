"use client"
import { useEffect, useState, useContext } from "react";
import Wordle from "@/components/Wordle";
import SetProblem from "@/components/SetProblem";
import "@/app/App.css";
// import words from "./data/wordDb";
import dictionary from "@/data/dictionary";
import SocketContext from "@/app/socket/SocketProvider";
import { useSearchParams } from 'next/navigation';

function Multiplayer() {
    const [solution, setSolution] = useState<String>();
    const [problem, setProblem] = useState<String>();
    const [isProvideProblem, setIsProvideProblem] = useState(false)
    const [isGetSolution, setIsGetSolution] = useState(false)
    const [words, setWords] = useState<String[]>([]);
    const [beginTime, setBeginTime] = useState("");
    const [gameStart, setGameStart] = useState(false);
    const socket = useContext(SocketContext);
    const searchParams = useSearchParams();
    const roomCode = searchParams.get("roomCode");

    useEffect(() => {
        const dictWords = Object.keys(dictionary).filter(
            dict => dict.length === 5
        );
        setWords(dictWords);
        const wordSize = dictWords.length;
        let wordIndex = Math.floor(Math.random() * wordSize);
        const solution = dictWords[wordIndex];
        setSolution(solution);
        setBeginTime(new Date().toLocaleTimeString());
        console.log("solution", solution);
    }, [gameStart]);
    useEffect(()=>{
        if(socket){
            socket.on("get-problem", (solution) => {
                setIsGetSolution(true);
                setSolution(solution);
              });
        }
    }, [socket])

    const provideProblem = (problem : string) => {
        setProblem(problem);
        setIsProvideProblem(true);
    }
    return (
        <div className="multiplayer">
            {(!isGetSolution || !isProvideProblem) && <SetProblem provideProblem = {provideProblem}/>}
            <div>
                <button className="back" onClick={() => window.location.href="/"}>Home</button>
                <h1 className="title">Wordle</h1>
                <div className="multizone">
                    <div className="self">
                        <a>YOU</a>
                        <Wordle solution={solution} words={words} beginTime={beginTime} />
                    </div>
                    <div className="opponent">
                        <a>OPPONENT</a>
                        <a>{problem}</a>
                        <Wordle solution={problem} words={words} beginTime={beginTime} />
                    </div>
                </div>
            </div>
        </div>
    );  
}

export default Multiplayer;