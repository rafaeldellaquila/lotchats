import { Box, List, ListItem, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'

import { UserProps } from '@/@types/common'
import PrivateChatCard from '@/components/chat/private/PrivateChatCard'

interface SearchResultsListProps {
  searchResults: UserProps[]
}

const SearchResultsList: React.FC<SearchResultsListProps> = ({
  searchResults
}) => {
  const { t } = useTranslation()

  return (
    <Box>
      <Typography variant='body1' fontWeight={600}>
        {t('user')}
      </Typography>
      <List sx={{ p: 0 }}>
        {searchResults.map((user: UserProps) => (
          <ListItem sx={{ p: 0 }} key={user.id}>
            <PrivateChatCard
              isGroupChat={false}
              name={user.name}
              email={user.email}
              id={user.id}
              avatarUrl={user.avatarUrl}
            />
          </ListItem>
        ))}
      </List>
    </Box>
  )
}

export default SearchResultsList
