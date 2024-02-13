import { Avatar, Badge, Box, Card, Chip, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'

import { GroupMemberProps } from '@/@types/common'

interface GroupChatCardProps {
  id: string
  avatarUrl: string
  name: string
  messagePreview: string
  members: GroupMemberProps[]
}

const GroupChatCard: React.FC<GroupChatCardProps> = ({
  id,
  avatarUrl,
  name,
  members
}) => {
  const navigate = useNavigate()

  const handleNavigate = () => {
    navigate(`/groupchat/${id}`) // Navega para o chat do grupo com o id específico
  }

  return (
    <Card
      onClick={handleNavigate}
      sx={{
        display: 'flex',
        alignItems: 'center',
        mb: 2,
        p: '1rem',
        width: '100%',
        boxSizing: 'border-box'
      }}
      elevation={0}
    >
      <Badge badgeContent={undefined} color='error' sx={{ mr: 2 }}>
        <Avatar src={avatarUrl} alt={name} sx={{ width: 56, height: 56 }}>
          {!avatarUrl && name.charAt(0).toUpperCase()}
        </Avatar>
      </Badge>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          mr: 2
        }}
      >
        <Typography variant='body1' fontWeight='bold' color='common.black'>
          {name}
        </Typography>
        <Chip label={`${members.length} members`} size='small' />
      </Box>
    </Card>
  )
}

export default GroupChatCard
