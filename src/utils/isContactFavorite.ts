import { doc, getDoc, getFirestore } from 'firebase/firestore'

import { auth } from '@/firebase'

/**
 * Verifica se um determinado contato já foi adicionado pelo usuário atual.
 * @param {string} id O ID do contato a ser verificado.
 * @returns {Promise<boolean>} Promessa que resolve com `true` se o contato foi adicionado, caso contrário `false`.
 */

export const isContactFavorite = async (
  contactId: string
): Promise<boolean> => {
  const db = getFirestore()
  const userId = auth.currentUser?.uid

  if (!userId) {
    return false
  }

  const userDocRef = doc(db, 'users', userId)
  const userDoc = await getDoc(userDocRef)
  if (!userDoc.exists()) {
    console.log('Documento do usuário não encontrado.')
    return false
  }

  const userData = userDoc.data()
  return userData.favorites?.includes(contactId) ?? false
}
