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
    const mode = "singleplayer";
    const router = useRouter();

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
                <button className="back" onClick={() => router.push("/")}>Home</button>
                <h1 className="title">Wordle</h1>
                <Wordle solution={solution} words={words} beginTime={beginTime} mode={mode}/>
            </div>
        </div>
    );  
}

export default SinglePlayer;