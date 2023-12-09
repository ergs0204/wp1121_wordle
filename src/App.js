import { useEffect, useState } from "react";
import Wordle from "./components/Wordle";
import "./App.css";
// import words from "./data/wordDb";
import dictionary from "./data/dictionary";
import Footer from "./components/Footer";
import Homepage from "./components/Homepage";

function App() {
    const [solution, setSolution] = useState();
    const [words, setWords] = useState([]);
    const [homepage, setHomepage] = useState(false);

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

    return (    
        <div className="App">
            {homepage 
            ? 
            <Homepage homepage={homepage} setHomepage={setHomepage}/>
            : 
            <div>
                <button className="flex" onClick={() => {setHomepage(true)}}>Home</button>
                <h1>Wordle</h1>
                <Wordle solution={solution} words={words} />
                <Footer />
            </div>
            }
        </div>
    );
}

export default App;
