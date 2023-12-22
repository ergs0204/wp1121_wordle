import React, { useState } from 'react';
import io from 'socket.io-client';

const Matchingroom = () => {
  const [roomCode, setRoomCode] = useState('');
  const [socket, setSocket] = useState(null);

  const handleCreateRoom = () => {
    const newSocket = io('http://localhost:5000'); // 服务器地址
    newSocket.emit('create-room', roomCode);
    setSocket(newSocket);
  };

  return (
    <div>
      {socket ? (
      ) : (
        <div>
          <input
            type="text"
            placeholder="输入房间代码"
            value={roomCode}
            onChange={(e) => setRoomCode(e.target.value)}
          />
          <button onClick={handleCreateRoom}>创建房间</button>
        </div>
      )}
    </div>
  );
};

export default Matchingroom;
