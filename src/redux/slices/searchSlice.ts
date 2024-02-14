import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { GroupProps, UserProps } from '@/@types/common'

interface SearchResultsPayload {
  private_chats: UserProps[]
  group_chats: GroupProps[]
}

interface SearchState {
  searchResults: SearchResultsPayload
}

const initialState: SearchState = {
  searchResults: {
    private_chats: [],
    group_chats: []
  }
}

export const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setSearchResults: (state, action: PayloadAction<SearchResultsPayload>) => {
      state.searchResults = action.payload
    },
    clearSearchResults: state => {
      state.searchResults = { private_chats: [], group_chats: [] }
    }
  }
})

export const { setSearchResults, clearSearchResults } = searchSlice.actions

export const selectSearchResults = (state: { search: SearchState }) =>
  state.search.searchResults

export default searchSlice.reducer
