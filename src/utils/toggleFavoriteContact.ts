import {
  doc,
  getDoc,
  getFirestore,
  updateDoc,
  arrayUnion,
  arrayRemove
} from 'firebase/firestore'

import { auth } from '@/firebase'

export const toggleFavoriteContact = async (contactId: string) => {
  const db = getFirestore()
  const userId = auth.currentUser?.uid

  if (!userId) return

  const userDocRef = doc(db, 'users', userId)
  const userDoc = await getDoc(userDocRef)

  if (userDoc.exists()) {
    const userData = userDoc.data()
    const isFavorite = userData.favorites?.includes(contactId)

    if (isFavorite) {
      await updateDoc(userDocRef, {
        favorites: arrayRemove(contactId)
      })
    } else {
      await updateDoc(userDocRef, {
        favorites: arrayUnion(contactId)
      })
    }
  }
}
