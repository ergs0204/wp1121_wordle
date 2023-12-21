import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import Auth from "./components/Auth";
import { AuthProvider } from "./context/AuthProvider";
import Homepage from "./components/Homepage";
import Statistic from "./components/Statistic";
  
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <AuthProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Homepage />} />
                    <Route path="/auth" element={<Auth />} />
                    <Route path="/singleplayer" element={<App />} />
                    <Route path="/multiplayer" element={<App />} />
                    <Route path="/newSgame" element={<Navigate to="/singleplayer" />} />
                    <Route path="/newMgame" element={<Navigate to="/multiplayer" />} />
                    <Route path="/statistic" element={<Statistic />} />
                </Routes>
            </BrowserRouter>
        </AuthProvider>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
