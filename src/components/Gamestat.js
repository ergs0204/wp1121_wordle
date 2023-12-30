"use client"
import React from "react";
import { useSession } from "next-auth/react";

export default function Gamestat({ score }) {
    // const gameWord = gameInfos.word;
    // const gameTurn = gameInfos.guesses;
    // const startTime = gameInfos.startTime;
    // const endTime = gameInfos.endTime;
    // const gameTime = endTime - startTime;
export default function Gamestat ({ gameInfos, score }){
    const gameWord = gameInfos.word;
    const gameTurn = gameInfos.guesses;
    const { data: session } = useSession();


    const gamestat = () => {

        return (
            <div className="game">
                {/* <div className="word">{gameWord}</div>
                <div className="turn">{gameTurn}</div>
                <div className="time">{gameTime}</div> */}
            </div>
        );
    }

    return (
        <div className="gamestat">
            {/* <p className="user">Player:{names[0]}</p> */}
            {/* <p className="score">Score:{score[0]}</p> */}
            <div className="game">
                <div className="word">word</div>
                <div className="turn">turn</div>
            </div>
            {score.map((score) => {<>                           
            <div className="word">{score}</div></>
            })}
        </div>
    );
};