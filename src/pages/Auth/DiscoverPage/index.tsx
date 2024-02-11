import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import SearchResultsList from '@/components/shared/SearchResultList'
import {
  clearSearchResults,
  selectSearchResults
} from '@/redux/slices/searchSlice'

const DiscoverPage: React.FC = () => {
  const dispatch = useDispatch()
  const searchResults = useSelector(selectSearchResults)
  useEffect(() => {
    return () => {
      dispatch(clearSearchResults())
    }
  }, [dispatch])

  return (
    <>
      <SearchResultsList searchResults={searchResults} />
    </>
  )
}

export default DiscoverPage
