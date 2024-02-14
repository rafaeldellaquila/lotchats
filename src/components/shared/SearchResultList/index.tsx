import { Box, List, ListItem, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'

import GroupChatCard from '@/components/chat/group/GroupChatCard'
import PrivateChatCard from '@/components/chat/private/PrivateChatCard'
import { selectSearchResults } from '@/redux/slices/searchSlice'

const SearchResultsList: React.FC = () => {
  const { t } = useTranslation()

  const { privateChats, groupChats } = useSelector(selectSearchResults)

  return (
    <Box>
      {privateChats.length > 0 && (
        <>
          <Typography variant='body1' fontWeight={600}>
            {t('user')}
          </Typography>
          <List sx={{ p: 0 }}>
            {privateChats.map(chat => (
              <ListItem sx={{ p: 0 }} key={chat.id}>
                <PrivateChatCard
                  avatarUrl={chat.avatarUrl ? chat.avatarUrl : ''}
                  name={chat.name}
                  id={chat.id}
                />
              </ListItem>
            ))}
          </List>
        </>
      )}
      {groupChats.length > 0 && (
        <>
          <Typography variant='body1' fontWeight={600}>
            {t('group_chat')}
          </Typography>
          <List sx={{ p: 0 }}>
            {groupChats.map(chat => (
              <ListItem sx={{ p: 0 }} key={chat.id}>
                <GroupChatCard
                  id={chat.id}
                  avatarUrl={chat.avatarUrl}
                  name={chat.name}
                  description={chat.description}
                  members={chat.members}
                />
              </ListItem>
            ))}
          </List>
        </>
      )}
    </Box>
  )
}

export default SearchResultsList
