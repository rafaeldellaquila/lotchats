// hooks/useContacts.ts
import { doc, getDoc, getFirestore } from 'firebase/firestore'
import { useState, useEffect } from 'react'

import { ContactProps } from '@/@types/common'
import { auth } from '@/firebase'

export const useContacts = () => {
  const [contacts, setContacts] = useState<ContactProps[]>([])

  useEffect(() => {
    const fetchContacts = async () => {
      const db = getFirestore()
      const user = auth.currentUser

      if (user) {
        const userDocRef = doc(db, 'users', user.uid)
        const userDocSnap = await getDoc(userDocRef)
        if (userDocSnap.exists()) {
          const userData = userDocSnap.data()
          const contactsIds = userData.contacts || []
          const contactsPromises = contactsIds.map(
            async (contactId: string) => {
              const contactRef = doc(db, 'users', contactId)
              const contactSnap = await getDoc(contactRef)
              return contactSnap.exists()
                ? {
                    id: contactSnap.id,
                    name: contactSnap.data().name,
                    avatarUrl: contactSnap.data().avatarUrl
                  }
                : null
            }
          )
          const contactsData = (await Promise.all(contactsPromises)).filter(
            Boolean
          ) as ContactProps[]
          setContacts(contactsData)
        }
      }
    }

    fetchContacts()
  }, [])

  return contacts
}
