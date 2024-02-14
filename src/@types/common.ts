import { Timestamp } from 'firebase/firestore'

export interface DrawerProps {
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

export interface GroupProps {
  id: string
  avatarUrl: string
  name: string
  description: string
  members: GroupMemberProps[]
  createdAt?: Timestamp | string
}

export interface SearchResults {
  privateChats: UserProps[]
  groupChats: GroupProps[]
}

export interface PreviewChatProps {
  id: string
  avatarUrl: string
  name: string
  messagePreview: string
  isGroup?: boolean
  members?: GroupMemberProps[]
  description: string
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

export interface MessageProps {
  id: string
  senderId: string
  text: string
  timestamp: Timestamp
  senderName?: string
}
