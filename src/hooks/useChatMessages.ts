import {
  collection,
  getFirestore,
  onSnapshot,
  orderBy,
  query
} from 'firebase/firestore'
import { useState, useEffect } from 'react'

import { MessageProps } from '@/@types/common'

export const useChatMessages = (chatId: string) => {
  const [messages, setMessages] = useState<MessageProps[]>([])

  useEffect(() => {
    if (!chatId) return undefined

    const db = getFirestore()
    const messagesRef = collection(db, `chats/${chatId}/messages`)
    const q = query(messagesRef, orderBy('timestamp', 'asc'))

    const unsubscribe = onSnapshot(q, querySnapshot => {
      const fetchedMessages = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as MessageProps[]
      setMessages(fetchedMessages)
    })

    return () => unsubscribe()
  }, [chatId])

  return messages
}
