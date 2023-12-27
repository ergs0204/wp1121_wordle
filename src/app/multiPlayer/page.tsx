"use client"
import { useEffect, useState } from "react";
import Wordle from "@/components/Wordle";
import "@/app/App.css";
// import words from "./data/wordDb";
import dictionary from "@/data/dictionary";

function Multiplayer() {
    const [solution, setSolution] = useState<String>();
    const [words, setWords] = useState<String[]>([]);
    const [beginTime, setBeginTime] = useState("");

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
    }, []);
    
    return (
        <div className="multiplayer">
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
                        <Wordle solution={solution} words={words} beginTime={beginTime} />
                    </div>
                </div>
            </div>
        </div>
    );  
}

export default Multiplayer;