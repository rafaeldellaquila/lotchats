import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  DialogContentText
} from '@mui/material'
import { arrayUnion, doc, getFirestore, updateDoc } from 'firebase/firestore'
import { useTranslation } from 'react-i18next'

import { auth } from '@/firebase'
import { useModal } from '@/hooks/utils/useModal'

const AddContactDialog: React.FC<{
  open: boolean
  onClose: () => void
}> = ({ open, onClose }) => {
  const { selectedContactId } = useModal()
  const { t } = useTranslation()
  const db = getFirestore()

  const handleAddContact = async () => {
    if (!auth.currentUser) return

    const currentUserDocRef = doc(db, 'users', auth.currentUser.uid)

    await updateDoc(currentUserDocRef, {
      contacts: arrayUnion(selectedContactId)
    })
      .then(() => {
        console.log('Contato adicionado com sucesso.')
        onClose()
      })
      .catch(error => {
        console.error('Erro ao adicionar contato:', error)
      })
  }

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{t('add_dialog_title')}</DialogTitle>
      <DialogContent>
        <DialogContentText>{t('alert_dialog_description')}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>{t('disagree')}</Button>
        <Button onClick={handleAddContact} autoFocus>
          {t('agree')}
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default AddContactDialog
