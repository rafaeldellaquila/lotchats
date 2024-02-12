import { Box } from '@mui/material'
import { useSelector } from 'react-redux'

import SearchResultsList from '@/components/shared/SearchResultList'
import { selectSearchResults } from '@/redux/slices/searchSlice'

const DiscoverPage: React.FC = () => {
  const searchResults = useSelector(selectSearchResults)

  return (
    <Box sx={{ m: 2 }}>
      <SearchResultsList searchResults={searchResults} />
    </Box>
  )
}

export default DiscoverPage
