import { useEffect, useState } from "react";
import Wordle from "./components/Wordle";
import "./App.css";
// import words from "./data/wordDb";
import dictionary from "./data/dictionary";

function Singleplayer() {
    const [solution, setSolution] = useState();
    const [words, setWords] = useState([]);
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
        <div className="singleplayer">
            <div>
                <button className="back" onClick={() => window.location.href="/"}>Home</button>
                <h1 className="title">Wordle</h1>
                <Wordle solution={solution} words={words} beginTime={beginTime} />
            </div>
        </div>
    );  
}

export default Singleplayer;
