import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'

const useGetConversation = () => {
    const [loading, setLoading] = useState(false)
    const [conversations, setConversations] = useState([])
    // const [conversations, setConversations] = useState<Conversation[]>([])

    useEffect( () => {
        const getConversations = async () => {
            try {
                setLoading(true)
                const res = await fetch("http://localhost:5173/api/users")
                // const res = await fetch("/api/users")

                const data = await res.json()
                if(data.error) {
                    throw new Error(data.error)
                }
                setConversations(data)
            } catch (error) {
                toast.error(error.message)
            } finally {
                setLoading(false)
            }
        }
        getConversations()
    }, [])
    return { loading, conversations }
}

export default useGetConversation
