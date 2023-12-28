import React from "react";
// import { getScoreboard } from "../app/api/getScoreboard";

export default function Gamestat ({ user }){

    const fetchScoreboard = async () => {
        const scoreboard = await getScoreboard();
        console.log(scoreboard);
    }

    return (
        <div className="gamestat">
            {scoreboard.map((user, i) => {
                return (
                    <div key={i} className="user">
                        <div className="username">{user.username}</div>
                        <div className="score">{user.score}</div>
                    </div>
                );
            })}
        </div>
    );
};

