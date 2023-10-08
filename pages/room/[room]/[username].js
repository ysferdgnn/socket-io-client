import React from 'react'
import { useRouter } from 'next/router';
import SocketIOComponent from '../../../components/socket-io-component';
import SocketIOUserComponent from '../../../components/socket-io-user-component';
import styles from './Room.module.css'
function Room() {
    const router = useRouter();
    const { room, username } = router.query;
    console.log("username is "+JSON.stringify(router.query))
  return (
    <><div >
          <h1 className={styles.roomHeader}>{room}</h1>
      </div>
      <div className={styles.roomWrapper}>
      <SocketIOComponent ></SocketIOComponent>
      <SocketIOUserComponent ></SocketIOUserComponent>
      </div>
      </>
  )
}

export default Room