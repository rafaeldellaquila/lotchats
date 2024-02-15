import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface UserState {
  currentUser: { name: string; avatarUrl: string } | undefined
  isLoading: boolean
}

const initialState: UserState = {
  currentUser: undefined,
  isLoading: false
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (
      state,
      action: PayloadAction<{ name: string; avatarUrl: string } | undefined>
    ) => {
      state.currentUser = action.payload
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload
    }
  }
})

export const { setUser, setLoading } = userSlice.actions

export default userSlice.reducer
