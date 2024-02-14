import { CircularProgress } from '@mui/material'
import { signOut } from 'firebase/auth'
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
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { PreviewChatProps } from '@/@types/common'
import ChatCardList from '@/components/chat/shared/ChatCardList'
import { auth } from '@/firebase'
import { setLoading, setUser } from '@/redux/slices/authSlice'

const HomePage: React.FC = () => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [chats, setChats] = useState<PreviewChatProps[]>([])
  const [groups, setGroups] = useState<PreviewChatProps[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)

  useEffect(() => {
    const db = getFirestore()
    const userId = auth.currentUser?.uid

    const handleLogout = async () => {
      try {
        await signOut(auth)
        dispatch(setUser(null))
        dispatch(setLoading(false))
        navigate('/')
      } catch (error) {
        console.error('Falha ao realizar logout', error)
        // Tratar o erro
      }
    }

    if (!userId) {
      console.log(`caiu aqui`)
      setIsLoading(false)
      handleLogout()
      return
    }

    const fetchChats = async (): Promise<void> => {
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

    const fetchGroups = async () => {
      const groupsRef = collection(db, 'groups')
      const querySnapshot = await getDocs(groupsRef)
      const groupsData = [] // Inicializa um array para armazenar os dados dos grupos

      for (const doc of querySnapshot.docs) {
        const groupId = doc.id
        const groupData = doc.data()
        const isMember = groupData.members.some(
          (member: { id: string }) => member.id === userId
        )

        if (isMember) {
          const messagesRef = collection(db, `groups/${groupId}/messages`)
          const messagesQuery = query(
            messagesRef,
            orderBy('timestamp', 'desc'),
            limit(1)
          )
          const messagesSnapshot = await getDocs(messagesQuery)
          let messagePreview = ''

          if (!messagesSnapshot.empty) {
            const lastMessageData = messagesSnapshot.docs[0].data()
            messagePreview = lastMessageData.text
          }

          groupsData.push({
            id: groupId,
            avatarUrl: groupData.avatarUrl,
            description: groupData.description,
            name: groupData.name,
            messagePreview,
            members: groupData.members,
            isGroup: true
          })
        }
      }

      setGroups(groupsData)
    }

    const fetchChatsAndGroups = async () => {
      await Promise.all([fetchChats(), fetchGroups()])
      setIsLoading(false)
    }

    fetchChatsAndGroups()
  }, [dispatch, navigate])

  if (isLoading) {
    return <CircularProgress />
  }

  return (
    <>
      {/* <FavoriteList FavoriteProps={mockFavoriteProps} maxVisible={10} /> */}
      <ChatCardList title={t('private_chats')} chats={chats} />
      <ChatCardList title={t('group_chats')} chats={groups} />
    </>
  )
}

export default HomePage
