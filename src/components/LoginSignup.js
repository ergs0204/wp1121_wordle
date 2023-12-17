import React, { useRef } from "react";
import { useState, useEffect } from "react";
import user_icon from "../components/assets/person.png";
import password_icon from "../components/assets/password.png";


export default function LoginSignup({setPage}) {

    const [action, setAction] = useState("Sign up");
    const userRef = useRef();
    const errorRef = useRef();
    const [user, setUser] = useState("");
    const [pwd, setPwd] = useState("");
    const [confirmPwd, setConfirmPwd] = useState("");
    const [errorMsg, setErrorMsg] = useState("");
    const [success, setSuccess] = useState(false);  

    useEffect(() => {
        userRef.current.focus();
    }, []);

    useEffect(() => {
        setErrorMsg("");
    }, [user, pwd, confirmPwd]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (user === "" || pwd === "") {
            setErrorMsg("Username and password cannot be empty!");
            return;
        }
        if (action === "Sign up" && pwd !== confirmPwd) {
            setErrorMsg("Passwords do not match!");
            return;
        }
        // if (action === "Sign up") {
        //     const res = await fetch("/api/signup", {
        //         method: "POST",
        //         headers: {
        //             "Content-Type": "application/json",
        //         },
        //         body: JSON.stringify({
        //             username: user,
        //             password: pwd,
        //         }),
        //     });
        //     const data = await res.json();
        //     if (data.error) {
        //         setErrorMsg(data.error);
        //     } else {
        //         setSuccess(true);
        //     }
        // } else {
        //     const res = await fetch("/api/login", {
        //         method: "POST",
        //         headers: {
        //             "Content-Type": "application/json",
        //         },
        //         body: JSON.stringify({
        //             username: user,
        //             password: pwd,
        //         }),
        //     });
        //     const data = await res.json();
        //     if (data.error) {
        //         setErrorMsg(data.error);
        //     } else {
        //         setSuccess(true);
        //     }
        // }
        console.log(user, pwd, confirmPwd);
        setSuccess(true)
    }

    return (
        <div className="loginsignup">
            {success 
            ? 
            <div>
                <div className="message">{user}, Welcome!</div>
                <br />
                <button className="playgame" onClick={() => {setPage("home")}}>Play Wordle!</button>
            </div>
            :
            (<>
            <div className="header">
                <div className="text">{action} for Wordle</div>
                <div className="underline"></div>
            </div>
            <div className="submit-container">
                <div className={action==="Login"?"submit gray":"submit"} onClick={()=>{setAction("Sign up")}}>Sign up</div>
                <div className={action==="Sign up"?"submit gray":"submit"} onClick={()=>{setAction("Login")}}>Login</div>
            </div>
            <p ref={errorRef} className={errorMsg?"error":"error hidden"} aria-live="assertive">{errorMsg}</p>
            <div className="inputs">
                <div className="input">
                    <img src={user_icon} alt="user icon" />
                    <input 
                        type="text" 
                        ref={userRef} 
                        placeholder="Username" 
                        onChange={(e) => setUser(e.target.value)} 
                        value={user}
                        required 
                    />
                </div>
                <div className="input">
                    <img src={password_icon} alt="user icon" />
                    <input 
                        type="password" 
                        placeholder="Password" 
                        onChange={(e) => setPwd(e.target.value)}
                        value={pwd}
                        required
                    />
                </div>
                {action==="Login"
                ?
                <></>
                :
                <>
                <div className="input">
                    <img src={password_icon} alt="user icon" />
                    <input 
                        type="password" 
                        placeholder="Confirm Password" 
                        onChange={(e) => setConfirmPwd(e.target.value)}
                        value={confirmPwd}
                        required
                    />
                </div>
                </>
                }
                
            </div>
            <div className="submit-container">
                <button className="enter" onClick={handleSubmit}>go!</button>
            </div>
            </>)
}
        </div>
    );
}