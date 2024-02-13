import { Box } from '@mui/material'
import { useNavigate, useParams } from 'react-router-dom'

import GroupChat from '@/components/chat/group/GroupChat'

const GroupChatPage: React.FC = () => {
  const navigate = useNavigate()
  const { groupid } = useParams<{ groupid: string }>()
  return (
    <Box sx={{ height: '100%' }}>
      <GroupChat groupId={groupid as string} onBack={() => navigate(-1)} />
    </Box>
  )
}

export default GroupChatPage
