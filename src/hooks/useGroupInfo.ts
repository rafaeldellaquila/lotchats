import { doc, getDoc, getFirestore } from 'firebase/firestore'
import { useTranslation } from 'react-i18next'

import { GroupProps } from '@/@types/common'

export const useGroupInfo = () => {
  const { t } = useTranslation()
  const fetchGroupInfo = async (groupId: string) => {
    if (!groupId) {
      console.log('No groupId provided')
      return
    }

    try {
      const db = getFirestore()
      const groupRef = doc(db, 'groups', groupId)
      const docSnap = await getDoc(groupRef)

      if (docSnap.exists()) {
        return docSnap.data() as Pick<
          GroupProps,
          'name' | 'avatarUrl' | 'members'
        >
      } else {
        console.error(t('no_group_found'), groupId)
      }
    } catch (error) {
      console.error(t('error_fetching_group'), error)
    }
  }

  return { fetchGroupInfo }
}
