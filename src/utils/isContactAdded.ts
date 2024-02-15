import { doc, getDoc, getFirestore } from 'firebase/firestore'

import { auth } from '@/firebase'

/**
 * Verifica se um determinado contato já foi adicionado pelo usuário atual.
 * @param {string} id O ID do contato a ser verificado.
 * @returns {Promise<boolean>} Promessa que resolve com `true` se o contato foi adicionado, caso contrário `false`.
 */

export const isContactAdded = async (id: string): Promise<boolean> => {
  const user = auth.currentUser
  const db = getFirestore()

  if (!user) return false

  try {
    const userDocRef = doc(db, 'users', user.uid)
    const userDoc = await getDoc(userDocRef)

    if (!userDoc.exists()) {
      console.error('Documento do usuário não encontrado.')
      return false
    }

    const userData = userDoc.data()
    return userData.contacts && userData.contacts.includes(id)
  } catch (error) {
    console.error('Erro ao verificar contato adicionado:', error)
    return false
  }
}
