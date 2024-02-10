import { createSlice, PayloadAction } from '@reduxjs/toolkit'

// Definindo a estrutura do objeto serializável do usuário
interface AuthUser {
  uid: string
  email: string | null
  displayName: string | null
}

interface AuthState {
  user: AuthUser | null
  isLoading: boolean
  error: string | null
}

const initialState: AuthState = {
  user: null,
  isLoading: false,
  error: null
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<AuthUser | null>) => {
      state.user = action.payload
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload
    }
  }
})

export const { setUser, setLoading, setError } = authSlice.actions

export default authSlice.reducer
