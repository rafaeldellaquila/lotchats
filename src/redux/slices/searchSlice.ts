import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { UserProps } from '@/@types/common'

interface SearchState {
  searchResults: UserProps[]
}

const initialState: SearchState = {
  searchResults: []
}

export const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setSearchResults: (state, action: PayloadAction<UserProps[]>) => {
      state.searchResults = action.payload
    },
    clearSearchResults: state => {
      state.searchResults = []
    }
  }
})

export const { setSearchResults, clearSearchResults } = searchSlice.actions

export const selectSearchResults = (state: { search: SearchState }) =>
  state.search.searchResults

export default searchSlice.reducer
