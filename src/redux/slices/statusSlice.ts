import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface StatusState {
  value: string
}

const initialState: StatusState = {
  value: ''
}

export const StatusReducer = createSlice({
  name: 'status',
  initialState,
  reducers: {
    setStatus: (state, action: PayloadAction<string>) => {
      state.value = action.payload
    }
  }
})

export const { setStatus } = StatusReducer.actions

export default StatusReducer.reducer
