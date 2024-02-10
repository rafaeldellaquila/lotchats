import { Avatar, Badge, Box, Card, Typography } from '@mui/material'

import { PrivateChatProps } from '@/@types/common'
import { useNavigation } from '@/hooks/utils/useNavigation'

const PrivateChatCard: React.FC<PrivateChatProps> = ({
  avatarUrl,
  name,
  messagePreview,
  unreadCount,
  time
}) => {
  const { handleNavigate } = useNavigation()

  return (
    <Card
      onClick={() => handleNavigate('/chat')}
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
      <Badge
        badgeContent={unreadCount}
        color='error'
        sx={{
          mr: 2
        }}
      >
        <Avatar src={avatarUrl} alt={name}>
          {avatarUrl ? '' : name.charAt(0).toUpperCase()}
        </Avatar>
      </Badge>
      <Box sx={{ flex: 1, minWidth: 0 }}>
        <Typography variant='body1' fontWeight='bold' color='common.black'>
          {name}
        </Typography>
        <Typography
          variant='body2'
          color='text.secondary'
          noWrap
          sx={{
            overflow: 'hidden',
            textOverflow: 'ellipsis'
          }}
        >
          {messagePreview}
        </Typography>
      </Box>
      <Typography
        variant='body2'
        color='text.secondary'
        fontWeight='bold'
        textAlign='right'
        sx={{
          ml: 'auto',
          whiteSpace: 'nowrap',
          alignSelf: 'self-start',
          mt: 0.5
        }}
      >
        {time}
      </Typography>
    </Card>
  )
}

export default PrivateChatCard
