import React, { useState } from 'react';
// import io from 'socket.io-client';

const Matchingroom = () => {
  const [roomCode, setRoomCode] = useState('');
  const [socket, setSocket] = useState(null);

  const handleCreateRoom = () => {
    // const newSocket = io('http://localhost:5000'); 
    // newSocket.emit('create-room', roomCode);
    // setSocket(newSocket);
  };

  return (
    <div className='matching'>
      {!socket &&
        <div>
          <input
            type="text"
            className='input'
            placeholder="Room Code"
            value={roomCode}
            onChange={(e) => setRoomCode(e.target.value)}
          />
          <button className="submit" onClick={handleCreateRoom}>Create Room!</button>
          </div>
      }
    </div>
  );
};

export default Matchingroom;
