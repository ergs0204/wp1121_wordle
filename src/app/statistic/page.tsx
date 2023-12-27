"use client"
import React from "react";

export default function Statistic (){

    return (
        <div className="statistic">
            <button className="back" onClick={() => window.location.href="/"}>Home</button>
            <h1>Wordle Statistic</h1>
        </div>
    );
};