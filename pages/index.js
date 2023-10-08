import React, { useState } from 'react'
import SocketIOComponent from '../components/socket-io-component'
import SocketIOUserComponent from '../components/socket-io-user-component'
import Link from 'next/link';
function Home() {

  const [username,setUsername] =useState('');


    return (
        <>
            <div>HOME</div>
            <div>
            <input type="text" placeholder="Enter your Middle Earth Name"
                value={username}
                onChange={
                    (e) => setUsername(e.target.value)
                }/>
            </div>
            <div className='rooms'>
              <div>
                <h1>ROOMS</h1>
              </div>
              <ul>
                <li><Link href="/room/[room]/[username]" as={`/room/MORDOR/${username}`}>MORDOR</Link></li>
                <li><Link href="/room/[room]/[username]" as={`/room/SHIRE/${username}`}>SHIRE</Link></li>
                <li><Link href="/room/[room]/[username]" as={`/room/ISENGARD/${username}`}>ISENGARD</Link></li>
                <li><Link href="/room/[room]/[username]" as={`/room/RIVENDELL/${username}`}>RIVENDELL</Link></li>

                
              </ul>
            </div>
           
        </>
    )
}

export default Home
