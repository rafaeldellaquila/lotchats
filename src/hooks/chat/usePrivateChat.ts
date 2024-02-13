import {
  doc,
  getDoc,
  getFirestore,
  serverTimestamp,
  setDoc
} from 'firebase/firestore'
import { useNavigate } from 'react-router-dom'

import { auth } from '@/firebase'

export const usePrivateChat = () => {
  const navigate = useNavigate()

  const handleContactChatClick = async (contactId: string) => {
    const db = getFirestore()
    const currentUser = auth.currentUser

    if (currentUser) {
      const userIds = [currentUser.uid, contactId].sort()
      const chatId = userIds.join('_')
      const chatDocRef = doc(db, 'chats', chatId)

      try {
        const chatDocSnap = await getDoc(chatDocRef)

        if (!chatDocSnap.exists()) {
          await setDoc(chatDocRef, {
            members: userIds,
            createdAt: serverTimestamp()
          })
        }

        navigate(`/privatechat/${chatId}`)
      } catch (error) {
        console.error('Failed to create or access the chat:', error)
      }
    }
  }

  return { handleContactChatClick }
}
