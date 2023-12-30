"use client"
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Gamestat from "@/components/Gamestat";
import { UserInfo } from "@/lib/types/type";

export default function Statistic() {
    const router = useRouter();
    const [score, setScore] = useState<String[]>([]);

    useEffect(() => {
        fetch('/api/getScoreboard')
            .then(response => response.json())
            .then((data) => {
                const newScores = data.map((user: UserInfo) => user.score);
                setScore(newScores);
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
