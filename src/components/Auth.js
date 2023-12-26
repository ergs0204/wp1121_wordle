import React, { useRef } from "react";
import { useState, useEffect, useContext } from "react";
import user_icon from "../components/assets/person.png";
import password_icon from "../components/assets/password.png";
import email_icon from "../components/assets/email.png";
import AuthContext from "../context/AuthProvider";
import axios from "../api/axios";
const LOGIN_URL = "http://localhost:8080/api/auth";

export default function Auth() {
    const {setAuth} = useContext(AuthContext);
    const [action, setAction] = useState("Sign up");
    const userRef = useRef();
    const errorRef = useRef();
    const [user, setUser] = useState("");
    const [pwd, setPwd] = useState("");
    const [email, setEmail] = useState("");
    const [confirmPwd, setConfirmPwd] = useState("");
    const [errorMsg, setErrorMsg] = useState("");
    
    useEffect(() => {
        userRef.current.focus();
    }, []);

    useEffect(() => {
        setErrorMsg("");
    }, [user, pwd, confirmPwd, email]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (user === "" || pwd === "" || (action === "Sign up" && confirmPwd === "")) {
            setErrorMsg("Username and password cannot be empty!");
            return;
        }
        if (action === "Sign up" && email === "") {
            setErrorMsg("Email cannot be empty!");
            return;
        }
        if (action === "Sign up" && pwd !== confirmPwd) {
            setErrorMsg("Passwords do not match!");
            return;
        }
        if (action === "Sign up" && pwd.length < 4) {
            setErrorMsg("Password must be at least 4 characters!");
            return;
        }
        if (action === "Login") {
            try {
                const response = await axios.post(LOGIN_URL, 
                    JSON.stringify({user, pwd}),
                    {
                        headers: {'Content-Type': 'application/json'},
                        withCredentials: true
                    }
                );
                console.log(JSON.stringify(response?.data));
                // console.log(JSON.stringify(response));
                const accessToken = response?.data?.accessToken;
                const roles = response?.data?.roles;
                setAuth({ user, pwd, roles, accessToken });
            } catch (err) {
                if(!err?.response){
                    setErrorMsg("No response from server!");
                }
                else if(err.response.status === 400){
                    setErrorMsg("Missing username or password!");
                }
                else if(err.response.status === 401){
                    setErrorMsg("Unauthorized!");
                }
                else{
                    setErrorMsg("Login Failed!");
                }
                errorRef.current.focus();
            }
        }
        else if (action === "Sign up"){
            try {
                const response = await axios.post(LOGIN_URL + "/signup", 
                    JSON.stringify({user, pwd, email}),
                    {
                        headers: {'Content-Type': 'application/json'},
                        withCredentials: true
                    }
                );
                console.log(JSON.stringify(response?.data));
                // console.log(JSON.stringify(response));
                const accessToken = response?.data?.accessToken;
                const roles = response?.data?.roles;
                setAuth({ user, pwd, email, roles, accessToken });
            } catch (err) {
                if(!err?.response){
                    setErrorMsg("No response from server!");
                }
                else if(err.response.status === 400){
                    setErrorMsg("Username already exists!");
                }
                else{
                    setErrorMsg("Sign up Failed!");
                }
                errorRef.current.focus();
            }
        }
        console.log(user, pwd, confirmPwd, email);
        window.location.href = "/";
    }

    return (
        <div className="auth">
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
                <div className="input">
                    <img src={email_icon} alt="user icon" />
                    <input 
                        type="email" 
                        placeholder="Email" 
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                        required
                    />
                </div>
                </>
                }
            </div>
            <br />
            <div className="submit-container">
                <button className="playgame" onClick={handleSubmit}>go!</button>
            </div>
        </div>
    );
}