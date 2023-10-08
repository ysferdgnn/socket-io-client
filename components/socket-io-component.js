import {useEffect, useState} from 'react';
import io from 'socket.io-client';
import styles from './socket-component.module.css'
import { useRouter } from 'next/router';
const SocketIOComponent = () => {
    const router = useRouter();
    const [message, setMessage] = useState('');
    const [receivedMessages, setReceivedMessages] = useState([]);
    const hostAdress = 'ws://localhost:8081';
    const [socket, setSocket] = useState(null);

    const { room, username } = router.query;
    useEffect(() => {

        const { room, username } = router.query;
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
        <h1></h1>
        <div>
       
            <input type="text" className={styles.input} placeholder="Enter your message"
                value={message}
                onChange={
                    (e) => setMessage(e.target.value)
                }/>
            <button className={styles.button} onClick={sendMessage}>Send</button>
        </div>
        <h2>Message List</h2>
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
