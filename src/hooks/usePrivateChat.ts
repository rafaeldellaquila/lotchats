import {
  doc,
  getDoc,
  getFirestore,
  serverTimestamp,
  setDoc
} from 'firebase/firestore'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

import { auth } from '@/firebase'

export const usePrivateChat = () => {
  const navigate = useNavigate()
  const { t } = useTranslation()

  const handleContactChatClick = async (contactOrChatId: string) => {
    const db = getFirestore()
    const currentUser = auth.currentUser

    if (currentUser) {
      if (contactOrChatId.includes('_')) {
        navigate(`/privatechat/${contactOrChatId}`)
      } else {
        const userIds = [currentUser.uid, contactOrChatId].sort()
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
          console.log('Chat created or already exists', chatId)
          navigate(`/privatechat/${chatId}`)
        } catch (error) {
          console.error(t('failed_to_get_chat'), error)
        }
      }
    }
  }

  return { handleContactChatClick }
}
