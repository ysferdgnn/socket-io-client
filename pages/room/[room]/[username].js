import React from 'react'
import { useRouter } from 'next/router';
import SocketIOComponent from '../../../components/socket-io-component';
import SocketIOUserComponent from '../../../components/socket-io-user-component';
function Room() {
    const router = useRouter();
    const { room, username } = router.query;
    console.log("username is "+JSON.stringify(router.query))
  return (
    <><div>
          <h1>{room}</h1>
      </div>
      <SocketIOComponent username={username} room={room}></SocketIOComponent>
      <SocketIOUserComponent username={username} room={room}></SocketIOUserComponent>
      </>
  )
}

export default Room