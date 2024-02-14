import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { SearchResults } from '@/@types/common'

// Define a estrutura do estado que inclui searchResults
interface SearchState {
  searchResults: SearchResults
}

// Corrige a inicialização do estado para ser do tipo SearchState
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
    // Ação para configurar os resultados da pesquisa
    setSearchResults: (state, action: PayloadAction<SearchResults>) => {
      state.searchResults = action.payload
    },
    // Ação para limpar os resultados da pesquisa
    clearSearchResults: state => {
      state.searchResults = { privateChats: [], groupChats: [] }
    }
  }
})

export const { setSearchResults, clearSearchResults } = searchSlice.actions

// Seletor para acessar os resultados da pesquisa no estado
export const selectSearchResults = (state: { search: SearchState }) =>
  state.search.searchResults

export default searchSlice.reducer
