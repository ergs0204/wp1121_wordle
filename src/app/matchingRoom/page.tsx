"use client"
import React, { useState, useRef, useEffect, useContext } from "react";
import io, { Socket } from "socket.io-client";
import { useRouter } from 'next/navigation';
import SocketContext from "@/app/socket/SocketProvider";
// const SOCKET_URL = process.env.NEXT_PUBLIC_SOCKET_URL || "http://localhost:4000";
interface Player {
  id: string;
  ready: boolean;
}

const MatchingRoom = () => {
  const [roomCode, setRoomCode] = useState("");
  // const [socket, setSocket] = useState<Socket | null>(null);
  const [action, setAction] = useState("create");
  const [errorMsg, setErrorMsg] = useState("");
  const [playersInRoom, setPlayersInRoom] = useState<Player[]>([]);
  const [isInRoom, setIsInRoom] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const errorRef = useRef<HTMLParagraphElement>(null);
  const router = useRouter();
  const socket = useContext(SocketContext);
  useEffect(() => {
    setErrorMsg("");
  }, [roomCode]);

  // useEffect(() => {
  //   const newSocket = io(SOCKET_URL);
  //   setSocket(newSocket);

  //   return () => {
  //     newSocket.close();
  //   };
  // }, []);

  useEffect(() => {
    if (socket) {
      socket.on("room-created", (roomCode) => {
        setIsInRoom(true);
        console.log("Room created:", roomCode);
      });

      socket.on("room-exists", (roomCode) => {
        console.log("Room already exists:", roomCode);
        setErrorMsg("Room code already in use. Please try a different one.");
      });

      socket.on("update-players", (players) => {
        setPlayersInRoom(players);
        if (!isInRoom) setIsInRoom(true);
      });

      socket.on("room-full", () => {
        setErrorMsg("Room is full. Please try a different one.");
      });

      socket.on("start-game", () => {
        router.push(`/multiPlayer?roomCode=${roomCode}`);
        
      });
    }
  }, [socket, isInRoom]);

  useEffect(() => {
    return () => {
      if (socket) {
        socket.emit("leave-room", roomCode);
      }
    };
  }, []);

  const handleCreateRoom = () => {
    const newRoomCode = generateRoomCode();
    if (socket) {
      socket.emit("create-room", newRoomCode);
      setRoomCode(newRoomCode);
    } else {
      console.log("Socket not initialized");
    }
  };

  const handleJoinRoom = () => {
    if (roomCode === "") {
      setErrorMsg("Room code cannot be empty!");
      return;
    }
    if (roomCode.length !== 5) {
      setErrorMsg("Room code must be 5 characters!");
      return;
    }
    if (socket) {
      socket.emit("join-room", roomCode);
    } else {
      console.log("Socket not initialized");
    }
  };
  const generateRoomCode = () => {
    const length = 5;
    const characters = "0123456789";
    let result = "";
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
  };

  const handleStartGame = () => {
    if (!socket) {
      setErrorMsg("Socket not initialized");
      return;
    }
    if (!isReady) {
      socket.emit("player-ready", roomCode);
      setIsReady(true);
    } else {
      socket.emit("player-not-ready", roomCode);
      setIsReady(false);
    }
  };

  return (
    <div className="matching">
      <button className="back" onClick={() => router.push("/")}>
        Home
      </button>
      <h1 className="title">Matching Room</h1>
      {!isInRoom && (
        <>
          <div className="submit-container">
            <div
              className={action === "join" ? "submit gray" : "submit"}
              onClick={() => setAction("create")}
            >
              Create Room
            </div>
            <div
              className={action === "create" ? "submit gray" : "submit"}
              onClick={() => setAction("join")}
            >
              Join Room
            </div>
          </div>
          <div className="inputs">
            {action === "create" && (
              <div>
                <button className="create" onClick={handleCreateRoom}>
                  Create!
                </button>
              </div>
            )}
            {action === "join" && (
              <>
                <div className="input">
                  <input
                    type="text"
                    placeholder="Room Code"
                    onChange={(e) => setRoomCode(e.target.value)}
                    value={roomCode}
                    required
                  />
                  <button className="join" onClick={handleJoinRoom}>
                    Join!
                  </button>
                </div>
                <p ref={errorRef} className={errorMsg ? "error" : "error hidden"} aria-live="assertive">
                  {errorMsg}
                </p>
              </>
            )}
          </div>
        </>
      )}
      {isInRoom && (
        <div>
          <h2>Your room code is:</h2>
          <h2 className="room-code">{roomCode}</h2>
          <h2>Players in Room:</h2>
          <ul>
            {playersInRoom.map((player) => (
              <li key={player.id}>
                ID: {player.id}, Ready: {player.ready ? "Yes" : "No"}
              </li>
            ))}
          </ul>
          <button
            className={isReady ? "ready-button" : "start-button"}
            onClick={handleStartGame}
          >
            {isReady ? "等待對手" : "開始遊戲"}
          </button>
        </div>
      )}
    </div>
  );
};

export default MatchingRoom;
