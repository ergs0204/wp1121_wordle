import React from "react";
// import { getScoreboard } from "../app/api/getScoreboard";

export default function Gamestat ({ gameInfos }){
    const gameWord = gameInfos.word;
    const gameTurn = gameInfos.guesses;
    // const startTime = gameInfos.startTime;
    // const endTime = gameInfos.endTime;
    // const gameTime = endTime - startTime;
    e.map((gameInfo) => {
        console.log(gameInfo);
    });

    const gamestat = () => {
        return (
                <div className="game">
                    <div className="word">{gameWord}</div>
                    <div className="turn">{gameTurn}</div>
                    <div className="time">time</div>
                </div>
        );
    }

    return (
        <div className="gamestat">
            <div className="game">
                <div className="word">word</div>
                <div className="turn">turn</div>
                <div className="time">time</div>
            </div>
        </div>
    );
};

