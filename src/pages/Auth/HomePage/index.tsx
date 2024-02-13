import { CircularProgress } from '@mui/material'
import {
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  limit,
  orderBy,
  query,
  where
} from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { PreviewChatProps } from '@/@types/common'
import ChatCardList from '@/components/chat/shared/ChatCardList'
import { auth } from '@/firebase'

const HomePage: React.FC = () => {
  const { t } = useTranslation()
  const [chats, setChats] = useState<PreviewChatProps[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)

  useEffect(() => {
    setIsLoading(true)

    const fetchChats = async () => {
      const db = getFirestore()
      const userId = auth.currentUser?.uid
      if (!userId) return

      const chatsRef = collection(db, 'chats')
      const q = query(chatsRef, where('members', 'array-contains', userId))
      const querySnapshot = await getDocs(q)
      const chatsData = await Promise.all(
        querySnapshot.docs.map(async chatDoc => {
          const chatId = chatDoc.id
          const messagesRef = collection(db, `chats/${chatId}/messages`)
          const messagesQuery = query(
            messagesRef,
            orderBy('timestamp', 'desc'),
            limit(1)
          )
          const messagesSnapshot = await getDocs(messagesQuery)

          if (!messagesSnapshot.empty) {
            const lastMessage = messagesSnapshot.docs[0].data()
            const otherMemberId = chatDoc
              .data()
              .members.find((id: string) => id !== userId)
            const userDocRef = doc(db, 'users', otherMemberId)
            const userDoc = await getDoc(userDocRef)
            const userData = userDoc.data()

            return {
              id: chatId,
              avatarUrl: userData?.avatarUrl,
              name: userData?.name,
              messagePreview: lastMessage.text
            }
          }
          return null
        })
      )

      setChats(
        chatsData.filter((chat): chat is PreviewChatProps => chat !== null)
      )
      setIsLoading(false)
    }

    fetchChats()
  }, [])

  if (isLoading) {
    return <CircularProgress />
  }

  return (
    <>
      {/* <FavoriteList FavoriteProps={mockFavoriteProps} maxVisible={10} /> */}
      <ChatCardList title={t('private_chats')} chats={chats} />
    </>
  )
}

export default HomePage
