import React, { createContext, useEffect, useState } from 'react'
import { useAuthContext } from './AuthContext'
import { io } from 'socket.io-client'

const SocketContext = createContext()

export const SocketContextProvider = ({children}) => {
    const [socket, setSocket] = useState(null)
    const [onlineUsers, setOnlineUsers] = useState([])
    const {authUser} = useAuthContext()

    useEffect( () => {
        if(authUser) {
            const socket = io("http://localhost:3000")
            setSocket(socket)
            return () => socket.close()
        } else {
            socket.close()
            setSocket(null)
        }
    }, [authUser]) 
    return <SocketContext.Provider value={{socket, onlineUsers}}>
        {children}
    </SocketContext.Provider>
}

export default SocketContext
