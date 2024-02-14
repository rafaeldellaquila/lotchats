import { doc, getDoc, getFirestore } from 'firebase/firestore'
import { useState, useEffect } from 'react'

import { UserProps } from '@/@types/common'
import { auth } from '@/firebase'

export const useReceiverInfo = (chatId: string) => {
  const [receiverContact, setReceiverContact] = useState<
    Pick<UserProps, 'name' | 'avatarUrl'>
  >({
    name: '',
    avatarUrl: ''
  })

  useEffect(() => {
    if (!chatId) return

    const db = getFirestore()
    const chatRef = doc(db, 'chats', chatId)

    getDoc(chatRef).then(docSnap => {
      if (!docSnap.exists()) return

      const members = docSnap.data().members || []
      const receiverId = members.find(
        (id: string) => id !== auth.currentUser?.uid
      )

      if (receiverId) {
        const receiverRef = doc(db, 'users', receiverId)
        getDoc(receiverRef).then(userSnap => {
          if (userSnap.exists()) {
            setReceiverContact({
              name: userSnap.data().name,
              avatarUrl: userSnap.data().avatarUrl
            })
          }
        })
      }
    })
  }, [chatId])

  return receiverContact
}
