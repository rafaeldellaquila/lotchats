import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface StatusState {
  value: string
}

const initialState: StatusState = {
  value: ''
}

export const statusSlice = createSlice({
  name: 'status',
  initialState,
  reducers: {
    setStatus: (state, action: PayloadAction<string>) => {
      state.value = action.payload
    }
  }
})

export const { setStatus } = statusSlice.actions

export default statusSlice.reducer
