import React, { useState, useRef, useEffect } from 'react';
// import io from 'socket.io-client';

const Matchingroom = () => {
    const [roomCode, setRoomCode] = useState('');
    const [socket, setSocket] = useState(null);
    const [action, setAction] = useState('create');
    const [errorMsg, setErrorMsg] = useState("");
    const errorRef = useRef();

    useEffect(() => {
        setErrorMsg("");
    }, [roomCode]);

    const handleCreateRoom = () => {
        // const newSocket = io('http://localhost:5000'); 
        // newSocket.emit('create-room', roomCode);
        // setSocket(newSocket);
    };

    const handleJoinRoom = () => {
        // const newSocket = io('http://localhost:5000');
        // newSocket.emit('join-room', roomCode);
        // setSocket(newSocket);
        if (roomCode === "") {
            setErrorMsg("Room code cannot be empty!");
            return;
        };
        if (roomCode.length !== 5) {
            setErrorMsg("Room code must be 5 characters!");
            return;
        };
    }

    return (
    <div className='matching'>
        <button className="back" onClick={() => window.location.href="/"}>Home</button>
        <h1 className="title">Matching Room</h1>
        <div className="submit-container">
                <div className={action==="join"?"submit gray":"submit"} onClick={()=>{setAction("create")}}>Create Room</div>
                <div className={action==="create"?"submit gray":"submit"} onClick={()=>{setAction("join")}}>Join Room</div>
        </div>
            <div className="inputs">
                {action === "create" &&
                    <div>
                        <button className='create' onClick={handleCreateRoom}>Create!<span></span><span></span><span></span><span></span></button>
                        <h2>Your room code is:</h2>
                        <h2 className="room-code">{roomCode}22222</h2>
                    </div>
                }
                {action==="join" && (<>
                <div className="input">
                    <div>
                        <input 
                            type="text" 
                            placeholder="Room Code" 
                            onChange={(e) => setRoomCode(e.target.value)} 
                            value={roomCode}
                            required 
                        />
                    </div>
                    <button className='join' onClick={handleJoinRoom}>Join!<span></span><span></span><span></span><span></span></button>
                </div>
                <p ref={errorRef} className={errorMsg?"error":"error hidden"} aria-live="assertive">{errorMsg}</p>
                </>)}
            </div>
    </div>
    );
};

export default Matchingroom;
