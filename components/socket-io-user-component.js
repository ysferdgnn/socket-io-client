import {useEffect, useState} from 'react';
import io from 'socket.io-client';
import { useRouter } from 'next/router';
const SocketIOUserComponent = () => {
    const router = useRouter();
    const [users, setUsers] = useState([]);
    const hostAdress = 'ws://localhost:8081';
    const [socket, setSocket] = useState(null);
   

    useEffect(() => {

        const { room, username } = router.query;
        let socket = io.connect(hostAdress + `?room=${room}&username=${username}`, {
            'transports': ['websocket', 'polling']
        }); 
        setSocket(socket);

        socket.on('connect', () => {
            console.log('Connected to user WebSocket server');
        });

        socket.on('user', (data) => {

            console.log('Received message:', data);
            setUsers(data);
        });

        socket.on('disconnect', () => {
            console.log('Disconnected from WebSocket server');
        });


        return() => {
            socket.disconnect();
        };
    }, []);



    return <div>
        
        
        <p>Users</p>
        <div>
            <ul> {
                users.map((user, index) => (
                    <li key={index}>
                        <div>{user}</div>
                    </li>
                ))
            } </ul>
        </div>
    </div>
};

export default SocketIOUserComponent;
