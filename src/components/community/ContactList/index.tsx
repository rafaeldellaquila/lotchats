import {
  Typography,
  Avatar,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Badge
} from '@mui/material'
import { useTranslation } from 'react-i18next'

import { ContactProps } from '@/@types/common'
import { useNavigation } from '@/hooks/utils/useNavigation'

const ContactList: React.FC<{ contacts: ContactProps[] }> = ({ contacts }) => {
  const { t } = useTranslation()
  const { handleNavigate } = useNavigation()

  const handleChatClick = async (contactId: string) => {
    handleNavigate(`/chat/${contactId}`)
  }

  console.log('contacts', contacts)

  return (
    <List>
      <Typography variant='h1' sx={{ p: 2 }} color='common.black'>
        {t('contacts')}
      </Typography>
      {contacts !== undefined &&
        contacts.map((contact, index) => (
          <ListItem
            key={index}
            onClick={() => handleChatClick(contact.id)} // Direcionar para o chat
            sx={{ cursor: 'pointer' }}
          >
            <ListItemIcon>
              <Badge color='error' overlap='circular' variant='dot'>
                <Avatar src={contact.avatar} sx={{ width: 24, height: 24 }} />
              </Badge>
            </ListItemIcon>
            <ListItemText primary={contact.name} />
          </ListItem>
        ))}
    </List>
  )
}

export default ContactList
