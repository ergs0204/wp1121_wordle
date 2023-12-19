import { useEffect, useState } from "react";
import Wordle from "./components/Wordle";
import "./App.css";
// import words from "./data/wordDb";
import dictionary from "./data/dictionary";
import Homepage from "./components/Homepage";
import LoginSignup from "./components/LoginSignup";
import Timer from "./components/Timer";
import Statistic from "./components/Statistic";

function App() {
    const [solution, setSolution] = useState();
    const [words, setWords] = useState([]);
    // const [page, setPage] = useState("login");

    let startTime = new Date();
    setInterval(updateTimer, 1000);

    useEffect(() => {
        const dictWords = Object.keys(dictionary).filter(
            dict => dict.length === 5
        );
        setWords(dictWords);
        const wordSize = dictWords.length;
        let wordIndex = Math.floor(Math.random() * wordSize);
        const solution = dictWords[wordIndex];
        setSolution(solution);
        // console.log("solution", solution);
    }, []);

    function updateTimer() {
        const elapsedTime = new Date() - startTime; 
        const minutes = Math.floor(elapsedTime / 60000); 
        const seconds = Math.floor((elapsedTime % 60000) / 1000); 
        const timerDisplay = `${minutes}:${seconds.toString().padStart(2, "0")}`; 
        return timerDisplay; 
    }

    
    return (
        <div className="App">
            <div>
                <button className="back"><a href="/">Home</a></button>
                <h1 className="title">Wordle</h1>
                <Timer />
                <Wordle solution={solution} words={words} />
            </div>
        </div>
    );  
}

export default App;
