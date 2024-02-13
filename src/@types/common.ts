import { Timestamp } from 'firebase/firestore'

export interface DrawerProps {
  // Drawer - SearchModal
  open: boolean
  onClose: () => void
}

export interface UserProps {
  name: string
  id: string
  email: string
  avatarUrl: string | undefined
  celNumber: string
}

export interface PreviewChatProps {
  id: string
  avatarUrl: string
  name: string
  messagePreview: string
}

export interface GroupMemberProps {
  id: string
  isAdmin: boolean
  name: string
  avatarUrl: string
}

export interface ContactProps {
  id: string
  name: string
  avatarUrl: string
}

export interface ChatProps extends UserProps {
  // ChatCard
  unreadCount: number
}

export interface MessageProps {
  // Chat page
  id: string
  senderId: string
  text: string
  timestamp: Timestamp
  //  isOwner: boolean
}
