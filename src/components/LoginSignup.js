import React, { useRef } from "react";
import { useState, useEffect, useContext } from "react";
import user_icon from "../components/assets/person.png";
import password_icon from "../components/assets/password.png";
import AuthContext from "../context/AuthProvider";
import axios from "../api/axios";
const LOGIN_URL = "/auth";


export default function LoginSignup({setPage}) {

    const {setAuth} = useContext(AuthContext);
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
        if (action === "Sign up" && pwd.length < 4) {
            setErrorMsg("Password must be at least 4 characters!");
            return;
        }
        if (action === "login") {
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
                    setErrorMsg("Username already exists!");
                }
                else{
                    setErrorMsg("Sign up Failed!");
                }
            }
        }
        
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