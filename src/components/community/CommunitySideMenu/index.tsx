import {
  Home as HomeIcon,
  Language as LanguageIcon,
  GroupAdd as GroupAddIcon
} from '@mui/icons-material'
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Paper
} from '@mui/material'
import { onAuthStateChanged } from 'firebase/auth'
import { doc, getDoc, getFirestore } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

import ContactList from '../ContactList'

import { ContactProps } from '@/@types/common'
import { primaryTypographyStyles } from '@/components/shared/Navbar/styles'
import { auth } from '@/firebase'
import { useModal } from '@/hooks/utils/useModal'

const CommunitySideMenu: React.FC = () => {
  const navigate = useNavigate()
  const { t } = useTranslation()
  const { toggleCreateGroupModal } = useModal()
  const [contacts, setContacts] = useState<ContactProps[]>([])
  const menuItems = [
    { icon: <HomeIcon />, text: 'home', onClick: navigate('/home') },
    {
      icon: <LanguageIcon />,
      text: 'discover',
      onClick: navigate('/discover')
    },
    {
      icon: <GroupAddIcon />,
      text: 'create_group',
      onClick: toggleCreateGroupModal()
    }
  ]

  useEffect(() => {
    const db = getFirestore()

    const unsubscribe = onAuthStateChanged(auth, async user => {
      if (user) {
        const userDocRef = doc(db, 'users', user.uid)
        const userDocSnap = await getDoc(userDocRef)
        if (userDocSnap.exists()) {
          const userData = userDocSnap.data()
          const contactsIds = userData.contacts || []
          const contactsData: ContactProps[] = []

          for (const contactId of contactsIds) {
            const contactRef = doc(db, 'users', contactId)
            const contactSnap = await getDoc(contactRef)
            if (contactSnap.exists()) {
              contactsData.push({
                id: contactSnap.id,
                name: contactSnap.data().name,
                avatarUrl: contactSnap.data().avatarUrl
              })
            }
          }
          setContacts(contactsData)
        }
      } else {
        setContacts([])
      }
    })

    return () => {
      unsubscribe()
    }
  }, [])

  return (
    <Paper elevation={1} sx={{ height: '100%' }}>
      <List>
        {menuItems.map((item, index) => (
          <ListItem
            key={index}
            onClick={() => item.onClick}
            sx={{ cursor: 'pointer' }}
          >
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText
              primary={t(item.text)}
              primaryTypographyProps={primaryTypographyStyles()}
            />
          </ListItem>
        ))}
      </List>
      <Divider sx={{ m: '.5rem', borderColor: 'transparent' }} />
      <ContactList contacts={contacts} />
    </Paper>
  )
}

export default CommunitySideMenu
