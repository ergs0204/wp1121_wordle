import React from "react";
// import { getScoreboard } from "../app/api/getScoreboard";

export default function Gamestat ({ user, score, gameInfos }){

    const fetchScoreboard = () => {
        const scoreboard = getScoreboard();
        console.log(scoreboard);
        {scoreboard.map((user, i) => {
            return (
                <div key={i} className="game">
                    <div className="word">1</div>
                    <div className="turn">2</div>
                    <div className="time">3</div>
                </div>
            );
        })}
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

