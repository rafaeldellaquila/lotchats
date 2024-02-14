import {
  collection,
  getDocs,
  getFirestore,
  Query,
  query as firestoreQuery,
  where,
  DocumentData
} from 'firebase/firestore'

import { UserProps, GroupProps } from '@/@types/common'

export const useFirestoreQuery = () => {
  const db = getFirestore()

  // Método para realizar a busca
  const fetchQueryResults = async (searchTerm: string) => {
    if (!searchTerm.trim()) return { users: [], groups: [] }

    const usersQuery: Query<DocumentData> = searchTerm.includes('@')
      ? firestoreQuery(
          collection(db, 'users'),
          where('email', '==', searchTerm.toLowerCase())
        )
      : firestoreQuery(
          collection(db, 'users'),
          where('name', '>=', searchTerm),
          where('name', '<=', searchTerm + '\uf8ff')
        )

    const groupsQuery = firestoreQuery(
      collection(db, 'groups'),
      where('name', '>=', searchTerm),
      where('name', '<=', searchTerm + '\uf8ff')
    )

    const [usersDocs, groupsDocs] = await Promise.all([
      getDocs(usersQuery),
      getDocs(groupsQuery)
    ])

    const users = usersDocs.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as UserProps[]
    const groups = groupsDocs.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as GroupProps[]

    return { users, groups }
  }

  return { fetchQueryResults }
}
