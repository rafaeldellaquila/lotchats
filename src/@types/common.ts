export interface DrawerProps {
  // UserDrawer - CommunityDrawer
  isOpen: boolean
  toggle: () => void
}

export interface ChatProps {
  id: number
  name: string
  avatarUrl: string | undefined
  unreadCount: number
}

export interface PreviewChatProps extends ChatProps {
  messagePreview: string
  time: string
}
