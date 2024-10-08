"use client"
import { useEffect, useState } from "react";
import Wordle from "@/components/Wordle";
import "@/app/App.css";
// import words from "./data/wordDb";
import dictionary from "@/data/dictionary";
import { useRouter } from "next/navigation";

function SinglePlayer() {
    const [solution, setSolution] = useState<String>();
    const [words, setWords] = useState<String[]>([]);
    const [beginTime, setBeginTime] = useState("");
    const router = useRouter();
    useEffect(() => {
        // TODO: get random word from api
        fetch('/api/getWord?corpusId=1')
            .then(response => response.json())
            .then((data) => {
                setSolution(data.word);
                const solution = data.word
                console.log("solution in fetch", solution);
                setWords(data.allWords);
                console.log("allWords", data.allWords);
            })
            .catch(error => console.error(error));
        // const dictWords = Object.keys(dictionary).filter(
        //     dict => dict.length === 5
        // );
        // setWords(dictWords);
        // const wordSize = dictWords.length;
        // let wordIndex = Math.floor(Math.random() * wordSize);
        // const solution = dictWords[wordIndex];
        // setSolution(solution);
        setBeginTime(new Date().toLocaleString("en-US"));
        console.log("solution", solution);
    }, []);

    return (
        <div className="singleplayer">
            <div>
                <button className="back" onClick={() => router.push("/")}>Home</button>
                <h1 className="title">Wordle</h1>
                <Wordle solution={solution} words={words} beginTime={beginTime} setIsPlayAgain={()=>{}} />
            </div>
        </div>
    );  
}

export default SinglePlayer;