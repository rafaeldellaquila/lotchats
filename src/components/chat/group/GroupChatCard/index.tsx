import { GroupAdd as GroupAddIcon } from '@mui/icons-material'
import {
  Avatar,
  Box,
  Card,
  CardActionArea,
  Chip,
  Typography
} from '@mui/material'
import {
  doc,
  updateDoc,
  arrayUnion,
  getFirestore,
  getDoc
} from 'firebase/firestore'
import { MouseEvent, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

import { GroupProps } from '@/@types/common'
import { auth } from '@/firebase'

const GroupChatCard: React.FC<GroupProps> = ({
  id,
  avatarUrl,
  name,
  description,
  members
}) => {
  const navigate = useNavigate()
  const [isMember, setIsMember] = useState(false)
  const currentUserUid = auth.currentUser?.uid
  const db = getFirestore()
  const { t } = useTranslation()

  useEffect(() => {
    setIsMember(members.some(member => member.id === currentUserUid))
  }, [members, currentUserUid])

  const handleJoinGroup = async (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()

    if (!currentUserUid) return

    const userRef = doc(db, 'users', currentUserUid)
    const userSnap = await getDoc(userRef)

    if (!userSnap.exists()) {
      console.log(t('user_not_found'))
      return
    }

    const groupRef = doc(db, 'groups', id)
    await updateDoc(groupRef, {
      members: arrayUnion({
        id: currentUserUid,
        avatarUrl: userSnap.data().avatarUrl || '',
        isAdmin: false,
        name: userSnap.data().name || currentUserUid
      })
    })

    await updateDoc(userRef, {
      groups: arrayUnion(id)
    })

    setIsMember(true)
    navigate(`/groupchat/${id}`)
  }

  return (
    <Card
      onClick={() => navigate(`/groupchat/${id}`)}
      sx={{
        display: 'flex',
        alignItems: 'center',
        mb: 2,
        width: '100%',
        boxSizing: 'border-box',
        cursor: 'pointer'
      }}
      elevation={0}
    >
      <CardActionArea
        sx={{
          display: 'flex',
          flex: 10,
          p: '1rem',
          alignItems: 'center'
        }}
      >
        <Avatar src={avatarUrl} alt={name} sx={{ mr: 2 }}>
          {avatarUrl ? '' : name.charAt(0).toUpperCase()}
        </Avatar>
        <Box sx={{ flex: 1, minWidth: 0 }}>
          <Box sx={{ display: 'flex', flexDirection: `row` }}>
            <Typography
              variant='body1'
              fontWeight='bold'
              color='common.black'
              sx={{ mr: 1 }}
            >
              {name}
            </Typography>
            <Chip
              label={t('members', { count: members.length })}
              size='small'
              color='info'
              sx={{ fontSize: '0.7rem' }}
            />
          </Box>
          <Typography variant='body2' color='text.secondary' sx={{ my: 0.5 }}>
            {description}
          </Typography>
        </Box>
      </CardActionArea>
      {!isMember && (
        <CardActionArea
          onClick={handleJoinGroup}
          sx={{
            display: 'flex',
            flex: 1,
            p: '1rem',
            alignItems: 'center'
          }}
        >
          <GroupAddIcon color='success' />
        </CardActionArea>
      )}
    </Card>
  )
}

export default GroupChatCard
