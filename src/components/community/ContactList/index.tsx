import {
  Typography,
  Avatar,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Badge
} from '@mui/material'
import {
  doc,
  getDoc,
  getFirestore,
  serverTimestamp,
  setDoc
} from 'firebase/firestore'
import { useTranslation } from 'react-i18next'

import { ContactProps } from '@/@types/common'
import { auth } from '@/firebase'
import { useNavigation } from '@/hooks/utils/useNavigation'

const ContactList: React.FC<{ contacts: ContactProps[] }> = ({ contacts }) => {
  const { t } = useTranslation()
  const { handleNavigate } = useNavigation()

  const handleChatClick = async (contactId: string) => {
    const db = getFirestore()
    const currentUser = auth.currentUser

    if (currentUser) {
      const userIds = [currentUser.uid, contactId].sort()
      const chatId = userIds.join('_')
      const chatDocRef = doc(db, 'chats', chatId)
      const chatDocSnap = await getDoc(chatDocRef)

      if (!chatDocSnap.exists()) {
        await setDoc(chatDocRef, {
          members: userIds,
          createdAt: serverTimestamp()
        })
      }

      handleNavigate(`/chat/${chatId}`)
    }
  }

  return (
    <List>
      <Typography variant='h1' sx={{ p: 2 }} color='common.black'>
        {t('contacts')}
      </Typography>
      {contacts !== undefined &&
        contacts.map((contact, index) => (
          <ListItem
            key={index}
            onClick={() => handleChatClick(contact.id)}
            sx={{ cursor: 'pointer' }}
          >
            <ListItemIcon>
              <Badge color='error' overlap='circular' variant='dot'>
                <Avatar
                  src={contact.avatarUrl}
                  sx={{ width: 24, height: 24 }}
                />
              </Badge>
            </ListItemIcon>
            <ListItemText primary={contact.name} />
          </ListItem>
        ))}
    </List>
  )
}

export default ContactList
