export interface IDrawer {
  // UserDrawer - CommunityDrawer
  isOpen: boolean
  toggle: () => void
}

export interface Favorite {
  id: number
  name: string
  avatarUrl: string | undefined
  notificationCount?: number
}
