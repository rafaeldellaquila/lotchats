import { Modal } from '@mantine/core'

interface SearchModalProps {
  opened: boolean
  onClose: () => void
}

const SearchModal: React.FC<SearchModalProps> = ({ opened, onClose }) => {
  return (
    <Modal opened={opened} onClose={onClose} title='Search'>
      {/* Conteúdo do modal de busca aqui */}
      <div>Search for something...</div>
    </Modal>
  )
}

export default SearchModal
