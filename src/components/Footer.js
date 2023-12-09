import React from "react";
import { AiFillGithub } from "react-icons/ai";

const Footer = () => {
    return (
        <footer>
            <div className="container">
                <div className="credits">
                    <p>
                        Developed by <a href="/">Wordle team</a>
                    </p>
                    <a
                        href="https://github.com/ergs0204/wp1121_wordle"
                        target="_blank"
                        rel="noreferrer"
                    >
                        <div className="github">
                            <AiFillGithub size="20px" className="icon" /> Github
                        </div>
                    </a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
