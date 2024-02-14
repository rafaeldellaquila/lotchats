import {
  addDoc,
  arrayUnion,
  collection,
  doc,
  getDoc,
  getFirestore,
  serverTimestamp,
  updateDoc
} from 'firebase/firestore'
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage'

import { auth } from '@/firebase'

export const useCreateGroup = () => {
  const createGroup = async (
    groupName: string,
    groupDescription: string,
    avatar: File | null
  ) => {
    const currentUserUid = auth.currentUser?.uid
    if (!currentUserUid) throw new Error('User not found')

    const db = getFirestore()
    const userDocRef = doc(db, 'users', currentUserUid)
    const userDocSnap = await getDoc(userDocRef)

    let avatarUrl = ''

    if (avatar) {
      const storageRef = ref(
        getStorage(),
        `group_avatars/${avatar.name}_${Date.now()}`
      )
      await uploadBytes(storageRef, avatar)
      avatarUrl = await getDownloadURL(storageRef)
    }

    if (!userDocSnap.exists())
      throw new Error('Creator user document not found')

    const groupDocRef = await addDoc(collection(db, 'groups'), {
      name: groupName,
      description: groupDescription,
      avatarUrl,
      createdAt: serverTimestamp(),
      members: [
        {
          id: currentUserUid,
          isAdmin: true,
          avatarUrl: userDocSnap.data().avatarUrl,
          name: userDocSnap.data().name
        }
      ]
    })

    await updateDoc(userDocRef, { groups: arrayUnion(groupDocRef.id) })

    return groupDocRef.id
  }

  return { createGroup }
}
