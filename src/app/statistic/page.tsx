"use client"
import React from "react";
import { useRouter } from "next/navigation";
import Gamestat from "@/components/Gamestat";
import { useState } from "react";

export default function Statistic (){
    const router = useRouter();
    const [user, setUser] = useState<String>('');
    const [score, setScore] = useState<String>('');
    const [gameInfos, setGameInfos] = useState<String[]>([]);

    // TODO: get personal statistic from api
    fetch('/api/getScoreboard')
            .then(response => response.json())
            .then((data) => {
                const userId = data.userId
                const score = data.score
                const gameInfos = data.games
                setUser(userId)
                setScore(score)
                setGameInfos(gameInfos)
            })
            .catch(error => console.error(error));

    return (
        <div className="statistic">
            <button className="back" onClick={() => router.push("/")}>Home</button>
            <h1>Wordle Statistic</h1>
            <h2>Player: {user}<br></br><br></br>score: {score}</h2>
            <div>
                <Gamestat gameInfos={gameInfos}/>
            </div>
        </div>
    );
};