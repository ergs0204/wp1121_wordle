
"use client"
import React, { createContext, useEffect, useState } from "react";
import io, {Socket} from "socket.io-client";


const SOCKET_URL = process.env.NEXT_PUBLIC_SOCKET_URL || "http://localhost:4000";
const SocketContext = createContext<Socket | null>(null);

export const SocketProvider = ({
    children,
  }: {
    children: React.ReactNode;
  }) => {
    const [socket, setSocket] = useState<Socket | null>(null);

    useEffect(() => {
        const socketIo = io(SOCKET_URL);
        setSocket(socketIo);
        return () => {
            socketIo.disconnect();
        };
    }, []);

    return (
        <SocketContext.Provider value={socket}>
            {children}
        </SocketContext.Provider>
    );
}

export default SocketContext;
