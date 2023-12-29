import React from "react";
// import { getScoreboard } from "../app/api/getScoreboard";

export default function Gamestat ({ user }){

    const fetchScoreboard = () => {
        const scoreboard = getScoreboard();
        console.log(scoreboard);
        {scoreboard.map((user, i) => {
            return (
                <div key={i} className="user">
                    <div className="username">{user.username}</div>
                    <div className="score">{user.score}</div>
                </div>
            );
        })}
    }

    return (
        <div className="gamestat">
            
        </div>
    );
};