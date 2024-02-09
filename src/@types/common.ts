export interface DrawerProps {
  // Drawer - SearchModal
  isOpen: boolean
  toggle: () => void
}

export interface ChatProps {
  // ChatCard
  id: number
  name: string
  avatarUrl: string | undefined
  unreadCount: number
}

export interface PreviewChatProps extends ChatProps {
  // Favorite - Home
  messagePreview: string
  time: string
}

export interface MessageProps {
  // Chat page
  id: number
  sender: string
  message: string
  time: string
  isOwner: boolean
}
