import {
  doc,
  getDoc,
  getFirestore,
  serverTimestamp,
  setDoc
} from 'firebase/firestore'
import { useNavigate } from 'react-router-dom'

import { auth } from '@/firebase'

export const UsePrivateChat = () => {
  const navigate = useNavigate()

  const handleContactChatClick = async (contactId: string) => {
    const db = getFirestore()
    const currentUser = auth.currentUser

    if (currentUser) {
      const userIds = [currentUser.uid, contactId].sort()
      const chatId = userIds.join('_')
      const chatDocRef = doc(db, 'chats', chatId)
      const chatDocSnap = await getDoc(chatDocRef)

      if (!chatDocSnap.exists()) {
        await setDoc(chatDocRef, {
          members: userIds,
          createdAt: serverTimestamp()
        })
      }

      navigate(`/privatechat/${chatId}`)
    }
  }

  return { handleContactChatClick }
}
