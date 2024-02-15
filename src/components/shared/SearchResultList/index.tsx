import { Box, List, ListItem, Typography } from '@mui/material'
import { collection, getDocs, getFirestore } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'

import { GroupProps } from '@/@types/common'
import GroupChatCard from '@/components/chat/group/GroupChatCard'
import PrivateChatCard from '@/components/chat/private/PrivateChatCard'
import {
  selectSearchResults,
  clearSearchResults,
  setSearchResults
} from '@/redux/slices/searchSlice'

const SearchResultsList: React.FC = () => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const [fetchedGroups, setFetchedGroups] = useState(false)
  const { privateChats, groupChats } = useSelector(selectSearchResults)
  const [groups, setGroups] = useState<GroupProps[]>(groupChats)

  useEffect(() => {
    if (
      !fetchedGroups &&
      privateChats.length === 0 &&
      groupChats.length === 0
    ) {
      const fetchGroups = async () => {
        const db = getFirestore()
        const querySnapshot = await getDocs(collection(db, 'groups'))
        const fetchedGroups = querySnapshot.docs.map(doc => ({
          ...doc.data(),
          createdAt: new Date().toISOString()
        })) as GroupProps[]

        console.log(fetchedGroups)

        dispatch(
          setSearchResults({ privateChats: [], groupChats: fetchedGroups })
        )
        setGroups(fetchedGroups)
        setFetchedGroups(true)
      }

      fetchGroups()
    }

    return () => {
      dispatch(clearSearchResults())
    }
  }, [dispatch, fetchedGroups, privateChats.length, groupChats.length])

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
      {groups !== undefined && (
        <>
          <Typography variant='body1' fontWeight={600}>
            {t('group_chat')}
          </Typography>
          <List sx={{ p: 0 }}>
            {groups.map((chat, index) => (
              <ListItem sx={{ p: 0 }} key={index}>
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
