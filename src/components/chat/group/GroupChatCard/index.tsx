import {
  Avatar,
  Box,
  Card,
  CardActionArea,
  Chip,
  Typography
} from '@mui/material'
import { useNavigate } from 'react-router-dom'

import { GroupMemberProps } from '@/@types/common'

interface GroupChatCardProps {
  id: string
  avatarUrl: string
  name: string
  description: string
  members: GroupMemberProps[]
}

const GroupChatCard: React.FC<GroupChatCardProps> = ({
  id,
  avatarUrl,
  name,
  description,
  members
}) => {
  const navigate = useNavigate()

  const handleNavigate = () => {
    navigate(`/groupchat/${id}`)
  }

  return (
    <Card
      onClick={handleNavigate}
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
          flex: 1,
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
              label={`${members.length} members`}
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
    </Card>
  )
}

export default GroupChatCard
