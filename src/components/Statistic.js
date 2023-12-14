import React from "react";

export default function Statistic ({setPage}){

    return (
        <div className="statistic">
            <h1>Wordle Statistic</h1>
            <button className="back" onClick={() => {setPage("home")}}>Home</button>
        </div>
    );
};

