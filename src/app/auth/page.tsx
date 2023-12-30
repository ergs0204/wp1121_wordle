"use client"
import React, { useRef } from "react";
import { useState, useEffect, useContext } from "react";
import {signIn, useSession} from "next-auth/react";
import { publicEnv } from "@/lib/env/public";
import AuthContext from "./AuthProvider";
import { useRouter, redirect } from "next/navigation";
import { auth, GET, POST } from "@/lib/auth";

export default function Auth() {
    const setAuth = useContext(AuthContext);
    const [action, setAction] = useState<string>("Sign up");
    const userRef = useRef<HTMLInputElement>(null);
    const errorRef = useRef<HTMLParagraphElement>(null);
    const [user, setUser] = useState<string>("");
    const [pwd, setPwd] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [confirmPwd, setConfirmPwd] = useState<string>("");
    const [errorMsg, setErrorMsg] = useState<string>("");
    const router = useRouter();

    // const session = await auth();
    // if (session?.user) {
    //     redirect(`${publicEnv.NEXT_PUBLIC_BASE_URL}`);
    // }
    
    useEffect(() => {
        userRef.current?.focus();
    }, []);

    useEffect(() => {
        setErrorMsg("");
    }, [user, pwd, confirmPwd, email]);

    const handleSubmit = async (e: React.FormEvent<HTMLButtonElement>) => {
        e.preventDefault();
        
        if (email === "" || pwd === "") {
            setErrorMsg("Email and password cannot be empty!");
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

        
        if (action === "Sign up") {
            const res = await signIn("credentials", {
                username: user,
                password: pwd,
                email: email,
                callbackUrl: `${publicEnv.NEXT_PUBLIC_BASE_URL}`,
            })
            if (!res?.error) {
                router.push("/");
            } else {
                setErrorMsg(res.error || "Login failed");
            }
        }
        if (action === "Login") {
                        console.log(pwd, email)
            const res = await signIn("credentials", {
                email: email,
                password: pwd,
                callbackUrl: `${publicEnv.NEXT_PUBLIC_BASE_URL}`,
            });
    
            if (!res?.error) {
                router.push("/");
            } else {
                setErrorMsg(res.error || "Login failed");
            }
        }
    }

    return (
        <div className="auth">
            <div className="header">
                <div className="text">{action} for Wordle</div>
                <div className="underline"></div>
            </div>
            <div className="submit-container">
                <div className={action === "Login" ? "submit gray" : "submit"} onClick={() => setAction("Sign up")}>Sign up</div>
                <div className={action === "Sign up" ? "submit gray" : "submit"} onClick={() => setAction("Login")}>Login</div>
            </div>
            <p ref={errorRef} className={errorMsg ? "error" : "error hidden"} aria-live="assertive">{errorMsg}</p>
            <div className="inputs">
                {action === "Login" && (
                    <>
                        <div className="input">
                            <img src="/email.png" alt="email icon" />
                            <input 
                                type="email" 
                                placeholder="Email" 
                                onChange={(e) => setEmail(e.target.value)}
                                value={email}
                                required
                            />
                        </div>
                        <div className="input">
                            <img src="/password.png" alt="pwd icon" />
                            <input 
                                type="password" 
                                placeholder="Password" 
                                onChange={(e) => setPwd(e.target.value)}
                                value={pwd}
                                required
                            />
                        </div>
                    </>
                )}
                {action === "Sign up" && (
                    <>
                        <div className="input">
                            <img src="/email.png" alt="email icon" />
                            <input 
                                type="email" 
                                placeholder="Email" 
                                onChange={(e) => setEmail(e.target.value)}
                                value={email}
                                required
                            />
                        </div>
                        <div className="input">
                            <img src='/person.png' alt="user icon" />
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
                            <img src="/password.png" alt="pwd icon" />
                            <input 
                                type="password" 
                                placeholder="Password" 
                                onChange={(e) => setPwd(e.target.value)}
                                value={pwd}
                                required
                            />
                        </div>
                        <div className="input">
                            <img src="/password.png" alt="pwd icon" />
                            <input 
                                type="password" 
                                placeholder="Confirm Password" 
                                onChange={(e) => setConfirmPwd(e.target.value)}
                                value={confirmPwd}
                                required
                            />
                        </div>
                    </>
                )}
            </div>
            <br />
            <div className="submit-container">
                <button className="playgame" onClick={handleSubmit}>go!</button>
            </div>
        </div>
    );
    
    
}