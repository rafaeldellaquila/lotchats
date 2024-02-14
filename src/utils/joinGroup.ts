import {
  DocumentData,
  DocumentSnapshot,
  arrayUnion,
  doc,
  getFirestore,
  updateDoc
} from 'firebase/firestore'

export const joinGroup = async (
  groupId: string,
  currentUserUid: string,
  userSnap: DocumentSnapshot<DocumentData>
) => {
  const db = getFirestore()
  const groupRef = doc(db, 'groups', groupId)

  if (userSnap.exists()) {
    const userData = userSnap.data()

    await updateDoc(groupRef, {
      members: arrayUnion({
        id: currentUserUid,
        avatarUrl: userData.avatarUrl || '',
        isAdmin: false,
        name: userData.name || currentUserUid
      })
    })

    const userRef = doc(db, 'users', currentUserUid)
    await updateDoc(userRef, {
      groups: arrayUnion(groupId)
    })
  } else {
    console.error("User document doesn't exist.")
  }
}
