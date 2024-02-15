import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { SearchResults } from '@/@types/common'

interface SearchState {
  searchResults: SearchResults
}

const initialState: SearchState = {
  searchResults: {
    privateChats: [],
    groupChats: []
  }
}

export const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setSearchResults: (state, action: PayloadAction<SearchResults>) => {
      state.searchResults = action.payload
    },
    clearSearchResults: state => {
      state.searchResults = { privateChats: [], groupChats: [] }
    }
  }
})

export const { setSearchResults, clearSearchResults } = searchSlice.actions

export const selectSearchResults = (state: { search: SearchState }) =>
  state.search.searchResults

export default searchSlice.reducer
