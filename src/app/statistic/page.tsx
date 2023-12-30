"use client"
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Gamestat from "@/components/Gamestat";
import { UserInfo } from "@/lib/types/type";

export default function Statistic() {
    const router = useRouter();
<<<<<<< HEAD
    const [score, setScore] = useState<String[]>([]);
    const [names, setNames] = useState<String[]>([]);

    useEffect(() => {
        fetch('/api/getScoreboard')
            .then(response => response.json())
            .then((data) => {
                const newScores = data.map((user: UserInfo) => user.score);
                const newNames = data.map((user: UserInfo) => user.userId);
                setScore(newScores);
                setNames(newNames);
=======
    const [score, setScore] = useState<String>('');
    const [gameInfos, setGameInfos] = useState<String[]>([]);

    // TODO: get personal statistic from api
    fetch('/api/[userId]/getUserInfo')
            .then(response => response.json())
            .then((data) => {
                const score = data.score
                const gameInfos = data.games
                setScore(score)
                setGameInfos(gameInfos)
>>>>>>> 21a5e65d6a2e063e7dd029aeb61bd48e964d69c0
            })
            .catch(error => console.error(error));
    }, []);

    return (
        <div className="statistic">
            <button className="back" onClick={() => router.push("/")}>Home</button>
            <h1>Wordle Statistic</h1>
            <div>
                <Gamestat score={score}/>
            </div>
        </div>
    );
}
