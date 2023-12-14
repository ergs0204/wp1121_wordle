import { useEffect, useState } from "react";
import Wordle from "./components/Wordle";
import "./App.css";
// import words from "./data/wordDb";
import dictionary from "./data/dictionary";
import Homepage from "./components/Homepage";
import LoginSignup from "./components/LoginSignup";
import Timer from "./components/Timer";

function App() {
    const [solution, setSolution] = useState();
    const [words, setWords] = useState([]);
    const [homepage, setHomepage] = useState(true);
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
        console.log("solution", solution);
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
            {homepage 
            ? 
            // <LoginSignup />
            <Homepage homepage={homepage} setHomepage={setHomepage}/>
            : 
            <div>
                <button className="back" onClick={() => {setHomepage(true)}}>Home</button>
                <h1>Wordle</h1>
                <Timer />
                <Wordle solution={solution} words={words} />
            </div>
            }
        </div>
    );  
}

export default App;
