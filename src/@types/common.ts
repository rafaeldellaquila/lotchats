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

interface BaseChatProps {
  id: string
  avatarUrl?: string
  time?: string
}

export interface GroupChatProps extends BaseChatProps {
  isGroupChat: true
  groupName: string
  qtyMember: number
  members: UserProps[]
  tags: string[]
}

export interface PrivateChatProps extends BaseChatProps {
  isGroupChat: false
  name: string
  unreadCount?: number
  email?: string
  messagePreview?: string
}

export type PreviewChatProps = GroupChatProps | PrivateChatProps
