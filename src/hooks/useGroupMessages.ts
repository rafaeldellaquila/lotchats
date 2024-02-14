import {
  collection,
  query,
  orderBy,
  onSnapshot,
  getFirestore
} from 'firebase/firestore'

import { MessageProps } from '@/@types/common'

export const fetchGroupMessages = (
  groupId: string,
  setMessages: (messages: MessageProps[]) => void
) => {
  if (!groupId) {
    setMessages([])
    return () => {}
  }

  const db = getFirestore()
  const messagesRef = collection(db, `groups/${groupId}/messages`)
  const messagesQuery = query(messagesRef, orderBy('timestamp', 'asc'))

  return onSnapshot(messagesQuery, querySnapshot => {
    const fetchedMessages = querySnapshot.docs.map(doc => ({
      ...(doc.data() as MessageProps),
      id: doc.id
    }))
    setMessages(fetchedMessages)
  })
}
