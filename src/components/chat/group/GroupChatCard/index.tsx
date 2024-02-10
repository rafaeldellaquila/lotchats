import { Avatar, Badge, Box, Card, Chip, Typography } from '@mui/material'

import { GroupChatProps } from '@/@types/common'
import { useNavigation } from '@/hooks/utils/useNavigation'

const GroupChatCard: React.FC<GroupChatProps> = ({
  avatarUrl,
  groupName,
  time,
  qtyMember
}) => {
  const { handleNavigate } = useNavigation()

  return (
    <Card
      onClick={() => handleNavigate('/groupchat')}
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
        <Avatar src={avatarUrl} alt={groupName} sx={{ mb: 1 }}>
          {avatarUrl ? '' : groupName.charAt(0).toUpperCase()}
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
          {groupName}
        </Typography>
        <Chip label={`${qtyMember} members`} size='small' />
      </Box>

      <Typography
        variant='body2'
        color='text.secondary'
        fontWeight='bold'
        sx={{
          ml: 'auto',
          whiteSpace: 'nowrap'
        }}
      >
        {time}
      </Typography>
    </Card>
  )
}

export default GroupChatCard
