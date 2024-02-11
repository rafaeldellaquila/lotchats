import { List, ListItem, ListItemText } from '@mui/material'

import { UserProps } from '@/@types/common'

interface SearchResultsListProps {
  searchResults: UserProps[]
}

const SearchResultsList: React.FC<SearchResultsListProps> = ({
  searchResults
}) => {
  return (
    <List>
      {searchResults.map((user: UserProps) => (
        <ListItem key={user.id}>
          <ListItemText primary={user.name || user.email} />
        </ListItem>
      ))}
    </List>
  )
}

export default SearchResultsList
