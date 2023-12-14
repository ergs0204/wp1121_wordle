import React from "react";
import { useState } from "react";
import user_icon from "../components/assets/person.png";
import email_icon from "../components/assets/email.png";
import password_icon from "../components/assets/password.png";

export default function LoginSignup() {

    const [action, setAction] = useState("Sign up");

    return (
        <div className="loginsignup">
            <div className="header">
                <div className="text">{action}</div>
                <div className="underline"></div>
            </div>
            <div className="inputs">
                {action==="Login"
                ?
                <div></div>
                :
                <div className="input">
                    <img src={user_icon} alt="user icon" />
                    <input type="text" placeholder="Username" />
                </div>
                }
                <div className="input">
                    <img src={email_icon} alt="user icon" />
                    <input type="email" placeholder="Email" />
                </div>
                <div className="input">
                    <img src={password_icon} alt="user icon" />
                    <input type="password" placeholder="Password" />
                </div>
            </div>
            <div className="submit-container">
                <div className={action==="Login"?"submit gray":"submit"} onClick={()=>{setAction("Sign up")}}>Sign up</div>
                <div className={action==="Sign up"?"submit gray":"submit"} onClick={()=>{setAction("Login")}}>Login</div>
            </div>
        </div>
    );
}