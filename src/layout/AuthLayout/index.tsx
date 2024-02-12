import { Box } from '@mui/material'
import { onAuthStateChanged } from 'firebase/auth'
import { doc, getDoc, getFirestore } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'

import { ContactProps } from '@/@types/common'
import CommunitySideMenu from '@/components/community/CommunitySideMenu'
import Navbar from '@/components/shared/Navbar'
import UserSideMenu from '@/components/user/UserSideMenu'
import { auth } from '@/firebase'
import { useMediaQuery } from '@/hooks/utils/useMediaQueries'

const AuthLayout: React.FC = () => {
  const [isLargeScreen] = useMediaQuery()
  const { pathname } = useLocation()
  const [contacts, setContacts] = useState<ContactProps[]>([])

  useEffect(() => {
    const db = getFirestore()

    const unsubscribe = onAuthStateChanged(auth, async user => {
      if (user) {
        // Correção: Acessar a coleção de contatos a partir do documento do usuário
        const userDocRef = doc(db, 'users', user.uid)
        const userDoc = await getDoc(userDocRef)
        if (userDoc.exists()) {
          const userData = userDoc.data()
          const contactsIds = userData.contacts // Assumindo que isso é um array de IDs
          const contactsData: ContactProps[] = []

          for (const contactId of contactsIds) {
            const contactRef = doc(db, 'users', contactId)
            const contactSnap = await getDoc(contactRef)
            if (contactSnap.exists()) {
              contactsData.push({
                id: contactSnap.id,
                name: contactSnap.data().name, // Ajuste conforme sua estrutura de dados
                avatar: contactSnap.data().avatar,
                status: contactSnap.data().status
                // Adicione outras propriedades conforme necessário
              })
            }
          }

          console.log('contactsData', contactsData)
          setContacts(contactsData)
        }
      } else {
        setContacts([])
      }
    })

    return () => unsubscribe()
  }, [])

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <Box
        sx={{
          display: 'flex',
          flexGrow: 1,
          overflow: 'auto',
          flexDirection: isLargeScreen ? 'row' : 'column'
        }}
      >
        {!isLargeScreen && <Navbar />}
        {isLargeScreen && (
          <Box sx={{ width: '12rem' }}>
            <CommunitySideMenu contacts={contacts} />
          </Box>
        )}
        <Box sx={{ flexGrow: 1, overflow: 'auto' }}>
          {isLargeScreen && pathname !== '/chat' && <Navbar />}
          <Outlet />
        </Box>
        {isLargeScreen && (
          <Box sx={{ width: '12rem' }}>
            <UserSideMenu />
          </Box>
        )}
      </Box>
    </Box>
  )
}

export default AuthLayout
