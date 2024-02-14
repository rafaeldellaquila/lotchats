// src/hooks/useUserName.ts
import { doc, getDoc, getFirestore } from 'firebase/firestore'
import { useState, useEffect } from 'react'

import { auth } from '@/firebase'

export const useUserName = () => {
  const [userName, setUserName] = useState('')

  useEffect(() => {
    const fetchUserName = async () => {
      const userAuth = auth.currentUser
      if (userAuth) {
        const db = getFirestore()
        const userRef = doc(db, 'users', userAuth.uid)
        const docSnap = await getDoc(userRef)
        if (docSnap.exists()) {
          setUserName(docSnap.data().name)
        }
      }
    }

    fetchUserName()
  }, [])

  return userName
}
