import {useEffect, useState} from 'react';
import io from 'socket.io-client';

const SocketIOComponent = ({ room, username }) => {
    const [message, setMessage] = useState('');
    const [receivedMessages, setReceivedMessages] = useState([]);
    const hostAdress = 'ws://localhost:8081';
    const [socket, setSocket] = useState(null);

    useEffect(() => {

        let socket = io.connect(hostAdress + `?room=${room}&username=${username}`, {
            'transports': ['websocket', 'polling']
        }); // Replace with your server URL
        setSocket(socket);

        socket.on('connect', () => {
            console.log('Connected to WebSocket server');
        });

        socket.on('chat', (data) => {

            console.log('Received message:', data);
            setReceivedMessages((prevMessages) => [
                ...prevMessages,
                data
            ]);
        });

        socket.on('disconnect', () => {
            console.log('Disconnected from WebSocket server');
        });


        return() => {
            socket.disconnect();
        };
    }, []);

    const sendMessage = () => {
        const messageData = {
            "username": username,
            "message": message
        }
        console.log("Send message: " + messageData);

        socket.emit('chat', messageData);
        setMessage('');
    };

    return <div>
        <h1>Socket.io Client in Next.js</h1>
        <div>
       
            <input type="text" placeholder="Enter your message"
                value={message}
                onChange={
                    (e) => setMessage(e.target.value)
                }/>
            <button onClick={sendMessage}>Send</button>
        </div>
        <p>Received Messages</p>
        <div>
            <ul> {
                receivedMessages.map((receivedMessage, index) => (
                    <div key={index}>
                      <hr></hr>
                      <span>Username: </span>
                      <span>{receivedMessage.username + " "}</span>
                      
                      <span>Message: </span>
                      <span>{receivedMessage.message}</span>
                    </div>
                ))
            } </ul>
        </div>
    </div>
};

export default SocketIOComponent;
